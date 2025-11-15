import { OrderStatus, RatingValue } from '@/generated/prisma/enums'
import { Decimal } from '@prisma/client/runtime/library'

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

export interface Order {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  status: OrderStatus
  totalPrice: Decimal
  shippingAddressId: string | null
  paymentId: string | null
  customerEmail: string
  customerPhone: string
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
  price: Decimal
  discount: number | null
  categoryId: string
  productModelId: string
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
