'use server'

import { CartRepository } from '../repository/cart.repository'
import { Cart } from '../types/types'

const repo = new CartRepository()

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
}
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  await repo.updateCartItemQuantity(itemId, quantity)
}
export async function removeCartItem(itemId: string) {
  await repo.removeCartItem(itemId)
}
