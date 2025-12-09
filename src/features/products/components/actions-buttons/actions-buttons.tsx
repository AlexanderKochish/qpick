'use client'
import s from './actions-buttons.module.css'
import { Box, Button, Grid, IconButton } from '@mui/material'
import { CompareArrows, ShoppingCart } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/features/cart/actions/actions'
import FavoriteToggle from '../favorite-toggle/favorite-toggle'
import ShareButton from '@/shared/components/share-button/share-button'

interface Props {
  productId: string
}

const ActionsButtons = ({ productId }: Props) => {
  const router = useRouter()
  const buyNow = (id: string) => {
    addToCart(id)
    router.push('/cart')
  }

  return (
    <Box className={s.actionButtons}>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCart />}
        className={s.cartButton}
        onClick={() => addToCart(productId)}
      >
        В корзину
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
        <ShareButton />
      </Grid>
    </Box>
  )
}

export default ActionsButtons
