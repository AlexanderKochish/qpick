import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'

export class UserRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAll() {
    return await this.db.user.findMany()
  }
}
