'use client'
import s from './actions-buttons.module.css'
import { Box, Button, Grid, IconButton } from '@mui/material'
import { CompareArrows, ShoppingCart } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/features/cart/actions/actions'
import FavoriteToggle from '../favorite-toggle/favorite-toggle'
import ShareButton from '@/shared/components/share-button/share-button'
import { useCart } from '@/features/cart/hooks/useCart'

interface Props {
  productId: string
}

const ActionsButtons = ({ productId }: Props) => {
  const router = useRouter()
  const buyNow = (id: string) => {
    addToCart(id)
    router.push('/cart')
  }
  const { data } = useCart()

  const isAddedToCart = data?.items.some((item) => item.productId === productId)

  return (
    <Box className={s.actionButtons}>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCart />}
        className={s.cartButton}
        onClick={() => addToCart(productId)}
        disabled={isAddedToCart}
      >
        {isAddedToCart ? 'В корзине' : 'В корзину'}
      </Button>
      <Button
        variant="outlined"
        size="large"
        className={s.buyButton}
        onClick={() => buyNow(productId)}
      >
        Купить сейчас
      </Button>
      <Grid container spacing={2}>
        <FavoriteToggle productId={productId} />
        <IconButton className={s.actionButton}>
          <CompareArrows />
        </IconButton>
        <ShareButton link={`/product/${productId}`} />
      </Grid>
    </Box>
  )
}

export default ActionsButtons
