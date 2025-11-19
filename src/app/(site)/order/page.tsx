import {
  getCurrentCheckoutStep,
  getOrCreateCart,
} from '@/features/cart/actions/actions'
import OrderClient from '@/features/order/components/order-client/order-client'
import { redirect, RedirectType } from 'next/navigation'

const OrderPage = async () => {
  const cart = await getOrCreateCart()
  const step = await getCurrentCheckoutStep()
  console.log({ cart })
  if (cart.items.length === 0) {
    redirect('/cart', RedirectType.replace)
  }

  return <OrderClient activeStap={step} />
}

export default OrderPage
