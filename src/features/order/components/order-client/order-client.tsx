// import s from './order-client.module.css'
// import OrderForm from '../order-form/order-form'

// const OrderClient = () => {
//   return (
//     <section className={s.orderSection}>
//       <h2>Оформление заказа</h2>
//       <OrderForm />
//     </section>
//   )
// }

// export default OrderClient

'use client'
import { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider,
  Alert,
} from '@mui/material'
import { LocalShipping, Payment, Person, Place } from '@mui/icons-material'
import { z } from 'zod'
import { OrderFormData, orderSchema } from '../../lib/zod/order.schema'

const steps = ['Корзина', 'Оформление', 'Подтверждение']

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   watch,
  // } = useForm<OrderFormData>({
  //   resolver: zodResolver(orderSchema),
  //   defaultValues: {
  //     paymentType: 'CARD',
  //     apartment: '',
  //   },
  // })

  const handleSubmit = () => {}

  const onSubmit = async (data: OrderFormData) => {
    try {
      // Симуляция API запроса
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Order data:', data)
      setActiveStep(2)
    } catch (error) {
      console.error('Order submission error:', error)
    }
  }

  const selectedPayment = 'hello'

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Шаги оформления */}
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
        {/* Форма оформления */}
        <Grid size={8}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <form>
              {/* Адрес доставки */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Place color="primary" />
                  Адрес доставки
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={4}>
                    <TextField
                      fullWidth
                      label="Город"
                      // {...register('city')}
                      // error={!!errors.city}
                      // helperText={errors.city?.message}
                      placeholder="Например: Москва"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Улица"
                      // {...register('street')}
                      // error={!!errors.street}
                      // helperText={errors.street?.message}
                      placeholder="Например: Ленина"
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Дом"
                      // {...register('building')}
                      // error={!!errors.building}
                      // helperText={errors.building?.message}
                      placeholder="Например: 15"
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Квартира (необязательно)"
                      // {...register('apartment')}
                      // error={!!errors.apartment}
                      // helperText={errors.apartment?.message}
                      placeholder="Например: 42"
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Почтовый индекс"
                      // {...register('postalCode')}
                      // error={!!errors.postalCode}
                      // helperText={errors.postalCode?.message}
                      placeholder="12345"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Контактная информация */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Person color="primary" />
                  Контактная информация
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={4}>
                    <TextField
                      fullWidth
                      label="Телефон"
                      // {...register('phone')}
                      // error={!!errors.phone}
                      // helperText={errors.phone?.message}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Способ оплаты */}
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
                    value={selectedPayment}
                    // {...register('paymentType')}
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
                          // onClick={() => register('paymentType').onChange({ target: { value: 'CARD' } })}
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

                      <Grid item xs={12} md={6}>
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
                          // onClick={() => register('paymentType').onChange({ target: { value: 'CASH' } })}
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

                      <Grid item xs={12} md={6}>
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
                          // onClick={() => register('paymentType').onChange({ target: { value: 'APPLE_PAY' } })}
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

                      <Grid item xs={12} md={6}>
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
                          // onClick={() => register('paymentType').onChange({ target: { value: 'GOOGLE_PAY' } })}
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
                  {/* {errors.paymentType && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {errors.paymentType.message}
                    </Alert>
                  )} */}
                </FormControl>
              </Box>

              {/* Скрытое поле totalPrice */}
              <input
                type="hidden"
                // {...register('totalPrice')}
                value="199990" // Здесь должна быть реальная сумма из корзины
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                // disabled={isSubmitting}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: '600',
                }}
              >
                {/* {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'} */}
                Success
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Боковая панель с итогами */}
        <Grid size={4}>
          <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Итоги заказа
            </Typography>

            <Box sx={{ space: 2, mb: 3 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Товары (3)
                </Typography>
                <Typography variant="body2">154,970 ₽</Typography>
              </Box>

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Скидка
                </Typography>
                <Typography variant="body2" color="success.main">
                  -5,000 ₽
                </Typography>
              </Box>

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Доставка
                </Typography>
                <Typography variant="body2" color="success.main">
                  Бесплатно
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="600">
                  Итого
                </Typography>
                <Typography variant="h5" fontWeight="600" color="primary">
                  149,970 ₽
                </Typography>
              </Box>
            </Box>

            <Box sx={{ backgroundColor: 'info.light', p: 2, borderRadius: 2 }}>
              <Typography
                variant="body2"
                color="info.dark"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <LocalShipping fontSize="small" />
                Бесплатная доставка за 1-2 дня
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
