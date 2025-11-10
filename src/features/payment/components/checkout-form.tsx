'use client'

import { Button } from '@mui/material'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'

export function CheckoutForm({ orderId }: { orderId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setError('Payment system not ready')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order/success/${orderId}`,
        },
      })

      if (error) {
        setError(error.message || 'Payment failed')
      }
    } catch (err) {
      setError('Unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}
