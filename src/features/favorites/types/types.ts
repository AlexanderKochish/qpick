import { Prisma } from '@/generated/prisma/client'

export type Favorite = Prisma.FavoriteGetPayload<{
  include: {
    items: {
      select: {
        product: {
          include: {
            images: true
            category: true
          }
        }
      }
    }
    _count: true
  }
}>

export interface FavoriteCardType {
  id: string
  name: string
  description: string
  price: number
  discount: number | null

  images: {
    url: string
  }[]

  category: {
    name: string
  }

  _count?: {
    ratings: number
  }
}
