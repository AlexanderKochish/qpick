'use client'
import { Box, Container } from '@mui/material'
import { ProductCard } from '@/features/products/types/types'
import { SortBy } from '@/shared/types/types'
import Banner from '../banner/banner'
import ProductFeed from '@/features/products/components/product-feed/product-feed'

interface Props {
  initialData: ProductCard[]
  sort?: SortBy
}

const HomeClient = ({ initialData, sort }: Props) => {
  return (
    <Box>
      {!sort && <Banner />}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <ProductFeed initialData={initialData} sort={sort} />
      </Container>
    </Box>
  )
}

export default HomeClient
