'use client'
import s from './home-client.module.css'
import { Box, Container, Fab } from '@mui/material'
import FilterPanel from '@/widgets/filter-panel/filter-panel'
import ProductsList from '@/features/products/components/products-list/products-list'
import { Sort } from '@mui/icons-material'
import { useProducts } from '@/features/products/hooks/use-products'
import { ProductCard } from '@/features/products/types/types'
import { useSort } from '@/shared/hooks/use-sort'
import { SortBy } from '@/shared/types/types'
import { usePagination } from '@/shared/hooks/use-pagination'
import SitePagination from '@/shared/components/site-pagination/site-pagination'
import Banner from '../banner/banner'

interface Props {
  initialData: ProductCard[]
  search?: string
  sort?: SortBy
}

const HomeClient = ({ initialData, search, sort }: Props) => {
  const { setSortBy, sortBy } = useSort()
  const { data: products } = useProducts(sort, initialData, search)
  const { currentPage, setCurrentPage, currentProducts, totalPages } =
    usePagination({ items: products || [] })

  if (products?.length === 0) {
    return <p>Products not found.Try again letter</p>
  }

  return (
    <Box className={s.container}>
      {!search && !sort && <Banner />}

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
