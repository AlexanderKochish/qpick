'use server'

import { FavoriteRepository } from '../repository/favorite.repository'
import { revalidatePath } from 'next/cache'

const repo = new FavoriteRepository()

export async function getAllFavorites(userId: string) {
  return await repo.getAll(userId)
}

export async function getAllAmount() {
  return await repo.getAllAmount()
}

export async function addToFavorite(productId: string, userId?: string) {
  await repo.addToFavorite(productId, userId)
  revalidatePath('/')
}

export async function isProductInFavorites(userId: string) {
  return await repo.isFavorites(userId)
}
