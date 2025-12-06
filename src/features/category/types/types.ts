import { Image, Prisma } from '@prisma/client'

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
