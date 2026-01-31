import { orderSchemaType } from '../lib/zod/order.schema'
import { PrismaClient } from '@prisma/client'
import { getCurrentSession } from '@/features/auth/actions/actions'
import prisma from '@/shared/lib/prisma'
import redis from '@/shared/lib/redis'
import { getOrCreateVisitorId } from '@/shared/utils/fingerprint-server'

export class OrderRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async create(data: orderSchemaType) {
    const session = await getCurrentSession()
    const userId = session?.user.id || (await getOrCreateVisitorId())
    if (!userId || !session) {
      throw new Error('User not authenticated')
    }

    const cart = await this.db.cart.findFirst({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty')
    }

    const result = await this.db.$transaction(async (tx) => {
      const address = await tx.address.upsert({
        where: {
          userId_city_street_building_apartment_postalCode: {
            userId: userId,
            city: data.city,
            street: data.street,
            building: data.building,
            apartment: data.apartment as string,
            postalCode: data.postalCode,
          },
        },
        update: {},
        create: {
          userId: userId,
          city: data.city,
          street: data.street,
          building: data.building,
          apartment: data.apartment || null,
          postalCode: data.postalCode,
        },
      })

      const order = await tx.order.create({
        data: {
          userId: userId,
          totalPrice: Number(data.totalPrice),
          status: 'PENDING',
          customerEmail: session?.user.email,
          customerPhone: data.phone,
          shippingAddressId: address.id,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtBuy: item.product.price,
            })),
          },
        },
      })

      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          method: data.paymentType,
          status: 'PENDING',
          amount: Number(data.totalPrice),
        },
      })

      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: { paymentId: payment.id },
      })

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      })

      return {
        order: updatedOrder,
        payment,
        address,
        cartId: cart.id,
      }
    })
    if (result) {
      await Promise.all([
        redis.del(`cart_cache:${userId}`),
        redis.del(`cart_amount:${userId}`),
        redis.del(`cart_total:${userId}`),
        redis.del(`latest_order:${userId}`),
      ])
    }

    return result
  }

  async getOrderTotalPrice(orderId: string) {
    const amount = await this.db.order.findUnique({
      where: { id: orderId },
      select: {
        totalPrice: true,
      },
    })
    return amount?.totalPrice
  }

  async getOrderById(id: string) {
    return await this.db.order.findUnique({
      where: { id },
    })
  }

  async getLatestOrder() {
    const session = await getCurrentSession()
    if (!session?.user.id) return null

    const cacheKey = `latest_order:${session.user.id}`

    const cachedOrderId = await redis.get(cacheKey)
    if (cachedOrderId) return { id: cachedOrderId }

    const order = await this.db.order.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    })

    if (order) {
      await redis.set(cacheKey, order.id, 'EX', 3600)
    }

    return order
  }
}
