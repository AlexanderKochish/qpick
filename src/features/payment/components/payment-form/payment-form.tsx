'use client'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CheckoutForm } from '@/features/payment/components/checkout-form/checkout-form'
import { useOrder } from '@/features/order/hooks/useOrder'
import CheckoutFormSkeleton from '../checkout-form-skeleton/checkout-form-skeleton'
import { usePaymentIntent } from '../../hooks/use-payment-intent'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface Props {
  id: string
  step: number
}

export default function PaymentForm({ id, step }: Props) {
  const router = useRouter()
  const { isLoading: orderLoading, error: orderError } = useOrder(id)
  const { data, isLoading, error } = usePaymentIntent({ orderId: id })

  if (!data?.clientSecret) {
    router.replace('/cart')
  }

  if (orderLoading || isLoading) return <CheckoutFormSkeleton />
  if (orderError) return <div>Error loading order: {orderError.message}</div>
  if (error) return <div>Payment error</div>

  return (
    <div>
      {data?.clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: data.clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#1976d2',
                colorBackground: '#f5f5f5',
                borderRadius: '8px',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              },
              rules: {
                '.Input': {
                  padding: '12px 16px',
                  fontSize: '16px',
                },
                '.Label': {
                  fontWeight: '600',
                  marginBottom: '8px',
                },
              },
            },
            loader: 'auto',
            fonts: [
              {
                family: 'Roboto',
                src: 'url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap)',
                weight: '400',
              },
            ],
          }}
        >
          <CheckoutForm orderId={id} step={step} />
        </Elements>
      )}
    </div>
  )
}
