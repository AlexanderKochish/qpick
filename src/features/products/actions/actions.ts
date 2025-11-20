'use server'

import { strict } from 'node:assert'
import { ProductRepository } from '../repository/product.repository'

const repo = new ProductRepository()

export async function createProduct(formData: FormData) {
  const imageUrls = JSON.parse((formData.get('imageUrls') as string) || '[]')

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const discount = Number(formData.get('discount'))
  const categoryId = formData.get('categoryId') as string
  const brandId = formData.get('brandId') as string

  const dataForPrisma = {
    name,
    description,
    price,
    discount,
    category: { connect: { id: categoryId } },
    brand: { connect: { id: brandId } },
  }

  await repo.create(dataForPrisma, imageUrls)
}

export const handleUpload = async (url: string, productId: string) => {
  await repo.addImage(productId, url)
}

export async function getAllProducts(sortBy?: string) {
  return await repo.getAll(sortBy)
}

export async function getProductById(id: string) {
  return await repo.getById(id)
}

export async function getAllProductModel() {
  return await repo.getAllProductModel()
}

export async function getProductModels() {
  return await repo.getProductModels()
}

export async function getAllByCategory() {
  return await repo.getAllByCategory()
}

export async function getProductsByCategory(categoryId: string) {
  return await repo.getProductsByCategory(categoryId)
}
