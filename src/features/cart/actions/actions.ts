'use server'

import { CartRepository } from '../repository/cart.repository'

const repo = new CartRepository()

export async function getOrCreateCart() {
  return await repo.getOrCreateCart()
}

export async function getCartAmount() {
  return await repo.getCartAmount()
}

export async function addToCart(productId: string, quantity = 1) {
  return await repo.addToCart(productId, quantity)
}
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  return await repo.updateCartItemQuantity(itemId, quantity)
}
export async function removeCartItem(itemId: string) {
  return await repo.removeCartItem(itemId)
}
