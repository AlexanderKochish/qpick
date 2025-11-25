import { PrismaClient } from '@/generated/prisma/client'
import { ReviewCreateInput } from '@/generated/prisma/models'
import prisma from '@/shared/lib/prisma'

export class ReviewRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async create(data: ReviewCreateInput, authorId: string) {
    if (!authorId) return null
    return await this.db.review.create({
      data,
    })
  }
}
