'use client'

import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { useDebounce } from '@/shared/hooks/useDebounce'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'
import { CartItemType } from '../../types/types'
import { removeCartItem } from '../../actions/actions'

interface Props {
  quantity: number
  item: CartItemType
}

const CartItem = ({ item, quantity }: Props) => {
  const [qtity, setQtity] = useState(quantity)
  const { updateQuantity } = useCart()

  const debouncedQty = useDebounce(qtity, 400)

  useEffect(() => {
    updateQuantity({
      itemId: item.productId,
      quantity: +debouncedQty,
    })
  }, [debouncedQty, item.productId, updateQuantity])

  const handleDecrease = () => {
    setQtity((prev) => Math.max(1, prev - 1))
  }

  const handleIncrease = () => {
    setQtity((prev) => prev + 1)
  }

  const handleRemove = () => {
    removeCartItem(item.productId)
    updateQuantity({
      itemId: item.productId,
      quantity: 0,
    })
  }

  const price = Number(item.product.price)
  const discount = Number(item.product.discount)
  const finalPrice = Math.round(price * (1 - discount / 100))
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleDecrease}
                disabled={qtity <= 1}
              >
                <Remove />
              </IconButton>

              <Typography
                variant="h6"
                sx={{ minWidth: 40, textAlign: 'center' }}
              >
                {qtity}
              </Typography>

              <IconButton size="small" onClick={handleIncrease}>
                <Add />
              </IconButton>
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
