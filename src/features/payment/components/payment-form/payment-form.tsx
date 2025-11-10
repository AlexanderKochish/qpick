'use client'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { CheckoutForm } from '@/features/payment/components/checkout-form'
import { useOrder } from '@/features/order/hooks/useOrder'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface Props {
  id: string
}

export default function PaymentForm({ id }: Props) {
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const {
    data: amount,
    isLoading: orderLoading,
    error: orderError,
  } = useOrder(id)

  useEffect(() => {
    if (!amount) return

    async function createPayment() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: id,
            amount: Math.round(amount! * 100),
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create payment')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment error')
      } finally {
        setIsLoading(false)
      }
    }

    createPayment()
  }, [id, amount])

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
            },
          }}
        >
          <CheckoutForm orderId={id} />
        </Elements>
      )}
    </div>
  )
}
