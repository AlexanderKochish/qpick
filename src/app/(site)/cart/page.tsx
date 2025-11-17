import {
  getCartTotalPrice,
  getCurrentCheckoutStep,
  getOrCreateCart,
} from '@/features/cart/actions/actions'
import CartClient from '@/features/cart/components/cart-client/cart-client'

const CartPage = async () => {
  const [initialCartData, cartTotalPrice, step] = await Promise.all([
    getOrCreateCart(),
    getCartTotalPrice(),
    getCurrentCheckoutStep(),
  ])

  const initialData = {
    initialCartData,
    cartTotalPrice,
    activeStep: step,
  }

  return <CartClient initialData={initialData} />
}

export default CartPage
