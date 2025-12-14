import { Prisma, PrismaClient } from '@prisma/client'
import prisma from '@/shared/lib/prisma'

export class ProductRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAll(sortBy?: string, search?: string) {
    let orderBy: Prisma.ProductOrderByWithRelationInput = {}

    switch (sortBy) {
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'ratings':
        orderBy = {
          ratings: {
            _count: 'desc',
          },
        }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    const where: Prisma.ProductWhereInput = {}
    if (search?.trim()) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      }
    }

    return await this.db.product.findMany({
      where,
      orderBy,
      include: {
        images: true,
        reviews: true,
        ratings: true,
        category: true,
        brand: true,
        _count: {
          select: {
            ratings: true,
            reviews: {
              where: { status: 'APPROVED' },
            },
            orderItems: true,
          },
        },
      },
    })
  }

  async getProductsByCategory(categoryId: string) {
    return await this.db.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        images: true,
        reviews: true,
        ratings: true,
        category: true,
        brand: true,
        _count: {
          select: {
            ratings: true,
            reviews: true,
            orderItems: true,
          },
        },
      },
    })
  }

  async getById(id: string) {
    return await this.db.product.findUnique({
      where: { id },
      include: {
        images: true,
        reviews: {
          where: {
            status: 'APPROVED',
          },
          include: {
            author: {
              include: {
                avatar: true,
              },
            },
          },
        },
        ratings: {
          include: {
            author: {
              include: {
                avatar: true,
              },
            },
          },
        },
        category: true,
        brand: true,
        _count: {
          select: {
            ratings: true,
            reviews: true,
            orderItems: true,
          },
        },
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
    return await this.db.brand.findMany({
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

  async getProductModels() {
    return await this.db.brand.findMany()
  }

  async update(data: Prisma.ProductUpdateInput) {}

  async removeById(id: string) {}
}
