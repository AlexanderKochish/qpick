// features/products/components/product-feed/product-feed.tsx
'use client'

import { Box, Typography } from '@mui/material'
import ProductsList from '../products-list/products-list'
import FilterPanel from '@/widgets/filter-panel/filter-panel'
import SitePagination from '@/shared/components/site-pagination/site-pagination'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useSort } from '@/shared/hooks/use-sort'
import { useProducts } from '@/features/products/hooks/use-products'
import { ProductCard } from '@/features/products/types/types'
import { SortBy } from '@/shared/types/types'

interface ProductFeedProps {
  initialData: ProductCard[]
  searchQuery?: string
  sort?: SortBy
  title?: string
}

const ProductFeed = ({
  initialData,
  searchQuery = '',
  sort,
  title,
}: ProductFeedProps) => {
  const { setSortBy, sortBy } = useSort()
  const { data: products } = useProducts(sort, initialData, searchQuery)
  const { currentPage, setCurrentPage, currentProducts, totalPages } =
    usePagination({ items: products || [] })

  if (!products || products.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Products not found. Try again later.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {title && (
        <Typography variant="h5" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}

      <FilterPanel
        itemsLength={products.length}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      <ProductsList products={currentProducts} />

      <SitePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </Box>
  )
}

export default ProductFeed
