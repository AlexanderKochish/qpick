import { getCurrentSession } from '@/features/auth/actions/actions'
import { PrismaClient } from '@/generated/prisma/client'
import { prisma } from '@/shared/lib/prisma-edge'

export class Counter {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAllCounters() {
    const session = await getCurrentSession()

    if (!session?.user.id) {
      return { favoritesCount: 0, cartItemsCount: 0 }
    }

    const [favoritesCount, cartItemsCount] = await Promise.all([
      this.db.favoriteItem.count({
        where: {
          favorite: {
            userId: session.user.id,
          },
        },
      }),

      this.db.cartItem.count({
        where: {
          cart: {
            userId: session.user.id,
          },
        },
      }),
    ])

    return { favoritesCount, cartItemsCount }
  }
}
