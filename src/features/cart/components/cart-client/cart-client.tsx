'use client'
import { useState } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { LocalMall } from '@mui/icons-material'
import { Cart } from '../../types/types'
import emptyCart from '../../../../../public/empty-cart.png'
import { useCart } from '../../hooks/useCart'
import EmptyState from '@/shared/components/empty-state/empty-state'
import CartItem from '../cart-item/cart-item'
import CartTotal from '../cart-total/cart-total'
import CheckoutStepper from '@/shared/components/checkout-stepper/checkout-stepper'
import s from './cart-client.module.css'

interface Props {
  initialData: {
    initialCartData: Cart
    cartTotalPrice: number
    activeStep: number
  }
}

export default function CartPage({ initialData }: Props) {
  const {
    data: cart,
    total,
    setAppliedPromo,
    appliedPromo,
    promoDiscount,
    totalDiscount,
    cartCount,
  } = useCart({ initialData })
  const [promoCode, setPromoCode] = useState('')

  if (cartCount === 0 || !total) {
    return (
      <EmptyState
        img={emptyCart}
        title="The cart is empty"
        description="But it's never too late to fix that :)"
      />
    )
  }

  const applyPromoCode = () => {
    if (promoCode.trim() && !appliedPromo) {
      setAppliedPromo(promoCode)
      setPromoCode('')
    }
  }

  const removePromoCode = () => {
    setAppliedPromo('')
  }

  return (
    <section className={s.cartSection}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          <LocalMall sx={{ mr: 2, verticalAlign: 'middle' }} />
          Shopping Cart
        </Typography>

        <CheckoutStepper activeStep={1} />
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Products in the cart ({cartCount})
          </Typography>

          {cart?.items.map((item) => (
            <CartItem key={item.id} item={item} quantity={item.quantity} />
          ))}
        </Grid>
        <CartTotal
          appliedPromo={appliedPromo}
          cartItemsCount={cart?.items.length}
          promoCode={promoCode}
          applyPromoCode={applyPromoCode}
          promoDiscount={promoDiscount}
          subtotal={total}
          total={total}
          setPromoCode={setPromoCode}
          removePromoCode={removePromoCode}
          totalDiscount={totalDiscount!}
        />
      </Grid>
    </section>
  )
}
