import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

export class ProfileRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getProfile(userId?: string) {
    return await this.db.user.findUnique({
      where: { id: userId as string },
      include: {
        ratings: {
          include: {
            product: true,
          },
        },
        reviews: {
          include: {
            product: true,
          },
        },
        address: true,
        orders: true,
        avatar: true,
      },
    })
  }
}
