import s from './card.module.css'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { ProductCard as PropductType } from '../../types/types'
import { Rating as RatingType } from '@/features/profile/types/types'
import { calculateAverageRating } from '@/shared/utils/rating'
import { formatPrice } from '@/shared/utils/price'
import { FavoriteCardType } from '@/features/favorites/types/types'

interface Props {
  product: PropductType | FavoriteCardType
  finalPrice?: number
}

const ProductCard = ({ product, finalPrice }: Props) => {
  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <Card className={s.productCard}>
        {product.discount && product.discount > 0 ? (
          <Chip
            label={`-${product.discount}%`}
            color="error"
            size="small"
            className={s.discountBadge}
          />
        ) : null}
        <Box className={s.cardActions}>
          {/* <FavoriteToggle productId={product.id} />
          <IconButton className={s.actionButton}>
            <CompareArrows />
          </IconButton>
          <ShareButton className="secondary" link={`/product/${product.id}`} /> */}
        </Box>
        <Box className={s.imageBlock}>
          <CardMedia
            component="img"
            width={150}
            height={200}
            image={product.images[0]?.url ?? '/api/placeholder/400/400'}
            alt={product.name}
            className={s.productImage}
          />
        </Box>
        <CardContent className={s.cardContent}>
          <Chip
            label={product.category.name}
            size="small"
            variant="outlined"
            className={s.categoryChip}
          />

          <Typography variant="h6" className={s.productName}>
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
            <Rating
              value={calculateAverageRating(('ratings' in product ? product.ratings : []) as RatingType[])}
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
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
