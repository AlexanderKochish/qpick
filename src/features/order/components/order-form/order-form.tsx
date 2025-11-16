'use client'
import React, { useActionState, useEffect } from 'react'
import s from './order-form.module.css'
import BaseCard from '@/shared/components/base-card/base-card'
import Image from 'next/image'
import AddressForm from '../order-address/order-address'
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import addressMap from '../../../../../public/delivery.png'
import OrderInfo from '../order-info/order-info'
import { IInitialState, sendOrderForm } from '../../actions/actions'
import { useRouter } from 'next/navigation'
import { useOrder } from '../../hooks/useOrder'
import { useCart } from '@/features/cart/hooks/useCart'

const initialState: IInitialState = {
  message: '',
  errors: [],
}

const OrderForm = () => {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    sendOrderForm,
    initialState
  )
  const { data: cart, totalPrice } = useCart()

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  return (
    <form action={formAction} className={s.order}>
      <BaseCard>
        <div className={s.title}>
          <strong>Доставка курьером</strong>
          <span>10 $</span>
          <input name="totalPrice" type="hidden" value={totalPrice} />
        </div>
        <Image
          src={addressMap}
          alt="Карта с адресом"
          width={375}
          height={145}
          sizes="(max-width: 375px) 100vw, 375px"
          quality={85}
          priority={false}
          placeholder="blur"
          className={s.img}
        />
        <AddressForm />
      </BaseCard>
      <div className={s.orderDetails}>
        <OrderInfo products={cart} totalPrice={totalPrice} />
        <BaseCard>
          <div className={s.input}>
            <InputLabel id="payment-type">
              <strong>Способы оплаты</strong>
            </InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="payment-type"
              id="payment-type"
              value={'CARD'}
              name="paymentType"
              label="Payment type"
            >
              <MenuItem value={'CARD'}>Mono Bank</MenuItem>
              <MenuItem value={'CASH'}>Stripe</MenuItem>
              <MenuItem value={'GOOGLE_PAY'}>Pay Pal</MenuItem>
            </Select>
          </div>
        </BaseCard>
        <BaseCard>
          <div className={s.input}>
            <InputLabel htmlFor="phone">
              <strong>Номер получателя</strong>
            </InputLabel>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="phone"
              fullWidth
              size="small"
            />
          </div>
        </BaseCard>
        <Button type="submit" disabled={pending} variant="contained">
          Закончить оформление
        </Button>
      </div>
    </form>
  )
}

export default OrderForm
