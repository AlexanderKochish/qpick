import s from './card.module.css'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import { CompareArrows, ShoppingCart } from '@mui/icons-material'
import Link from 'next/link'
import { addToCart } from '@/features/cart/actions/actions'
import { ProductCard as PropductType } from '../../types/types'
import { Rating as RatingType } from '@/features/profile/types/types'
import FavoriteToggle from '../favorite-toggle/favorite-toggle'
import ShareButton from '@/shared/components/share-button/share-button'
import { calculateAverageRating } from '@/shared/utils/rating'
import { formatPrice } from '@/shared/utils/price'
interface Props {
  product: PropductType
  finalPrice?: number
}

const ProductCard = ({ product, finalPrice }: Props) => {
  return (
    <Card className={s.productCard} key={product.id}>
      {product.discount && product.discount > 0 ? (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          size="small"
          className={s.discountBadge}
        />
      ) : null}
      <Box className={s.cardActions}>
        <FavoriteToggle productId={product.id} />
        <IconButton className={s.actionButton}>
          <CompareArrows />
        </IconButton>
        <ShareButton className="secondary" link={`/product/${product.id}`} />
      </Box>
      <Box className={s.imageBlock}>
        <Link href={`/product/${product.id}`}>
          <CardMedia
            component="img"
            width={150}
            height={200}
            image={product.images[0]?.url ?? '/api/placeholder/400/400'}
            alt={product.name}
            className={s.productImage}
          />
        </Link>
      </Box>
      <CardContent className={s.cardContent}>
        <Chip
          label={product.category.name}
          size="small"
          variant="outlined"
          className={s.categoryChip}
        />

        <Link href={`/product/${product.id}`}>
          <Typography variant="h6" className={s.productName}>
            {product.name}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          className={s.productDescription}
        >
          {product.description}
        </Typography>

        <Box className={s.ratingSection}>
          <Rating
            value={calculateAverageRating(product?.ratings as RatingType[])}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            ({product._count?.ratings || 0})
          </Typography>
        </Box>

        <Box className={s.priceSection}>
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
  )
}

export default ProductCard
