import {
  getCurrentCheckoutStep,
  getOrCreateCart,
} from '@/features/cart/actions/actions'
import OrderClient from '@/features/order/components/order-client/order-client'
import { redirect } from 'next/navigation'

const OrderPage = async () => {
  const cart = await getOrCreateCart()
  if (!cart.id && cart.items.length === 0) {
    redirect('/cart')
  }
  const step = await getCurrentCheckoutStep()
  return <OrderClient activeStap={step} />
}

export default OrderPage
