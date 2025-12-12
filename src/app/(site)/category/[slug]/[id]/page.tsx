import CategoryClient from '@/features/category/components/category-client/category-client'
import { getProductsByCategory } from '@/features/products/actions/actions'

interface Props {
  params: Promise<{
    slug: string
    id: string
  }>
}

const CategoryPage = async ({ params }: Props) => {
  const { slug, id } = await params
  const products = await getProductsByCategory(id)
  return <CategoryClient slug={slug} productsInit={products} id={id} />
}

export default CategoryPage
