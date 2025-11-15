'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Fab,
  Pagination,
} from '@mui/material'
import { Sort } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import FilterPanel from '@/widgets/filter-panel/filter-panel'
import ProductsList from '@/features/products/components/products-list/products-list'
import { useProducts } from '@/features/products/hooks/useProducts'

export default function HomePage() {
  const router = useRouter()
  // const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const { data: products } = useProducts()
  // const [loading, setLoading] = useState(false)
  // const itemsPerPage = 12

  // const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  // const startIndex = (currentPage - 1) * itemsPerPage
  // const currentProducts = sortedProducts.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // )

  return (
    <Box className={styles.container}>
      <Box className={styles.hero}>
        <Container maxWidth="lg">
          <Box className={styles.heroContent}>
            <Typography variant="h2" className={styles.heroTitle}>
              Новейшие гаджеты
            </Typography>
            <Typography variant="h5" className={styles.heroSubtitle}>
              Откройте для себя мир технологий с лучшими устройствами
            </Typography>
            <Button
              variant="contained"
              size="large"
              className={styles.heroButton}
              onClick={() => router.push('/products')}
            >
              Смотреть все товары
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" className={styles.mainContent}>
        <FilterPanel
          itemsLength={products?.length}
          sortBy={sortBy}
          setSortBy={() => setSortBy}
        />

        <ProductsList products={products} />

        {/* {totalPages > 1 && (
          <Box className={styles.pagination}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              size="large"
            />
          </Box>
        )} */}
      </Container>

      <Fab
        color="primary"
        className={styles.floatingButton}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Sort />
      </Fab>
    </Box>
  )
}
