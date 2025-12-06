import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'
type ReviewCreate = {
  review: string
  authorId: string
  productId: string
}
export class ReviewRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async create(data: ReviewCreate) {
    const existing = await this.db.review.findUnique({
      where: {
        productId_authorId: {
          productId: data.productId,
          authorId: data.authorId,
        },
      },
    })
    if (existing) {
      await this.db.review.update({
        where: { id: existing.id },
        data: {
          status: 'PENDING',
          ...data,
        },
      })
    } else {
      await this.db.review.create({
        data: {
          status: 'PENDING',
          ...data,
        },
      })
    }
  }
}
