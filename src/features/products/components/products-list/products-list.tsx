'use client'
import { Box, Grid, Typography } from '@mui/material'
import s from './products-list.module.css'
import { ProductCard as ProductCardType } from '../../types/types'
import ProductCard from '../card/card'
import { Rating } from '@prisma/client'

interface Props {
  products: ProductCardType[] | undefined
}

const ProductsList = ({ products }: Props) => {
  if (products?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Typography>No Products yet</Typography>
      </Box>
    )
  }
  const calculateFinalPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price * (1 - discount / 100)
  }

  const calculateAverageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((acc, rating) => acc + Number(rating.rating), 0)
    return sum / ratings.length
  }

  return (
    <Grid container spacing={3} className={s.productsGrid}>
      {products?.map((product) => {
        const finalPrice = calculateFinalPrice(
          Number(product.price),
          Number(product.discount)
        )
        const averageRating = calculateAverageRating(product.ratings)

        return (
          <ProductCard
            key={product.id}
            finalPrice={finalPrice}
            averageRating={averageRating}
            product={product}
          />
        )
      })}
    </Grid>
  )
}

export default ProductsList
