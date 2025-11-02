import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

export class CartRepository {
  constructor(private readonly db: PrismaClient = prisma) {}
}
