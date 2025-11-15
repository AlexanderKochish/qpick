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

  async createBrand(data: Prisma.BrandCreateInput) {
    return await this.db.brand.create({
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
    return await this.db.category.findMany({
      include: {
        products: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
  }

  async getCategoryById(id: string) {
    return await this.db.category.findUnique({
      where: { id },
    })
  }
}
