import { getCurrentSession } from '@/features/auth/actions/actions'
import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'
import { getOrCreateVisitorId } from '@/shared/utils/fingerprint-server'

export class CartRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getOrCreateCart() {
    const session = await getCurrentSession()

    const visitorId = session?.user.id
      ? undefined
      : await getOrCreateVisitorId()

    const whereCondition = session?.user.id
      ? { userId: session.user.id }
      : { visitorId: visitorId! }

    let cart = await this.db.cart.findUnique({
      where: whereCondition,
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    })

    if (!cart) {
      const createData = session?.user.id
        ? { userId: session.user.id }
        : { visitorId: visitorId! }

      cart = await this.db.cart.create({
        data: createData,
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      })
    }

    return cart
  }

  async addToCart(productId: string, quantity = 1) {
    try {
      const cart = await this.getOrCreateCart()

      const existingItem = await this.db.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      })

      if (existingItem) {
        await this.db.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: {
              increment: quantity,
            },
          },
        })
      } else {
        await this.db.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        })
      }

      const updatedCart = await this.getOrCreateCart()

      return updatedCart
    } catch (error) {
      throw error
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number) {
    const cart = await this.getOrCreateCart()

    const existingItem = await this.db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    })

    if (!existingItem) {
      throw new Error('Product not found in cart')
    }

    if (quantity <= 0) {
      await this.db.cartItem.delete({
        where: { id: existingItem.id },
      })
    } else {
      await this.db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
      })
    }
  }

  async getCartTotalPrice() {
    const session = await getCurrentSession()

    const whereCondition = session?.user.id
      ? { userId: session.user.id }
      : { visitorId: await getOrCreateVisitorId() }

    const cart = await this.db.cart.findUnique({
      where: whereCondition,
      select: { id: true },
    })

    if (!cart) return 0

    const items = await this.db.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: {
          select: { price: true },
        },
      },
    })

    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  async removeCartItem(itemId: string) {
    await this.db.cartItem.delete({
      where: { id: itemId },
    })

    return this.getOrCreateCart()
  }

  async getCartAmount() {
    const cart = await this.getOrCreateCart()

    const result = await this.db.cartItem.aggregate({
      where: { cartId: cart.id },
      _sum: {
        quantity: true,
      },
    })

    return result._sum.quantity || 0
  }

  async clearCart() {
    const cart = await this.getOrCreateCart()
    await this.db.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    return this.getOrCreateCart()
  }
}
