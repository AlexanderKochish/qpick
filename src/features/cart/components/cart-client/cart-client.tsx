'use client'

import CartItem from '../cart-item/cart-item'
import EmptyState from '@/shared/components/empty-state/empty-state'
import emptyCart from '../../../../../public/empty-cart.png'
import s from './cart-client.module.css'

import { ICart } from '../../types/types'
import BaseCard from '@/shared/components/base-card/base-card'
import { Button } from '@mui/material'
import { useCart } from '../../hooks/useCart'

interface Props {
  initialData: {
    initialCartData: ICart
    cartTotalPrice: number
  }
}

const CartClient = ({ initialData }: Props) => {
  const { data, totalPrice } = useCart({ initialData })

  return (
    <div className="container">
      <div className={s.wrapper}>
        <h2>Корзина</h2>
        <div className={s.cart}>
          <div className={s.cartItems}>
            {data?.items &&
              data.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item.product}
                  quantity={item.quantity}
                />
              ))}
            {data?.items?.length === 0 && (
              <EmptyState
                img={emptyCart}
                title="Корзина пуста"
                description="Но это никогда не поздно исправить :)"
              />
            )}
          </div>
          <div>
            <BaseCard>
              <div className={s.totalPrice}>
                <strong>Итого</strong>
                <strong>{totalPrice} $</strong>
              </div>
              <Button variant="contained">Перейти к оформлению</Button>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartClient
