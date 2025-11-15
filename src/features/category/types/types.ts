import { Image, Prisma } from '@/generated/prisma/client'

export type Category = Prisma.CategoryGetPayload<{
  include: {
    products: true
    _count: {
      select: {
        products: true
      }
    }
  }
}>

export type CategoryProduct = {
  id: string
  name: string
  price: number
  images: Image[]
}
