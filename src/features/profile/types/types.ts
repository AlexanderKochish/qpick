import { Order } from '@prisma/client'
import { RatingValue } from '@prisma/client'

export interface EditProfile {
  email: string
  name: string | null
}

export interface UserProfile {
  id: string
  email: string
  name: string | null
  image: string | null
  emailVerified: Date | null
  role: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  avatar: {
    url: string | null
  }
  orders: Order[]
  ratings: Rating[]
  reviews: Review[]
  address: Address[]
}

export interface Rating {
  id: string
  createdAt: Date
  updatedAt: Date
  rating: RatingValue
  authorId: string
  productId: string
  product: Product
}

type Product = {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  price: number
  discount: number | null
  categoryId: string
  brandId: string
}

export interface Review {
  id: string
  review: string
  product: Product
  createdAt: Date
}

export interface Address {
  id: string
  street: string
  city: string
  zipCode: string
  isDefault: boolean
}
