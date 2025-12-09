'use server'

import { OrderRepository } from '@/features/order/repository/order.repository'
import { CartRepository } from '../repository/cart.repository'
import { Cart } from '../types/types'
import { revalidatePath } from 'next/cache'

const repo = new CartRepository()

const orderRepo = new OrderRepository()

export async function getOrCreateCart(): Promise<Cart> {
  return await repo.getOrCreateCart()
}

export async function getCartAmount() {
  return await repo.getCartAmount()
}

export async function getCartTotalPrice() {
  return await repo.getCartTotalPrice()
}
export async function addToCart(productId: string, quantity = 1) {
  await repo.addToCart(productId, quantity)
  revalidatePath('/', 'layout')
}
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  await repo.updateCartItemQuantity(itemId, quantity)
  revalidatePath('/cart', 'layout')
}
export async function removeCartItem(itemId: string) {
  await repo.removeCartItem(itemId)
  revalidatePath('/cart', 'layout')
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
