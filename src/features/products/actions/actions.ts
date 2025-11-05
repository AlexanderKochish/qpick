'use server'

import { ProductRepository } from '../repository/product.repository'

const repo = new ProductRepository()

export async function createProduct(formData: FormData) {
  const imageUrls = JSON.parse((formData.get('imageUrls') as string) || '[]')

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const discount = Number(formData.get('discount'))
  const categoryId = formData.get('categoryId') as string
  const productModelId = formData.get('productModelId') as string

  const dataForPrisma = {
    name,
    description,
    price,
    discount,
    category: { connect: { id: categoryId } },
    productModel: { connect: { id: productModelId } },
  }

  await repo.create(dataForPrisma, imageUrls)
}

export const handleUpload = async (url: string, productId: string) => {
  await repo.addImage(productId, url)
}

export async function getAllProducts() {
  return await repo.getAll()
}

export async function getProductById(id: string) {
  return await repo.getById(id)
}

export async function getAllProductModel() {
  return await repo.getAllProductModel()
}

export async function getAllByCategory() {
  return await repo.getAllByCategory()
}
