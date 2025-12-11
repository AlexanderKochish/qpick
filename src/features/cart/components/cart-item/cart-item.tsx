'use client'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Button,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { CartItemType } from '../../types/types'
import { useQuantity } from '@/features/products/hooks/use-quantity'
import s from './cart-item.module.css'

interface Props {
  quantity: number
  item: CartItemType
}

const CartItem = ({ item, quantity }: Props) => {
  const { handleDecrease, handleIncrease, qtity, handleRemove } = useQuantity({
    initialQuantity: quantity,
    productId: item.productId,
  })

  const price = Number(item.product.price)
  const discount = Number(item.product.discount)
  const finalPrice = price * (1 - discount / 100)
  const total = finalPrice * qtity

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ lg: 2, md: 12, xs: 14 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                backgroundImage: `url(${item.product.images[0].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Grid>

          <Grid size={{ lg: 4, md: 12, xs: 14 }}>
            <Typography variant="h6" fontWeight="600">
              {item.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.product.brand.name}
            </Typography>

            {discount > 0 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={`-${discount}%`} color="error" size="small" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {price.toLocaleString()} €
                </Typography>
              </Box>
            )}

            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              {finalPrice.toLocaleString()} €
            </Typography>
          </Grid>

          <Grid size={{ lg: 3, md: 12, xs: 14 }}>
            <Box className={s.quantitySection}>
              <Box className={s.quantityControls}>
                <Button onClick={handleDecrease} disabled={qtity <= 1}>
                  -
                </Button>
                <Typography className={s.quantity}>{qtity}</Typography>
                <Button onClick={handleIncrease}>+</Button>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ lg: 3, md: 12, xs: 14 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" fontWeight="600">
                {total.toLocaleString()} €
              </Typography>
              <IconButton onClick={handleRemove} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CartItem
