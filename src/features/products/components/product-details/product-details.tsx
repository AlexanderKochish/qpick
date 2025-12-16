'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Rating,
  IconButton,
} from '@mui/material'
import {
  ArrowBack,
  LocalShipping,
  AssignmentReturn,
  Security,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import s from './product-details.module.css'
import Image from 'next/image'

import { ProductWithRelations } from '@/features/products/types/types'
import ProductDetailsTabs from '../product-details-tabs/product-details-tabs'
import ProductDescription from '../product-description/product-description'
import ProductSpecifications from '../product-specifications/product-specifications'
import ProductReview from '../product-review/product-review'
import CreateReviewModal from '@/features/reviews/components/create-review-modal/create-review-modal'
import ActionsButtons from '../actions-buttons/actions-buttons'
import BreadcrumbNav from '@/widgets/breadcrumbs-nav/breadcrumbs-nav'
import { calculateAverageRating } from '@/shared/utils/rating'
import { calculateFinalPrice, formatPrice } from '@/shared/utils/price'

interface Props {
  product: ProductWithRelations | null
}
const ProductDetails = ({ product }: Props) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!product) return null

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
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            {
              label: product.category.name,
              href: `/category/${product.category.name}/${product.categoryId}`,
            },
            { label: product.name },
          ]}
        />
      </Container>
      <Container maxWidth="xl" className={s.content}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className={s.imageSection}>
              <Box
                className={s.mainImage}
                onClick={() =>
                  window.open(
                    product.images[selectedImage]?.url ??
                      '/api/placeholder/200/350',
                    '_blank'
                  )
                }
              >
                <Image
                  src={
                    product.images[selectedImage]?.url ??
                    '/api/placeholder/200/350'
                  }
                  alt={product.name}
                  className={s.image}
                  width={200}
                  height={350}
                />
                {product.discount && product.discount > 0 ? (
                  <Chip
                    label={`-${product.discount}%`}
                    color="error"
                    className={s.discountBadge}
                  />
                ) : null}
              </Box>

              <Box className={s.thumbnails}>
                {product.images.map((image, index) => (
                  <Box
                    key={image.id}
                    className={`${s.thumbnail} ${selectedImage === index ? s.thumbnailActive : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.url ?? '/api/placeholder/50/50'}
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
                  {averageRating.toFixed(1)} ({product._count?.ratings} ratings)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {product._count?.reviews} reviews
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
                        label={`Saving ${formatPrice(savings)} €`}
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

              {product.id && <ActionsButtons productId={product.id} />}

              <Box className={s.features}>
                <Box className={s.feature}>
                  <LocalShipping className={s.featureIcon} />
                  <Box>
                    <Typography variant="subtitle2">Free shipping</Typography>
                    <Typography variant="body2" color="text.secondary">
                      For Kyiv within 1-2 days
                    </Typography>
                  </Box>
                </Box>
                <Box className={s.feature}>
                  <AssignmentReturn className={s.featureIcon} />
                  <Box>
                    <Typography variant="subtitle2">Return 14 days</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Easy product return
                    </Typography>
                  </Box>
                </Box>
                <Box className={s.feature}>
                  <Security className={s.featureIcon} />
                  <Box>
                    <Typography variant="subtitle2">1 year warranty</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Official warranty
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
                  Frequently asked questions
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  The questions and answers section is under development...
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
