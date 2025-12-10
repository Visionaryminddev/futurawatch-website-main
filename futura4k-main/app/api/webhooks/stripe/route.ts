import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return new Response('No signature', { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (error) {
    console.error(`Webhook signature verification failed.`, error)
    return new Response(`Webhook Error: ${error}`, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      console.log(`Payment successful for session: ${session.id}`)
      // TODO: Update your database with the successful payment
      // Example: Add subscription to customer, send confirmation email, etc.
      break
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`Payment Intent succeeded: ${paymentIntent.id}`)
      break
    case 'charge.failed':
      const charge = event.data.object as Stripe.Charge
      console.log(`Charge failed: ${charge.id}`)
      break
    default:
      // Unhandled event type
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a response to acknowledge receipt of the event
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
