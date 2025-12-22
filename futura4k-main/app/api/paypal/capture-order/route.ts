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
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    let accessToken
    try {
      accessToken = await getPayPalAccessToken()
      console.log('PayPal access token obtained successfully for capture')
    } catch (authError: any) {
      console.error('PayPal authentication error during capture:', authError)
      return NextResponse.json(
        { 
          error: authError.message || 'PayPal authentication failed. Please check your credentials in Vercel.',
          type: 'authentication_error'
        },
        { status: 401 }
      )
    }

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const captureData = await response.json()

    if (!response.ok) {
      console.error('PayPal capture error:', captureData)
      return NextResponse.json(
        { error: captureData.message || 'Failed to capture PayPal payment' },
        { status: 500 }
      )
    }

    // Log successful payment
    console.log('✅ PayPal Payment Captured:', {
      orderId: captureData.id,
      status: captureData.status,
      payer: captureData.payer?.email_address,
      amount: captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount,
    })

    return NextResponse.json({
      success: true,
      orderId: captureData.id,
      status: captureData.status,
      payerEmail: captureData.payer?.email_address,
    })

  } catch (error: any) {
    console.error('PayPal capture error:', error)
    return NextResponse.json(
      { error: error.message || 'Error capturing PayPal payment' },
      { status: 500 }
    )
  }
}
