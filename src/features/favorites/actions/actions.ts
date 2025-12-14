'use server'

import { getCurrentSession } from '@/features/auth/actions/actions'
import { FavoriteRepository } from '../repository/favorite.repository'
import { revalidatePath } from 'next/cache'

const repo = new FavoriteRepository()

export async function getAllFavorites(userId: string) {
  return await repo.getAll(userId)
}

export async function getAllAmount() {
  const session = await getCurrentSession()
  if (!session) return null
  return await repo.getAllAmount(session.user.id)
}

export async function toggleFavorite(productId: string) {
  const session = await getCurrentSession()
  if (!session) return null
  await repo.toggleFavorite(productId, session.user.id)
  revalidatePath('/', 'layout')
}

export async function isProductInFavorites() {
  const session = await getCurrentSession()
  if (!session) return null
  const [favorite] = await repo.isFavorites(session?.user.id as string)

  return favorite?.items.map((i) => i.productId) ?? []
}
