'use client'

import CartItem from '../cart-item/cart-item'
import EmptyState from '@/shared/components/empty-state/empty-state'
import emptyCart from '../../../../../public/empty-cart.png'
import s from './cart-client.module.css'

import { ICart } from '../../types/types'
import BaseCard from '@/shared/components/base-card/base-card'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material'
import { useCart } from '../../hooks/useCart'
import Image from 'next/image'
import deliveryMap from '../../../../../public/delivery.png'
import { ChevronUpIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  initialData: {
    initialCartData: ICart
    cartTotalPrice: number
  }
}

const CartClient = ({ initialData }: Props) => {
  const { data, totalPrice } = useCart({ initialData })

  if (data?.items.length === 0) {
    return (
      <EmptyState
        img={emptyCart}
        title="Корзина пуста"
        description="Но это никогда не поздно исправить :)"
      />
    )
  }

  return (
    <section className={s.cartSection}>
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

          <BaseCard>
            <h3>Доставка</h3>
            <Image
              src={deliveryMap}
              alt="delivery map"
              width={584}
              height={173}
              sizes="(max-width: 584px) 100vw, 375px"
              quality={85}
              priority={false}
              placeholder="blur"
              className={s.img}
            />
            <Accordion className={s.accordion}>
              <AccordionSummary
                expandIcon={<ChevronUpIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Доставка курьером</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Доставка курьером <span>10 $</span>
              </AccordionDetails>
            </Accordion>
          </BaseCard>
        </div>
        <div className={s.price}>
          <BaseCard>
            <div className={s.totalPrice}>
              <strong>Итого</strong>
              <strong>{totalPrice} $</strong>
            </div>
            <Link href={'/order'}>
              <Button sx={{ width: '100%' }} variant="contained">
                Перейти к оформлению
              </Button>
            </Link>
          </BaseCard>
        </div>
      </div>
    </section>
  )
}

export default CartClient
