'use client'

import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import s from './checkout-form.module.css'
import OrderTotal from '@/features/order/components/order-total/order-total'
import { useCart } from '@/features/cart/hooks/useCart'
import { useRouter } from 'next/navigation'
import CheckoutStepper from '@/shared/components/checkout-stepper/checkout-stepper'

export function CheckoutForm({
  orderId,
  step,
}: {
  orderId: string
  step: number
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { total, cartCount } = useCart()
  const router = useRouter()

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

  async function handleReject() {
    const res = await fetch('/api/order/cancel', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    })

    if (res.ok) {
      router.push('/cart')
      router.refresh()
    } else {
      console.error('Failed to cancel order')
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Оформление заказа
        </Typography>

        <CheckoutStepper activeStep={step} />
      </Box>
      <Grid container spacing={2} size={12}>
        <Grid size={{ lg: 7, xs: 12 }}>
          <form className={s.form} onSubmit={handleSubmit}>
            <PaymentElement />

            {error && (
              <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
            )}
            <div className={s.btnsGroup}>
              <Button
                type="submit"
                variant="outlined"
                color="error"
                onClick={handleReject}
                fullWidth
              >
                Отклонить
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!stripe || isLoading}
              >
                {isLoading ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </form>
        </Grid>
        <OrderTotal
          cartCount={cartCount}
          total={Number(total)}
          price={Number(total)}
        />
      </Grid>
    </Container>
  )
}
