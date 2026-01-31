import { getCurrentSession } from '@/features/auth/actions/actions'
import { PrismaClient } from '@prisma/client'
import prisma from '@/shared/lib/prisma'
import { getOrCreateVisitorId } from '@/shared/utils/fingerprint-server'
import { Cart } from '../types/types'
import redis from '@/shared/lib/redis'

export class CartRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getOrCreateCart(): Promise<Cart> {
    const session = await getCurrentSession()
    const visitorId = session?.user.id
      ? undefined
      : await getOrCreateVisitorId()

    const userId = session?.user.id || visitorId!
    const cacheKey = `cart_cache:${userId}`

    const cachedCart = await redis.get(cacheKey)
    if (cachedCart) {
      return JSON.parse(cachedCart)
    }

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
                brand: true,
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
                  brand: true,
                  images: true,
                },
              },
            },
          },
        },
      })
    }
    if (cart) {
      await redis.set(cacheKey, JSON.stringify(cart), 'EX', 3600)
    }

    return cart as Cart
  }

  async addToCart(productId: string, quantity = 1): Promise<Cart> {
    try {
      const cart = await this.getOrCreateCart()
      const userId = cart.userId || cart.visitorId

      if (userId) await redis.del(`cart_cache:${userId}`)

      const existingItem = await this.db.cartItem.findFirst({
        where: { cartId: cart.id, productId: productId },
      })

      if (existingItem) {
        await this.db.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: quantity } },
        })
      } else {
        await this.db.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        })
      }

      return await this.getOrCreateCart()
    } catch (error) {
      throw error
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number) {
    const cart = await this.getOrCreateCart()
    const userId = cart.userId || cart.visitorId // Берем ID для кэша

    const existingItem = await this.db.cartItem.findFirst({
      where: { cartId: cart.id, productId: productId },
    })

    if (!existingItem) throw new Error('Product not found in cart')

    if (userId) await redis.del(`cart_cache:${userId}`)

    if (quantity <= 0) {
      await this.db.cartItem.delete({ where: { id: existingItem.id } })
    } else {
      await this.db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
      })
    }

    if (userId) await redis.del(`cart_cache:${userId}`)
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

  async mergeCart(userId: string, visitorId: string) {
    const visitorCart = await this.db.cart.findUnique({
      where: { visitorId },
      include: { items: true },
    })

    if (!visitorCart || visitorCart.items.length === 0) return

    const userCart = await this.db.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: { items: true },
    })

    for (const item of visitorCart.items) {
      const existingUserItem = userCart.items.find(
        (uItem) => uItem.productId === item.productId
      )

      if (existingUserItem) {
        await this.db.cartItem.update({
          where: { id: existingUserItem.id },
          data: { quantity: { increment: item.quantity } },
        })
      } else {
        await this.db.cartItem.update({
          where: { id: item.id },
          data: { cartId: userCart.id },
        })
      }
    }

    await this.db.cart.delete({ where: { id: visitorCart.id } })

    await redis.del(`cart_cache:${visitorId}`)
    await redis.del(`cart_cache:${userId}`)
  }

  async clearCart() {
    const cart = await this.getOrCreateCart()
    await this.db.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    return this.getOrCreateCart()
  }
}
