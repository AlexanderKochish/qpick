import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'

export class PaymentRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async confirmPayment(orderId: string) {
    const result = await this.db.$transaction(async (tx) => {
      const payment = await tx.payment.update({
        where: { orderId },
        data: { status: 'SUCCEEDED' },
      })

      const order = await tx.order.update({
        where: { id: orderId },
        data: { status: 'CONFIRMED' },
      })

      const cart = await tx.cart.findFirst({
        where: { userId: order.userId },
      })

      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        })
      }

      return { order, payment }
    })

    return result
  }

  async updatePaymentStatus(orderId: string, status: 'SUCCEEDED' | 'FAILED') {
    await this.db.payment.update({
      where: { orderId },
      data: { status },
    })

    await this.db.order.update({
      where: { id: orderId },
      data: {
        status: status === 'SUCCEEDED' ? 'CONFIRMED' : 'CANCELLED',
      },
    })
  }
}
