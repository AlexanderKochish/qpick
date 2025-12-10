import { getProductsByCategory } from '@/features/products/actions/actions'
import ProductsList from '@/features/products/components/products-list/products-list'
import BreadcrumbNav from '@/widgets/breadcrumbs-nav/breadcrumbs-nav'
import { Box, Container } from '@mui/material'

interface Props {
  params: Promise<{
    slug: string
    id: string
  }>
}

const CategoryPage = async ({ params }: Props) => {
  const { slug, id } = await params
  const products = await getProductsByCategory(id)
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
      <ProductsList products={products} />
    </Box>
  )
}

export default CategoryPage
