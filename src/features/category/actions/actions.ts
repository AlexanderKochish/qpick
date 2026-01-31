'use server'

import { getCachedData } from '@/shared/lib/cache'
import { CategoryRepository } from '../repository/category.repository'
import { Category } from '../types/types'

const repo = new CategoryRepository()

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string

  const data = {
    name,
  }
  await repo.createCategory(data)
}

export async function createBrand(formData: FormData) {
  const name = formData.get('name') as string

  const data = {
    name,
  }
  await repo.createBrand(data)
}

export async function getAllCategories(): Promise<Category[]> {
  return await getCachedData('categories', () => repo.getAllCategories())
}
