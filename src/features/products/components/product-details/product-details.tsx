'use client'

import { useActionState, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Rating,
  IconButton,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Share,
  CompareArrows,
  ArrowBack,
  LocalShipping,
  AssignmentReturn,
  Security,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import s from './product-details.module.css'
import Image from 'next/image'
import { Rating as RatingType } from '@/generated/prisma/client'
import { ProductWithRelations } from '@/features/products/types/types'
import ProductDetailsTabs from '../product-details-tabs/product-details-tabs'
import ProductDescription from '../product-description/product-description'
import ProductSpecifications from '../product-specifications/product-specifications'
import ProductReview from '../product-review/product-review'
import { SendIcon } from 'lucide-react'
import CreateReviewModal from '@/features/reviews/components/create-review-modal/create-review-modal'

interface Props {
  product: ProductWithRelations | null
}
const ProductDetails = ({ product }: Props) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!product) return null
  const calculateAverageRating = (ratings: RatingType[]) => {
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((acc, rating) => acc + Number(rating.rating), 0)
    return sum / ratings.length
  }

  const calculateFinalPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price * (1 - discount / 100)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EN').format(price)
  }

  const addToCart = () => {
    console.log('Added to cart:', product, 'Quantity:', quantity)
  }

  const buyNow = () => {
    addToCart()
    router.push('/cart')
  }

  const handleAddReview = () => {
    console.log('review')
  }

  const averageRating = calculateAverageRating(product.ratings)
  const finalPrice = calculateFinalPrice(
    Number(product.price),
    Number(product.discount)
  )
  const savings = Number(product.discount)
    ? Number(product.price) - finalPrice
    : 0

  return (
    <Box className={s.container}>
      <Container maxWidth="xl">
        <Breadcrumbs className={s.breadcrumbs}>
          <Link href="/" className={s.breadcrumbLink}>
            Главная
          </Link>
          <Link
            href={`/category/${product.category.name}/${product.categoryId}`}
            className={s.breadcrumbLink}
          >
            {product.category.name}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="xl" className={s.content}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className={s.imageSection}>
              <Box
                className={s.mainImage}
                onClick={() =>
                  window.open(product.images[selectedImage].url, '_blank')
                }
              >
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  className={s.image}
                  width={200}
                  height={350}
                />
                {product.discount && product.discount > 0 && (
                  <Chip
                    label={`-${product.discount}%`}
                    color="error"
                    className={s.discountBadge}
                  />
                )}
              </Box>

              <Box className={s.thumbnails}>
                {product.images.map((image, index) => (
                  <Box
                    key={image.id}
                    className={`${s.thumbnail} ${selectedImage === index ? s.thumbnailActive : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className={s.thumbnailImage}
                      width={50}
                      height={50}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className={s.infoSection}>
              <Typography variant="h4" className={s.productName}>
                {product.name}
              </Typography>

              <Box className={s.ratingSection}>
                <Rating value={averageRating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {averageRating.toFixed(1)} ({product._count?.ratings} оценок)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {product._count?.reviews} отзывов
                </Typography>
              </Box>

              <Box className={s.metaInfo}>
                <Chip
                  label={product.brand.name}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={product.category.name}
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Box className={s.priceSection}>
                {product.discount && product.discount > 0 ? (
                  <>
                    <Typography variant="h3" className={s.finalPrice}>
                      {formatPrice(finalPrice)} €
                    </Typography>
                    <Box className={s.originalPriceSection}>
                      <Typography variant="h6" className={s.originalPrice}>
                        {formatPrice(Number(product.price))} €
                      </Typography>
                      <Chip
                        label={`Экономия ${formatPrice(savings)} €`}
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </>
                ) : (
                  <Typography variant="h3" className={s.finalPrice}>
                    {formatPrice(Number(product.price))} €
                  </Typography>
                )}
              </Box>

              <Box className={s.actionButtons}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  className={s.cartButton}
                  onClick={addToCart}
                >
                  В корзину
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className={s.buyButton}
                  onClick={buyNow}
                >
                  Купить сейчас
                </Button>
                <Grid container spacing={2}>
                  <IconButton
                    className={s.favoriteButton}
                    onClick={() => setFavorite(!favorite)}
                  >
                    {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton className={s.actionButton}>
                    <CompareArrows />
                  </IconButton>
                  <IconButton className={s.actionButton}>
                    <Share />
                  </IconButton>
                </Grid>
              </Box>

              <Box className={s.quantitySection}>
                <Typography variant="subtitle1">Количество:</Typography>
                <Box className={s.quantityControls}>
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography className={s.quantity}>{quantity}</Typography>
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </Box>
              </Box>

              <Box className={s.features}>
                <Box className={s.feature}>
                  <LocalShipping className={s.featureIcon} />
                  <Box>
                    <Typography variant="subtitle2">
                      Бесплатная доставка
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      По Москве за 1-2 дня
                    </Typography>
                  </Box>
                </Box>
                <Box className={s.feature}>
                  <AssignmentReturn className={s.featureIcon} />
                  <Box>
                    <Typography variant="subtitle2">Возврат 14 дней</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Легкий возврат товара
                    </Typography>
                  </Box>
                </Box>
                <Box className={s.feature}>
                  <Security className={s.featureIcon} />
                  <Box>
                    <Typography variant="subtitle2">Гарантия 1 год</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Официальная гарантия
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box className={s.detailsSection}>
          <ProductDetailsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <Box className={s.tabContent}>
            {activeTab === 0 && (
              <ProductDescription description={product.description} />
            )}

            {activeTab === 1 && <ProductSpecifications />}

            {activeTab === 2 && (
              <ProductReview
                averageRating={averageRating.toFixed(1)}
                product={product}
                setOpenDialog={setDialogOpen}
              />
            )}

            {activeTab === 3 && (
              <Box className={s.faq}>
                <Typography variant="h6" gutterBottom>
                  Часто задаваемые вопросы
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Раздел вопросов и ответов находится в разработке...
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <CreateReviewModal
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        ratingCount={product._count.ratings}
        productId={product.id}
      />
      <IconButton className={s.backButton} onClick={() => router.back()}>
        <ArrowBack />
      </IconButton>
    </Box>
  )
}

export default ProductDetails
