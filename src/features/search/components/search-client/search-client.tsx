'use client'
import ProductFeed from '@/features/products/components/product-feed/product-feed'
import { ProductCard } from '@/features/products/types/types'
import { SortBy } from '@/shared/types/types'
import { Container } from '@mui/material'
import React from 'react'

interface Props {
  products: ProductCard[]
  q?: string
  sort?: SortBy
}

const SearchClient = ({ products, q, sort }: Props) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <ProductFeed
        initialData={products}
        searchQuery={q}
        sort={sort}
        title={q ? `Search results: "${q}"` : 'All products'}
      />
    </Container>
  )
}

export default SearchClient
