import { orderSchemaType } from '../lib/zod/order.schema'
import { PrismaClient } from '@prisma/client'
import { getCurrentSession } from '@/features/auth/actions/actions'
import prisma from '@/shared/lib/prisma'

export class OrderRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async create(data: orderSchemaType) {
    const session = await getCurrentSession()
    if (!session?.user.id) {
      throw new Error('User not authenticated')
    }

    const cart = await this.db.cart.findFirst({
      where: { userId: session.user.id },
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
            userId: session.user.id,
            city: data.city,
            street: data.street,
            building: data.building,
            apartment: data.apartment as string,
            postalCode: data.postalCode,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          city: data.city,
          street: data.street,
          building: data.building,
          apartment: data.apartment || null,
          postalCode: data.postalCode,
        },
      })

      const order = await tx.order.create({
        data: {
          userId: session.user.id,
          totalPrice: Number(data.totalPrice),
          status: 'PENDING',
          customerEmail: session.user.email!,
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

      return {
        order: updatedOrder,
        payment,
        address,
        cartId: cart.id,
      }
    })

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
    return await this.db.order.findFirst({
      where: {
        userId: session?.user.id,
      },
      select: {
        id: true,
      },
    })
  }
}
