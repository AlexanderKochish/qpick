'use client'

import s from './card.module.css'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Favorite, ShoppingCart } from '@mui/icons-material'
import Link from 'next/link'
import { FavoriteCardType } from '../../types/types'
import { useFavorites } from '@/features/products/hooks/use-favorites'
import { calculateFinalPrice, formatPrice } from '@/shared/utils/price'
import { useCart } from '@/features/cart/hooks/useCart'

interface Props {
  product: FavoriteCardType
}

const FavoriteCard = ({ product }: Props) => {
  const { mutate } = useFavorites()
  const { addProductToCart } = useCart()
  const theme = useTheme()

  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  const finalPrice = product.discount
    ? calculateFinalPrice(product.price, product.discount)
    : product.price
  return (
    <Card className={s.productCardRow}>
      <Box className={s.cardRowContent}>
        <Box className={s.imageSection}>
          {product.discount && product.discount > 0 ? (
            <Chip
              label={`-${product.discount}%`}
              color="error"
              size="small"
              className={s.discountBadge}
            />
          ) : null}

          <IconButton
            className={s.actionButton}
            onClick={() => mutate(product.id)}
          >
            <Favorite className={s.favoriteActive} />
          </IconButton>

          <Link href={`/product/${product.id}`}>
            <CardMedia
              component="img"
              image={product.images[0].url || '/api/placeholder/400/400'}
              alt={product.name}
              className={s.productImageRow}
            />
          </Link>
        </Box>

        <CardContent className={s.cardContentRow}>
          <Chip
            label={product.category.name}
            size="small"
            variant="outlined"
            className={s.categoryChip}
          />

          <Link href={`/product/${product.id}`} className={s.productLink}>
            <Typography variant="h6" className={s.productNameRow}>
              {product.name}
            </Typography>
          </Link>

          <Typography
            variant="body2"
            color="text.secondary"
            className={s.productDescriptionRow}
          >
            {product.description}
          </Typography>
        </CardContent>

        <Box className={s.actionSection}>
          <Box className={s.priceSectionRow}>
            {product.discount && Number(product.discount) > 0 ? (
              <>
                <Typography variant="h6" className={s.finalPrice}>
                  {finalPrice && formatPrice(finalPrice)} €
                </Typography>
                <Typography variant="body2" className={s.originalPrice}>
                  {formatPrice(Number(product.price))} €
                </Typography>
              </>
            ) : (
              <Typography variant="h6" className={s.finalPrice}>
                {formatPrice(Number(product.price))} €
              </Typography>
            )}
          </Box>

          {isSmall ? (
            <IconButton
              className={s.addToCartButtonRow}
              onClick={() => addProductToCart(product.id)}
            >
              <ShoppingCart className={s.cartIcon} />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              className={s.addToCartButtonRow}
              onClick={() => addProductToCart(product.id)}
            >
              В корзину
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default FavoriteCard
