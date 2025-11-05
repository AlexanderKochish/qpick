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
      productModelId: string
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
