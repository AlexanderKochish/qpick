'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Rating,
  Divider,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Breadcrumbs,
  Link,
  AppBar,
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
  Comment,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import s from './product-details.module.css'
import Image from 'next/image'
import { Rating as RatingType } from '@/generated/prisma/client'
import { ProductWithRelations } from '@/features/products/types/types'

interface Props {
  product: ProductWithRelations | null
}
const ProductDetails = ({ product }: Props) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [quantity, setQuantity] = useState(1)

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
          <Link href="/product" className={s.breadcrumbLink}>
            {product.category.name}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="xl" className={s.content}>
        <Grid container spacing={4}>
          <Grid size={6}>
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

          <Grid size={6}>
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

        {/* Детальная информация */}
        <Box className={s.detailsSection}>
          <AppBar position="static" className={s.tabsAppBar}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              className={s.tabs}
            >
              <Tab label="Описание" />
              <Tab label="Характеристики" />
              <Tab label="Отзывы и оценки" />
              <Tab label="Вопросы и ответы" />
            </Tabs>
          </AppBar>

          <Box className={s.tabContent}>
            {activeTab === 0 && (
              <Box className={s.description}>
                <Typography variant="h6" gutterBottom>
                  Описание товара
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body1">
                  iPhone 15 Pro Max представляет собой вершину технологий Apple.
                  С титановым корпусом, который одновременно прочный и легкий,
                  этот смартфон устанавливает новые стандарты в индустрии.
                </Typography>
              </Box>
            )}

            {activeTab === 1 && (
              <Box className={s.specifications}>
                <Typography variant="h6" gutterBottom>
                  Технические характеристики
                </Typography>
                {/* <Grid container spacing={2}>
                  {product.specifications.map((spec, index) => (
                    <Grid size={4} key={index}>
                      <Box className={s.specItem}>
                        <Typography variant="body2" color="text.secondary">
                          {spec.name}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {spec.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid> */}
              </Box>
            )}

            {activeTab === 2 && (
              <Box className={s.reviews}>
                <Box className={s.reviewsHeader}>
                  <Box className={s.ratingSummary}>
                    <Typography variant="h4" className={s.averageRating}>
                      {averageRating.toFixed(1)}
                    </Typography>
                    <Rating value={averageRating} readOnly size="large" />
                    <Typography variant="body2" color="text.secondary">
                      На основе {product.ratings.length} оценок
                    </Typography>
                  </Box>
                  <Button variant="outlined" startIcon={<Comment />}>
                    Написать отзыв
                  </Button>
                </Box>

                <Divider />

                <Box className={s.reviewsList}>
                  {product.ratings.map((rating) => (
                    <Card key={rating.id} className={s.reviewCard}>
                      <CardContent>
                        <Box className={s.reviewHeader}>
                          <Box className={s.reviewAuthor}>
                            {rating.author.avatar && (
                              <Avatar
                                src={rating.author?.avatar.url}
                                className={s.avatar}
                              >
                                {rating.author.name?.charAt(0)}
                              </Avatar>
                            )}
                            <Box>
                              <Typography variant="subtitle2">
                                {rating.author.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {rating.createdAt.toLocaleDateString('ru-RU')}
                              </Typography>
                            </Box>
                          </Box>
                          <Rating
                            value={Number(rating.rating)}
                            readOnly
                            size="small"
                          />
                        </Box>
                        {rating.rating && (
                          <Typography
                            variant="body1"
                            className={s.reviewComment}
                          >
                            {rating.rating}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
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

      {/* Плавающая кнопка назад */}
      <IconButton className={s.backButton} onClick={() => router.back()}>
        <ArrowBack />
      </IconButton>
    </Box>
  )
}

export default ProductDetails
