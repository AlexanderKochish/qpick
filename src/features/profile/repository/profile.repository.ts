import { getCurrentSession } from '@/features/auth/actions/actions'
import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

export class ProfileRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getProfile() {
    const session = await getCurrentSession()

    if (!session) {
      throw new Error('Session is invalid')
    }

    return await this.db.user.findUnique({
      where: { id: session.user.id as string },
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
