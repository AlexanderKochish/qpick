import { Prisma } from '@prisma/client'

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

export interface UseQuantityProps {
  initialQuantity: number
  itemId: string
  onQuantityChange: (params: { itemId: string; quantity: number }) => void
  onRemove?: (itemId: string) => void
  debounceDelay?: number
  minQuantity?: number
  maxQuantity?: number
}
