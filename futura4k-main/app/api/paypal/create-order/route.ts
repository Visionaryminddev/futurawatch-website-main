import { NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API_URL = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
  
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
    throw new Error(`PayPal auth failed: ${errorData.error_description || errorData.error || response.statusText}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    throw new Error('No access token received from PayPal')
  }
  return data.access_token
}

export async function POST(req: Request) {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      console.error('PayPal configuration missing:', {
        hasClientId: !!PAYPAL_CLIENT_ID,
        hasSecret: !!PAYPAL_CLIENT_SECRET,
        mode: process.env.PAYPAL_MODE
      })
      return NextResponse.json(
        { error: 'PayPal is not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in Vercel environment variables.' },
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

    const accessToken = await getPayPalAccessToken()

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
