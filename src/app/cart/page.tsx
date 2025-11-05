import { getOrCreateCart } from '@/features/cart/actions/actions'
import CartClient from '@/features/cart/components/cart-client/cart-client'

const CartPage = async () => {
  const initialCartData = await getOrCreateCart()
  return <CartClient initialCartData={initialCartData} />
}

export default CartPage
