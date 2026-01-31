import ProductDetails from '@/features/products/components/product-details/product-details'
import { getProductById } from '@/features/products/actions/actions'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  return <ProductDetails product={product} />
}
