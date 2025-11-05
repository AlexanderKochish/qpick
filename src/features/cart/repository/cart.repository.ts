import { getCurrentSession } from '@/features/auth/actions/actions'
import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'
import { getOrCreateVisitorId } from '@/shared/utils/fingerprint-server'

export class CartRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getOrCreateCart() {
    const session = await getCurrentSession()

    let cart = await this.db.cart.findUnique({
      where: {
        userId: session?.user.id,
      },
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
      cart = await this.db.cart.create({
        data: {
          userId: session?.user.id,
        },
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

      return cart
    } else {
      const visitorId = await getOrCreateVisitorId()
      let cart = await prisma.cart.findUnique({
        where: { visitorId },
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
        cart = await prisma.cart.create({
          data: {
            visitorId,
          },
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
  }

  async addToCart(productId: string, quantity = 1) {
    const cart = await this.getOrCreateCart()

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: quantity,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }
  }

  async updateCartItemQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      await this.db.cartItem.delete({
        where: { id: itemId },
      })
    } else {
      await this.db.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      })
    }
  }

  async removeCartItem(itemId: string) {
    const cart = await this.getOrCreateCart()
    await prisma.cartItem.delete({
      where: { id: itemId, cartId: cart.id },
    })
  }

  async getCartAmount() {
    const cart = await this.getOrCreateCart()
    return await this.db.cartItem.count({
      where: { cartId: cart.id },
    })
  }
}
