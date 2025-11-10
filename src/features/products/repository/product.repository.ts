import { serializeProduct } from '@/features/cart/lib/utils'
import { Prisma, PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'

export class ProductRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAll() {
    return await this.db.product.findMany({
      include: {
        images: true,
      },
    })
  }

  async getById(id: string) {
    return await this.db.product.findUnique({
      where: { id },
      include: {
        images: true,
        reviews: true,
        ratings: true,
        category: true,
        productModel: true,
      },
    })
  }
  async getAllByCategory() {
    const result = await this.db.category.findMany({
      include: {
        products: {
          include: {
            images: true,
          },
        },
      },
    })

    return result
  }

  async create(data: Prisma.ProductCreateInput, imageUrls: string[]) {
    return await this.db.product.create({
      data: {
        ...data,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: { images: true },
    })
  }

  async addImage(productId: string, url: string) {
    return await this.db.image.create({
      data: {
        productId,
        url,
      },
    })
  }

  async getAllProductModel() {
    return await this.db.productModel.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async update(data: Prisma.ProductUpdateInput) {}

  async removeById(id: string) {}
}
