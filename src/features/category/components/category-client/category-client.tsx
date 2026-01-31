'use client'
export const dynamic = 'force-dynamic'
import ProductsList from '@/features/products/components/products-list/products-list'
import { useProductsByCategory } from '@/features/products/hooks/use-products-by-category'
import { ProductCard } from '@/features/products/types/types'
import SitePagination from '@/shared/components/site-pagination/site-pagination'
import { usePagination } from '@/shared/hooks/use-pagination'
import BreadcrumbNav from '@/widgets/breadcrumbs-nav/breadcrumbs-nav'
import { Box, Container } from '@mui/material'

interface Props {
  slug: string
  productsInit: ProductCard[]
  id: string
}

const CategoryClient = ({ slug, productsInit, id }: Props) => {
  const { data: products } = useProductsByCategory(productsInit, id)
  const { currentPage, totalPages, setCurrentPage, currentProducts } =
    usePagination({
      items: products || [],
    })
  return (
    <Box sx={{ p: 1 }}>
      <Container maxWidth="xl">
        <BreadcrumbNav
          items={[
            { label: 'Главная', href: '/' },
            {
              label: slug,
              href: `/category/${slug}`,
            },
          ]}
        />
      </Container>
      <ProductsList products={currentProducts} />
      <SitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  )
}

export default CategoryClient
