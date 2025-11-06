import {
  getCartTotalPrice,
  getOrCreateCart,
} from '@/features/cart/actions/actions'
import CartClient from '@/features/cart/components/cart-client/cart-client'

const CartPage = async () => {
  const [initialCartData, cartTotalPrice] = await Promise.all([
    getOrCreateCart(),
    getCartTotalPrice(),
  ])

  const initialData = {
    initialCartData,
    cartTotalPrice,
  }

  return <CartClient initialData={initialData} />
}

export default CartPage
