'use client'
import { useState } from 'react'
import { Container, Grid, Typography, Box } from '@mui/material'
import { LocalMall } from '@mui/icons-material'
import { Cart } from '../../types/types'
import emptyCart from '../../../../../public/empty-cart.png'
import { useCart } from '../../hooks/useCart'
import EmptyState from '@/shared/components/empty-state/empty-state'
import CartItem from '../cart-item/cart-item'
import CartTotal from '../cart-total/cart-total'
import CheckoutStepper from '@/shared/components/checkout-stepper/checkout-stepper'

interface Props {
  initialData: {
    initialCartData: Cart
    cartTotalPrice: number
    activeStep: number
  }
}

export default function CartPage({ initialData }: Props) {
  const { data: cart, totalPrice: subtotal } = useCart({ initialData })
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState('')

  if (cart?.items.length === 0 || !subtotal) {
    return (
      <EmptyState
        img={emptyCart}
        title="Корзина пуста"
        description="Но это никогда не поздно исправить :)"
      />
    )
  }

  const totalDiscount = cart?.items.reduce(
    (sum, item) =>
      sum +
      ((Number(item.product.price) * Number(item.product.discount)) / 100) *
        item.quantity,
    0
  )
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0
  const total = subtotal - totalDiscount! - promoDiscount

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          <LocalMall sx={{ mr: 2, verticalAlign: 'middle' }} />
          Корзина покупок
        </Typography>

        <CheckoutStepper activeStep={initialData.activeStep} />
      </Box>

      <Grid container spacing={4}>
        <Grid size={7}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Товары в корзине ({cart?.items.length})
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
          subtotal={subtotal}
          total={total}
          setPromoCode={setPromoCode}
          removePromoCode={removePromoCode}
          totalDiscount={totalDiscount!}
        />
      </Grid>
    </Container>
  )
}
