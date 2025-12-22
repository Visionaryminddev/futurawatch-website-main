import { NextResponse } from 'next/server'

// Trim whitespace from credentials to avoid authentication issues
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID?.trim()
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET?.trim()
const PAYPAL_MODE = process.env.PAYPAL_MODE?.trim() || 'sandbox'
const PAYPAL_API_URL = PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials are missing')
  }

  // Remove any whitespace or newlines from credentials
  const clientId = PAYPAL_CLIENT_ID.replace(/\s/g, '')
  const clientSecret = PAYPAL_CLIENT_SECRET.replace(/\s/g, '')
  
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMsg = errorData.error_description || errorData.error || response.statusText
    
    // Provide helpful error message
    if (errorMsg.includes('invalid_client') || errorMsg.includes('authentication')) {
      throw new Error(`PayPal authentication failed. Please check:
1. Your Client ID and Secret are correct
2. They match the mode (${PAYPAL_MODE}) - Live credentials for live mode, Sandbox for sandbox
3. No extra spaces or characters in Vercel environment variables
Error: ${errorMsg}`)
    }
    
    throw new Error(`PayPal auth failed: ${errorMsg}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    throw new Error('No access token received from PayPal')
  }
  return data.access_token
}

export async function POST(req: Request) {
  try {
    // Debug logging (remove sensitive data in production)
    console.log('PayPal config check:', {
      hasClientId: !!PAYPAL_CLIENT_ID,
      hasSecret: !!PAYPAL_CLIENT_SECRET,
      mode: PAYPAL_MODE,
      apiUrl: PAYPAL_API_URL,
      clientIdLength: PAYPAL_CLIENT_ID?.length || 0,
      secretLength: PAYPAL_CLIENT_SECRET?.length || 0,
      clientIdStart: PAYPAL_CLIENT_ID?.substring(0, 10) || 'none'
    })

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      console.error('PayPal configuration missing:', {
        hasClientId: !!PAYPAL_CLIENT_ID,
        hasSecret: !!PAYPAL_CLIENT_SECRET,
        mode: PAYPAL_MODE,
        clientIdLength: PAYPAL_CLIENT_ID?.length || 0,
        secretLength: PAYPAL_CLIENT_SECRET?.length || 0
      })
      return NextResponse.json(
        { 
          error: 'PayPal is not configured. Please set PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, and PAYPAL_MODE in Vercel environment variables.',
          debug: {
            hasClientId: !!PAYPAL_CLIENT_ID,
            hasSecret: !!PAYPAL_CLIENT_SECRET,
            mode: PAYPAL_MODE
          }
        },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { planName, planPrice, planDuration, email } = body

    if (!planName || !planPrice || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Parse price
    const priceString = planPrice.toString().replace('€', '').replace(',', '.').trim()
    const priceAmount = parseFloat(priceString).toFixed(2)

    console.log('Creating PayPal order:', {
      planName,
      planPrice: priceAmount,
      mode: PAYPAL_MODE,
      apiUrl: PAYPAL_API_URL
    })

    let accessToken
    try {
      accessToken = await getPayPalAccessToken()
      console.log('PayPal access token obtained successfully')
    } catch (authError: any) {
      console.error('PayPal authentication error:', authError)
      return NextResponse.json(
        { 
          error: authError.message || 'PayPal authentication failed. Please check your credentials in Vercel.',
          type: 'authentication_error'
        },
        { status: 401 }
      )
    }

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: `IPTV-${Date.now()}`,
            description: `FuturaWatch IPTV - ${planName} (${planDuration})`,
            custom_id: email,
            amount: {
              currency_code: 'EUR',
              value: priceAmount,
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: 'FuturaWatch IPTV',
              locale: 'en-US',
              landing_page: 'LOGIN',
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
              return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.futurawatch.com'}/purchase-success`,
              cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.futurawatch.com'}/subscriptions`,
            },
          },
        },
      }),
    })

    const orderData = await response.json()

    if (!response.ok) {
      console.error('PayPal API error:', {
        status: response.status,
        statusText: response.statusText,
        data: orderData
      })
      
      // Provide more detailed error message
      const errorMessage = orderData.message || 
                          orderData.error_description || 
                          orderData.details?.[0]?.description ||
                          'Failed to create PayPal order'
      
      return NextResponse.json(
        { error: errorMessage, details: orderData },
        { status: response.status || 500 }
      )
    }

    // Find the approval URL
    const approvalUrl = orderData.links?.find((link: any) => link.rel === 'payer-action')?.href || 
                       orderData.links?.find((link: any) => link.rel === 'approve')?.href

    if (!approvalUrl) {
      console.error('No approval URL in PayPal response:', orderData)
      return NextResponse.json(
        { error: 'PayPal did not return an approval URL. Please check your PayPal configuration.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orderId: orderData.id,
      approvalUrl: approvalUrl,
    })

  } catch (error: any) {
    console.error('PayPal create order error:', error)
    return NextResponse.json(
      { error: error.message || 'Error creating PayPal order' },
      { status: 500 }
    )
  }
}
