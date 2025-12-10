import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20',
})

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.json()
    const { planName, planPrice, planDuration, email } = body

    if (!planName || !planPrice || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `FuturaWatch IPTV - ${planName}`,
              description: `Duration: ${planDuration}`,
              images: ['https://futurawatch.com/logo.png'], // Optional: add your logo
            },
            unit_amount: Math.round(parseFloat(planPrice.replace('€', '').replace(',', '.')) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment-redirect`,
      metadata: {
        planName,
        planDuration,
      },
    })

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return new Response(
      JSON.stringify({ error: 'Error creating checkout session' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
