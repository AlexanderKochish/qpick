'use client'
import s from './home-client.module.css'
import { Box, Button, Container, Fab, Typography } from '@mui/material'
import FilterPanel from '@/widgets/filter-panel/filter-panel'
import ProductsList from '@/features/products/components/products-list/products-list'
import { Sort } from '@mui/icons-material'
import { useProducts } from '@/features/products/hooks/use-products'
import { ProductCard } from '@/features/products/types/types'
import { useRouter } from 'next/navigation'
import { useSort } from '@/shared/hooks/use-sort'
import { SortBy } from '@/shared/types/types'
import { usePagination } from '@/shared/hooks/use-pagination'
import SitePagination from '@/shared/components/site-pagination/site-pagination'

interface Props {
  initialData: ProductCard[]
  search?: string
  sort?: SortBy
}

const HomeClient = ({ initialData, search, sort }: Props) => {
  const router = useRouter()
  const { setSortBy, sortBy } = useSort()
  const { data: products } = useProducts(sort, initialData, search)
  const { currentPage, setCurrentPage, currentProducts, totalPages } =
    usePagination({ items: products || [] })

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
              onClick={() => router.push('/')}
            >
              Смотреть все товары
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" className={s.mainContent}>
        <FilterPanel
          itemsLength={products?.length}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        {/* {isLoading && <Spinner />} */}
        <ProductsList products={currentProducts} />

        <SitePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
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
