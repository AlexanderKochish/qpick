'use client'
import React, { useState } from 'react'
import s from './home-client.module.css'
import {
  Box,
  Button,
  Container,
  Fab,
  Pagination,
  Typography,
} from '@mui/material'
import FilterPanel from '@/widgets/filter-panel/filter-panel'
import ProductsList from '@/features/products/components/products-list/products-list'
import Spinner from '@/shared/components/spinner/spinner'
import { Sort } from '@mui/icons-material'
import { useProducts } from '@/features/products/hooks/useProducts'
import { SortBy } from '@/shared/types/types'
import { ProductCard } from '@/features/products/types/types'
import { useRouter } from 'next/navigation'

interface Props {
  initialData: ProductCard[]
  search: string
}

const HomeClient = ({ initialData, search }: Props) => {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<SortBy>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const { data: products, isLoading } = useProducts(sortBy, initialData, search)

  const itemsPerPage = 12

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = products?.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = products?.length
    ? Math.ceil(products.length / itemsPerPage)
    : 0
  if (products?.length === 0) {
    return <p>Products not found.Try again letter</p>
  }

  return (
    <Box className={s.container}>
      <Box className={s.hero}>
        <Container maxWidth="lg">
          <Box className={s.heroContent}>
            <Typography variant="h2" className={s.heroTitle}>
              Новейшие гаджеты
            </Typography>
            <Typography variant="h5" className={s.heroSubtitle}>
              Откройте для себя мир технологий с лучшими устройствами
            </Typography>
            <Button
              variant="contained"
              size="large"
              className={s.heroButton}
              onClick={() => router.push('/products')}
            >
              Смотреть все товары
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" className={s.mainContent}>
        <FilterPanel
          itemsLength={products?.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {isLoading && <Spinner />}
        <ProductsList products={products} />

        {totalPages && totalPages > 1 && (
          <Box className={s.pagination}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>

      <Fab
        color="primary"
        className={s.floatingButton}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Sort />
      </Fab>
    </Box>
  )
}

export default HomeClient
