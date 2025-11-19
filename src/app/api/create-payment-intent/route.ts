import prisma from '@/shared/lib/prisma'
import { stripe } from '@/shared/lib/stripe'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    })

    if (!order || !order.payment) {
      return Response.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.payment.processorId) {
      const existing = await stripe.paymentIntents.retrieve(
        order.payment.processorId
      )

      return Response.json({
        clientSecret: existing.client_secret,
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: order.id },
    })

    await prisma.payment.update({
      where: { id: order.paymentId! },
      data: {
        processorId: paymentIntent.id,
        status: 'PENDING',
      },
    })

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
