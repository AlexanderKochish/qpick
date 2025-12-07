import prisma from '@/shared/lib/prisma'
import { Prisma, PrismaClient } from '@prisma/client'

type ReviewCreate = {
  review: string
  authorId: string
  productId: string
}

export class ReviewRepository {
  async create(
    data: ReviewCreate,
    db: PrismaClient | Prisma.TransactionClient = prisma
  ) {
    if (!data.review) return null

    const existing = await db.review.findUnique({
      where: {
        productId_authorId: {
          productId: data.productId,
          authorId: data.authorId,
        },
      },
    })

    if (existing) {
      return await db.review.update({
        where: { id: existing.id },
        data: {
          status: 'PENDING',
          review: data.review,
        },
      })
    }

    return await db.review.create({
      data: {
        status: 'PENDING',
        authorId: data.authorId,
        productId: data.productId,
        review: data.review,
      },
    })
  }
}
