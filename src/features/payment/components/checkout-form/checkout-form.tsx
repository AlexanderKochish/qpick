'use client'

import {
  Box,
  Button,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import s from './checkout-form.module.css'
import OrderTotal from '@/features/order/components/order-total/order-total'
import { useOrder } from '@/features/order/hooks/useOrder'
import { useCart } from '@/features/cart/hooks/useCart'

const steps = ['Корзина', 'Оформление', 'Подтверждение']

export function CheckoutForm({ orderId }: { orderId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeStep, setActiveStep] = useState(2)
  const { data: totalPrice } = useOrder(orderId)
  const { data: cart } = useCart()

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Оформление заказа
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid container spacing={2} size={10}>
        <Grid size={7}>
          <form className={s.form} onSubmit={handleSubmit}>
            <PaymentElement />

            {error && (
              <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
            )}

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
        </Grid>
        <OrderTotal cart={cart} total={Number(totalPrice)} />
      </Grid>
    </Container>
  )
}
