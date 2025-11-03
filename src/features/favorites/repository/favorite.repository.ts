import { PrismaClient } from '@/generated/prisma/client'
import prisma from '@/shared/lib/prisma'

export class FavoriteRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  async getAll() {
    return await this.db.favorite.findMany()
  }

  async getAllAmount() {
    return await this.db.favorite.count()
  }

  async getById(id: string) {}
  async getAllByCategory(categoryId: string) {}

  async addToFavorite(id: string) {}

  async update(data: any) {}

  async removeById(id: string) {}
}
