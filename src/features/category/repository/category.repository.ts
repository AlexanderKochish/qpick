import { Prisma, PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'

export class CategoryRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async createCategory(data: Prisma.CategoryCreateInput) {
    return await this.db.category.create({
      data: {
        name: data.name,
      },
    })
  }

  async createModel(data: Prisma.ProductModelCreateInput) {
    return await this.db.productModel.create({
      data: {
        name: data.name,
      },
    })
  }

  async updateCategory(id: string, name: string) {
    return await this.db.category.update({
      where: { id },
      data: {
        name,
      },
    })
  }

  async removeCategory(id: string) {
    return await this.db.category.delete({
      where: { id },
    })
  }

  async getAllCategories() {
    return await this.db.category.findMany()
  }

  async getCategoryById(id: string) {
    return await this.db.category.findUnique({
      where: { id },
    })
  }
}
