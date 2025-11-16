'use client'
import { useActionState, useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  FormControl,
  Box,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material'
import { Payment } from '@mui/icons-material'
import OrderAddress from '../order-address/order-address'
import OrderTotal from '../order-total/order-total'
import OrderPhone from '../order-phone/order-phone'
import { useRouter } from 'next/navigation'
import { IInitialState, sendOrderForm } from '../../actions/actions'
import { useCart } from '@/features/cart/hooks/useCart'

const steps = ['Корзина', 'Оформление', 'Подтверждение']

const initialState: IInitialState = {
  message: '',
  errors: [],
}

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState('')
  const [activeStep, setActiveStep] = useState(1)
  const [state, formAction, pending] = useActionState(
    sendOrderForm,
    initialState
  )
  const { totalPrice } = useCart()

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value)
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

      <Grid container spacing={4}>
        <Grid size={8}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <form action={formAction}>
              <OrderAddress />
              <Divider sx={{ my: 3 }} />
              <OrderPhone state={state} />
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Payment color="primary" />
                  Способ оплаты
                </Typography>

                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    name="paymentType"
                    value={selectedPayment}
                    onChange={handlePaymentChange}
                  >
                    <Grid container spacing={2}>
                      <Grid size={5}>
                        <Paper
                          variant={
                            selectedPayment === 'CARD'
                              ? 'elevation'
                              : 'outlined'
                          }
                          sx={{
                            p: 2,
                            border:
                              selectedPayment === 'CARD'
                                ? '2px solid'
                                : '1px solid',
                            borderColor:
                              selectedPayment === 'CARD'
                                ? 'primary.main'
                                : 'divider',
                            borderRadius: 2,
                            cursor: 'pointer',
                          }}
                        >
                          <FormControlLabel
                            value="CARD"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography fontWeight="600">
                                  Банковская карта
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Visa, MasterCard, Мир
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </Grid>

                      <Grid size={6}>
                        <Paper
                          variant={
                            selectedPayment === 'CASH'
                              ? 'elevation'
                              : 'outlined'
                          }
                          sx={{
                            p: 2,
                            border:
                              selectedPayment === 'CASH'
                                ? '2px solid'
                                : '1px solid',
                            borderColor:
                              selectedPayment === 'CASH'
                                ? 'primary.main'
                                : 'divider',
                            borderRadius: 2,
                            cursor: 'pointer',
                          }}
                        >
                          <FormControlLabel
                            value="CASH"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography fontWeight="600">
                                  Наличные
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Оплата при получении
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </Grid>

                      <Grid size={6}>
                        <Paper
                          variant={
                            selectedPayment === 'APPLE_PAY'
                              ? 'elevation'
                              : 'outlined'
                          }
                          sx={{
                            p: 2,
                            border:
                              selectedPayment === 'APPLE_PAY'
                                ? '2px solid'
                                : '1px solid',
                            borderColor:
                              selectedPayment === 'APPLE_PAY'
                                ? 'primary.main'
                                : 'divider',
                            borderRadius: 2,
                            cursor: 'pointer',
                          }}
                        >
                          <FormControlLabel
                            value="APPLE_PAY"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography fontWeight="600">
                                  Apple Pay
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Быстрая оплата
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </Grid>

                      <Grid size={6}>
                        <Paper
                          variant={
                            selectedPayment === 'GOOGLE_PAY'
                              ? 'elevation'
                              : 'outlined'
                          }
                          sx={{
                            p: 2,
                            border:
                              selectedPayment === 'GOOGLE_PAY'
                                ? '2px solid'
                                : '1px solid',
                            borderColor:
                              selectedPayment === 'GOOGLE_PAY'
                                ? 'primary.main'
                                : 'divider',
                            borderRadius: 2,
                            cursor: 'pointer',
                          }}
                        >
                          <FormControlLabel
                            value="GOOGLE_PAY"
                            control={<Radio />}
                            label={
                              <Box>
                                <Typography fontWeight="600">
                                  Google Pay
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Быстрая оплата
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Box>
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

        <OrderTotal />
      </Grid>
    </Container>
  )
}
