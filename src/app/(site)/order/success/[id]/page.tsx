import BaseCard from '@/shared/components/base-card/base-card'
import s from './page.module.css'
import { confirmPayment } from '@/features/payment/actions/actions'

async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // for development
  try {
    await confirmPayment(id)
    console.log('✅ Payment manually confirmed')
  } catch (error) {
    console.log('⚠️ Manual confirmation failed (maybe already confirmed)')
  }
  return (
    <div className={s.successSection}>
      <BaseCard>
        <div className={s.content}>
          <h1 className={s.title}>Payment Successful!</h1>
          <p>
            Your order id is <strong>№ {id}</strong>, our manager will contact
            you.
          </p>
        </div>
      </BaseCard>
    </div>
  )
}

export default SuccessPage
