import { getCurrentSession } from '@/features/auth/actions/actions'
import prisma from '@/shared/lib/prisma'
import { paymentRateLimit } from '@/shared/lib/ratelimit'
import redis from '@/shared/lib/redis'
import { stripe } from '@/shared/lib/stripe'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { orderId } = await req.json()
  const session = await getCurrentSession()

  if (!orderId)
    return Response.json({ error: 'Order ID required' }, { status: 400 })

  const identifier = session?.user?.id
    ? `user:${session.user.id}`
    : `ip:${req.headers.get('x-forwarded-for') || 'anon'}`

  const { success, limit, reset, remaining } =
    await paymentRateLimit.limit(identifier)

  if (!success) {
    return Response.json(
      { error: 'Слишком много попыток. Попробуйте через минуту.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    )
  }

  if (session?.user.id) {
    const userId = session.user.id
    await Promise.all([
      redis.del(`cart:${userId}`),
      redis.del(`cart_amount:${userId}`),
      redis.del(`cart_total:${userId}`),
      redis.del(`cart_cache:${userId}`),
    ])
  }
  try {
    const lockKey = `lock:payment:${orderId}`
    const isLocked = await redis.set(lockKey, 'locked', 'EX', 10, 'NX')

    if (!isLocked) {
      return Response.json(
        { error: 'Payment is already processing' },
        { status: 409 }
      )
    }

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
    await redis.del(lockKey)
    return Response.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.log(error)
    await redis.del(`lock:payment:${orderId}`)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
