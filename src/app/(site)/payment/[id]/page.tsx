import PaymentForm from '@/features/payment/components/payment-form/payment-form'

async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <PaymentForm id={id} />
}

export default PaymentPage
