import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'

export class FavoriteRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAll(userId: string) {
    return await this.db.favorite.findUnique({
      where: { userId },
      include: {
        items: {
          select: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    })
  }

  async isFavorites(userId: string) {
    return await this.db.favorite.findUnique({
      where: { userId },
      include: {
        items: {
          select: {
            productId: true,
          },
        },
      },
    })
  }

  async getAllAmount() {
    return await this.db.favorite.count()
  }

  async addToFavorite(productId: string, userId?: string) {
    if (!userId) {
      throw new Error('Either userId or visitorId must be provided')
    }

    const favorite = await this.db.favorite.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: {
        items: true,
      },
    })

    return await this.db.favoriteItem.upsert({
      where: {
        productId_favoriteId: {
          productId,
          favoriteId: favorite.id,
        },
      },
      update: {},
      create: {
        productId,
        favoriteId: favorite.id,
      },
    })
  }
}
