'use server'

import { OrderRepository } from '@/features/order/repository/order.repository'
import { CartRepository } from '../repository/cart.repository'
import { Cart } from '../types/types'
import { cartRedis } from '@/shared/lib/cart-redis'
import redis from '@/shared/lib/redis'
import { getCurrentSession } from '@/features/auth/actions/actions'
import { getOrCreateVisitorId } from '@/shared/utils/fingerprint-server'

const repo = new CartRepository()

const orderRepo = new OrderRepository()

export async function getOrCreateCart(): Promise<Cart> {
  return await repo.getOrCreateCart()
}

export async function getCartAmount() {
  const cart = await repo.getOrCreateCart()
  const userId = cart.userId || cart.visitorId
  const cacheKey = `cart_amount:${userId}`

  const cachedAmount = await redis.get(cacheKey)
  if (cachedAmount) return parseInt(cachedAmount)

  const amount = await repo.getCartAmount()
  await redis.set(cacheKey, amount.toString(), 'EX', 3600)

  return amount
}

export async function getCartTotalPrice() {
  return await repo.getCartTotalPrice()
}
export async function addToCart(productId: string, quantity = 1) {
  const session = await getCurrentSession()
  const userId = session?.user.id || (await getOrCreateVisitorId())

  if (userId) {
    await redis.del(`cart_cache:${userId}`)
  }

  await repo.addToCart(productId, quantity)

  if (userId) {
    await Promise.all([
      redis.del(`cart_amount:${userId}`),
      redis.del(`cart_total:${userId}`),

      cartRedis.addItem(userId, productId, quantity),
    ])
  }
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number
) {
  const session = await getCurrentSession()
  const userId = session?.user.id || (await getOrCreateVisitorId())

  if (userId) await redis.del(`cart_cache:${userId}`)

  await repo.updateCartItemQuantity(productId, quantity)

  if (userId) {
    await Promise.all([
      redis.del(`cart_cache:${userId}`),
      redis.del(`cart_amount:${userId}`),
      redis.del(`cart_total:${userId}`),
    ])
  }
}

export async function removeCartItem(itemId: string) {
  await repo.removeCartItem(itemId)
  const cart = await repo.getOrCreateCart()

  const session = await getCurrentSession()
  const userId = session?.user.id || cart.visitorId

  await Promise.all([
    redis.del(`cart_cache:${userId}`),
    redis.del(`cart_amount:${userId}`),
    redis.del(`cart_total:${userId}`),
  ])
}
export async function getCurrentCheckoutStep() {
  const cart = await repo.getOrCreateCart()

  if (!cart || cart.items.length === 0) {
    return 0
  }

  let step = 1

  const order = await orderRepo.getLatestOrder()

  if (order) {
    step = 2
  }

  return step
}
