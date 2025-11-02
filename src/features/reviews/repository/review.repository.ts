import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

export class ReviewRepository {
  constructor(private readonly db: PrismaClient = prisma) {}
}
