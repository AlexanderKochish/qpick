import { getProductsByCategory } from '@/features/products/actions/actions'
import ProductsList from '@/features/products/components/products-list/products-list'
import { Box } from '@mui/material'

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
    <Box sx={{ pt: 3 }}>
      <h1>{slug}</h1>
      <ProductsList products={products} />
    </Box>
  )
}

export default CategoryPage
