import { getCurrentCheckoutStep } from '@/features/cart/actions/actions'
import { getOrderById } from '@/features/order/actions/actions'
import PaymentForm from '@/features/payment/components/payment-form/payment-form'
import { redirect } from 'next/navigation'

async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const step = await getCurrentCheckoutStep()
  if (!id) {
    redirect('/cart')
  }

  const order = await getOrderById(id)

  if (!order) {
    redirect('/cart')
  }

  return <PaymentForm id={id} step={step} />
}

export default PaymentPage
