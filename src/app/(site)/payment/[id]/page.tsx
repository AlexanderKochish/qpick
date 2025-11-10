import PaymentForm from '@/features/payment/components/payment-form/payment-form'

async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>
      <h1>Оплата заказа</h1>
      <PaymentForm id={id} />
    </div>
  )
}

export default PaymentPage
