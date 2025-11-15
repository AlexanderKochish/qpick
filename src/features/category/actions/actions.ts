'use server'

import { CategoryRepository } from '../repository/category.repository'

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

export async function getAllCategories() {
  return await repo.getAllCategories()
}
