import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

enum RatingValue {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

type RatingCreate = {
  rating: RatingValue
}

export class RatingRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async create(data: RatingCreate) {}
}
