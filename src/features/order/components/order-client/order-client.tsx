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

const initialState: IInitialState = {
  message: '',
  errors: [],
}

interface Props {
  activeStap: number
}

export default function OrderClient({ activeStap }: Props) {
  const router = useRouter()

  const [state, formAction, pending] = useActionState(
    sendOrderForm,
    initialState
  )

  const { data: cart, total, totalDiscount, totalPrice } = useCart()

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  return (
    <section className={s.orderSection}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Оформление заказа
        </Typography>

        <CheckoutStepper activeStep={activeStap} />
      </Box>

      <div className={s.order}>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <form action={formAction}>
              <OrderAddress />
              <Divider sx={{ my: 3 }} />
              <OrderPhone state={state} />
              <Divider sx={{ my: 3 }} />
              <OrderRadioGrop />
              <input name="totalPrice" type="hidden" value={totalPrice} />

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
                {pending ? 'Оформление...' : 'Подтвердить заказ'}
              </Button>
            </form>
          </Paper>
        </Grid>

        <OrderTotal
          discount={Number(totalDiscount)}
          cart={cart}
          total={Number(total)}
        />
      </div>
    </section>
  )
}
