'use client'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { CheckoutForm } from '@/features/payment/components/checkout-form/checkout-form'
import { useOrder } from '@/features/order/hooks/useOrder'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface Props {
  id: string
  step: number
}

export default function PaymentForm({ id, step }: Props) {
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { isLoading: orderLoading, error: orderError } = useOrder(id)

  useEffect(() => {
    if (!id) return

    async function loadPI() {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: id }),
        })

        const data = await res.json()
        setClientSecret(data.clientSecret)
      } finally {
        setIsLoading(false)
      }
    }

    loadPI()
  }, [id])

  if (orderLoading || isLoading) return <div>Loading payment...</div>
  if (orderError) return <div>Error loading order: {orderError.message}</div>
  if (error) return <div>Payment error: {error}</div>

  return (
    <div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
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
