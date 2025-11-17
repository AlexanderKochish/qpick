import { Prisma } from '@/generated/prisma/client'
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

export type CartItemType = Prisma.CartItemGetPayload<{
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
export interface ICart {
  items: ({
    product: {
      images: {
        id: string
        createdAt: Date
        updatedAt: Date
        productId: string
        url: string
      }[]
    } & {
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      description: string
      price: number
      discount: number | null
      categoryId: string
      brandId: string
    }
  } & {
    id: string
    createdAt: Date
    updatedAt: Date
    cartId: string
    productId: string
    quantity: number
  })[]
}
export interface ProductImage {
  id: string
  url: string
  productId: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: Prisma.Decimal
  discount?: Prisma.Decimal | null
  categoryId: string
  brandId: string
  images: ProductImage[]
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: Product
}
export interface SerializedProduct {
  id: string
  name: string
  description: string
  price: number
  discount?: number | null
  categoryId: string
  productModelId: string
  images: ProductImage[]
  createdAt: Date
  updatedAt: Date
}

export interface SerializedCartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: SerializedProduct
}

export interface SerializedCart {
  id: string
  userId: string | null
  visitorId: string | null
  createdAt: Date
  updatedAt: Date
  items: SerializedCartItem[]
}
