import { Prisma } from '@/generated/prisma/client'

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true
    reviews: {
      include: {
        author: {
          include: {
            avatar: true
          }
        }
      }
    }
    ratings: {
      include: {
        author: {
          include: {
            avatar: true
          }
        }
      }
    }
    category: true
    brand: true
    _count: {
      select: {
        ratings: true
        reviews: true
        orderItems: true
      }
    }
  }
}>

export type ProductCard = Prisma.ProductGetPayload<{
  include: {
    images: true
    reviews: true
    ratings: true
    category: true
    brand: true
    _count: {
      select: {
        ratings: true
        reviews: true
        orderItems: true
      }
    }
  }
}>
