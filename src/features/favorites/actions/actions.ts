'use server'

import { FavoriteRepository } from '../repository/favorite.repository'

const repo = new FavoriteRepository()

export async function getAllFavorites() {
  return await repo.getAll()
}

export async function getAllAmount() {
  return await repo.getAllAmount()
}
