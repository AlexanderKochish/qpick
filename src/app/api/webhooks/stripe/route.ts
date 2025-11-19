import {
  confirmPayment,
  updatePaymentStatus,
} from '@/features/payment/actions/actions'
import { stripe } from '@/shared/lib/stripe'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata.orderId

        await confirmPayment(orderId)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        const failedOrderId = failedPayment.metadata.orderId

        await updatePaymentStatus(failedOrderId, 'FAILED')
        break
      case 'payment_intent.canceled':
        const canceledPayment = event.data.object
        const canceledOrderId = canceledPayment.metadata.orderId

        await updatePaymentStatus(canceledOrderId, 'CANCELLED')
        break
      default:
        return
    }

    return Response.json({ received: true })
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: 'Webhook handler failed' }, { status: 400 })
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
