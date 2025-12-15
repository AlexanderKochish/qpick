'use client'
import { Box, Typography } from '@mui/material'
import s from './products-list.module.css'
import { ProductCard as ProductCardType } from '../../types/types'
import ProductCard from '../card/card'
import { calculateFinalPrice } from '@/shared/utils/price'
import { FavoriteCardType } from '@/features/favorites/types/types'

interface Props {
  products?: ProductCardType[] | FavoriteCardType[]
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

  return (
    <div className={s.productsGrid}>
      {products?.map((product) => {
        const finalPrice = calculateFinalPrice(
          Number(product.price),
          Number(product.discount)
        )

        return (
          <ProductCard
            key={product.id}
            finalPrice={finalPrice}
            product={product}
          />
        )
      })}
    </div>
  )
}

export default ProductsList
