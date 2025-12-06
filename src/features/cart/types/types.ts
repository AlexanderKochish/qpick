import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export type CartItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            brand: true
            images: true
          }
        }
      }
    }
  }
}>

export type CartItem = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        brand: true
        images: true
      }
    }
  }
}>
type ReplaceDecimalWithNumber<T> = {
  [K in keyof T]: T[K] extends Decimal
    ? number
    : T[K] extends object
      ? ReplaceDecimalWithNumber<T[K]>
      : T[K]
}
export type CartType = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            brand: true
            images: true
          }
        }
      }
    }
  }
}>

export type Cart = ReplaceDecimalWithNumber<CartType>
export type CartItemType = ReplaceDecimalWithNumber<CartItem>
export interface ProductImage {
  id: string
  url: string
  productId: string
  createdAt: Date
  updatedAt: Date
}
