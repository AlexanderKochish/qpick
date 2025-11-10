export interface UserProfile {
  id: string
  email: string
  name: string
  image?: string
  emailVerified: Date | null
  role: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  avatar?: {
    url: string
  }
  orders: Order[]
  ratings: Rating[]
  reviews: Review[]
  address: Address[]
}

export interface Order {
  id: string
  status: string
  total: number
  createdAt: Date
}

export interface Rating {
  id: string
  value: number
  product: {
    name: string
  }
  createdAt: Date
}

export interface Review {
  id: string
  title: string
  product: {
    name: string
  }
  createdAt: Date
}

export interface Address {
  id: string
  street: string
  city: string
  zipCode: string
  isDefault: boolean
}
