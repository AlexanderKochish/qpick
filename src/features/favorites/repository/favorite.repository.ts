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

  async getAllAmount(userId: string) {
    const favorite = await this.db.favorite.findUnique({
      where: { userId },
    })

    return await this.db.favoriteItem.count({
      where: { favoriteId: favorite?.id },
    })
  }

  async toggleFavorite(productId: string, userId?: string) {
    if (!userId) {
      throw new Error('User ID is required')
    }

    try {
      const favorite = await this.db.favorite.upsert({
        where: { userId },
        update: {},
        create: { userId },
      })

      const result = await this.db.$transaction(async (tx) => {
        const existingItem = await tx.favoriteItem.findFirst({
          where: {
            favoriteId: favorite.id,
            productId: productId,
          },
        })

        if (existingItem) {
          await tx.favoriteItem.delete({
            where: { id: existingItem.id },
          })
          return { action: 'removed' as const, success: true }
        } else {
          await tx.favoriteItem.create({
            data: {
              productId,
              favoriteId: favorite.id,
            },
          })
          return { action: 'added' as const, success: true }
        }
      })

      return result
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw new Error('Failed to toggle favorite')
    }
  }
}
