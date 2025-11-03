import prisma from '@/shared/lib/prisma'
import { PrismaClient } from '@prisma/client'

export class UserRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAll() {}

  async getById(id: string) {}
  async getAllByCategory(categoryId: string) {}

  async create(data: any) {}

  async update(data: any) {}

  async removeById(id: string) {}
}
