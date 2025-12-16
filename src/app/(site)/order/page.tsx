import { getCurrentSession } from '@/features/auth/actions/actions'
import {
  getCurrentCheckoutStep,
  getOrCreateCart,
} from '@/features/cart/actions/actions'
import OrderClient from '@/features/order/components/order-client/order-client'
import { redirect, RedirectType } from 'next/navigation'

const OrderPage = async () => {
  const cart = await getOrCreateCart()
  const step = await getCurrentCheckoutStep()
  const session = await getCurrentSession()

  if (!session) {
    redirect('/auth/sign-in?redirect=/order', RedirectType.replace)
  }

  if (cart.items.length === 0) {
    redirect('/cart', RedirectType.replace)
  }

  return <OrderClient activeStep={step} />
}

export default OrderPage
