import prisma from '@/shared/lib/prisma'
import { Prisma, PrismaClient } from '@prisma/client'

type RatingCreate = {
  rating: string
  authorId: string
  productId: string
}

export class RatingRepository {
  async create(
    data: RatingCreate,
    db: PrismaClient | Prisma.TransactionClient = prisma
  ) {
    if (!data.rating) return null

    const existing = await db.rating.findUnique({
      where: {
        authorId_productId: {
          authorId: data.authorId,
          productId: data.productId,
        },
      },
    })

    if (existing) {
      return await db.rating.update({
        where: { id: existing.id },
        data: {
          rating: Number(data.rating),
        },
      })
    }

    return await db.rating.create({
      data: {
        authorId: data.authorId,
        productId: data.productId,
        rating: Number(data.rating),
      },
    })
  }
}
