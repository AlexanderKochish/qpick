import OrderSuccess from '@/features/order/components/order-success/order-success'

async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <OrderSuccess id={id} />
}

export default SuccessPage
