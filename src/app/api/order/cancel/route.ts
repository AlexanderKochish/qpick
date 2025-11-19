import { NextResponse } from 'next/server'
import prisma from '@/shared/lib/prisma'
import { stripe } from '@/shared/lib/stripe'

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    })

    if (!order || !order.payment) {
      return NextResponse.json(
        { error: 'Order not found in DB' },
        { status: 404 }
      )
    }

    if (order.payment.processorId) {
      try {
        await stripe.paymentIntents.cancel(order.payment.processorId)
      } catch (e) {
        console.error('Stripe cancel error:', (e as Error).message)
      }
    }

    await prisma.payment.update({
      where: { id: order.paymentId! },
      data: { status: 'CANCELLED' },
    })

    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    })

    const res = NextResponse.json({ success: true })
    res.cookies.set('orderId', '', { maxAge: -1 })

    return res
  } catch (error) {
    console.error('CANCEL API ERROR:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
