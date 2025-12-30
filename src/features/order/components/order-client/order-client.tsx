'use client'
import { useActionState, useEffect } from 'react'
import { Paper, Typography, Button, Grid, Box, Divider } from '@mui/material'
import OrderAddress from '../order-address/order-address'
import OrderTotal from '../order-total/order-total'
import OrderPhone from '../order-phone/order-phone'
import { useRouter } from 'next/navigation'
import { IInitialState, sendOrderForm } from '../../actions/actions'
import { useCart } from '@/features/cart/hooks/useCart'
import CheckoutStepper from '@/shared/components/checkout-stepper/checkout-stepper'
import OrderRadioGrop from '../order-radio-group/order-radio-grop'
import s from './order-client.module.css'
import OrderSkeleton from '../order-skeleton/order-skeleton'

const initialState: IInitialState = {
  message: '',
  errors: [],
  success: false,
}

interface Props {
  activeStep: number
}

export default function OrderClient({ activeStep }: Props) {
  const router = useRouter()

  const [state, formAction, pending] = useActionState(
    sendOrderForm,
    initialState
  )

  const { total, totalPrice, isPending, cartCount, totalDiscount } = useCart()

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  if (isPending) {
    return <OrderSkeleton />
  }

  return (
    <section className={s.orderSection}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Placing an order
        </Typography>

        <CheckoutStepper activeStep={activeStep} />
      </Box>

      <div className={s.order}>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <form action={formAction}>
              <OrderAddress state={state} />
              <Divider sx={{ my: 3 }} />
              <OrderPhone state={state} />
              <Divider sx={{ my: 3 }} />
              <OrderRadioGrop />
              <input name="totalPrice" type="hidden" value={total} />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={pending}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: '600',
                }}
              >
                {pending ? 'Design...' : 'Confirm order'}
              </Button>
            </form>
          </Paper>
        </Grid>

        <OrderTotal
          discount={Number(totalDiscount)}
          cartCount={Number(cartCount)}
          total={Number(total)}
          price={Number(totalPrice)}
        />
      </div>
    </section>
  )
}
