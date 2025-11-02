import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

export class RatingRepository {
  constructor(private readonly db: PrismaClient = prisma) {}
}
