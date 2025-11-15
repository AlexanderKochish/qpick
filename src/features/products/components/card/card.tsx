import s from './card.module.css'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import {
  CompareArrows,
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
} from '@mui/icons-material'
import { useFavorites } from '../../hooks/useFavorites'
import { useCart } from '@/features/cart/hooks/useCart'
import { ProductCard as ProductCardType } from '../../types/types'
import Link from 'next/link'
import { addToCart } from '@/features/cart/actions/actions'

interface Props {
  product: ProductCardType
  finalPrice: number
  averageRating: number
}

const ProductCard = ({ product, finalPrice }: Props) => {
  // const isFavorite = use(isProductInFavorites())?.items.flatMap((favorite) =>
  //   Object.values(favorite)
  // )
  const { mutate } = useFavorites()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EN').format(price)
  }
  const isFavorite = true
  return (
    <Grid size={3} key={product.id}>
      <Card className={s.productCard}>
        {product.discount && product.discount > 0 && (
          <Chip
            label={`-${product.discount}%`}
            color="error"
            size="small"
            className={s.discountBadge}
          />
        )}
        <Box className={s.cardActions}>
          <IconButton
            className={s.actionButton}
            onClick={() => mutate(product.id)}
          >
            {isFavorite ? (
              <Favorite className={s.favoriteActive} />
            ) : (
              <FavoriteBorder className={s.favorite} />
            )}
          </IconButton>
          <IconButton className={s.actionButton}>
            <CompareArrows />
          </IconButton>
          <IconButton className={s.actionButton}>
            <Share />
          </IconButton>
        </Box>
        <Link href={`/product/${product.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={product.images[0].url || '/api/placeholder/400/400'}
            alt={product.name}
            className={s.productImage}
          />
        </Link>
        <CardContent className={s.cardContent}>
          <Chip
            label={product.category.name}
            size="small"
            variant="outlined"
            className={s.categoryChip}
          />

          <Typography
            variant="h6"
            className={s.productName}
            // onClick={() => handleProductClick(product.id)}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className={s.productDescription}
          >
            {product.description}
          </Typography>

          <Box className={s.ratingSection}>
            <Rating value={4} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              ({product._count?.ratings || 0})
            </Typography>
          </Box>

          <Box className={s.priceSection}>
            {product.discount && Number(product.discount) > 0 ? (
              <>
                <Typography variant="h6" className={s.finalPrice}>
                  {formatPrice(finalPrice)} ₽
                </Typography>
                <Typography variant="body2" className={s.originalPrice}>
                  {formatPrice(Number(product.price))} ₽
                </Typography>
              </>
            ) : (
              <Typography variant="h6" className={s.finalPrice}>
                {formatPrice(Number(product.price))} ₽
              </Typography>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            className={s.addToCartButton}
            onClick={() => addToCart(product.id)}
          >
            В корзину
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProductCard
