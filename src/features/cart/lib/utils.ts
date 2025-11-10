import {
  Cart,
  Product,
  SerializedCart,
  SerializedCartItem,
  SerializedProduct,
} from '../types/types'

export function serializeCart(cart: Cart): SerializedCart {
  return {
    ...cart,
    items: cart.items.map(
      (item): SerializedCartItem => ({
        ...item,
        product: serializeProduct(item.product),
      })
    ),
  }
}

export function serializeProduct(product: Product): SerializedProduct {
  return {
    ...product,
    price: product.price.toNumber(),
    discount: product.discount?.toNumber() ?? null,
  }
}
