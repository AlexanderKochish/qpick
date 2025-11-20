import HomeClient from '@/features/home/components/home-client/home-client'
import { getAllProducts } from '@/features/products/actions/actions'

export default async function HomePage() {
  const products = await getAllProducts()

  return <HomeClient initialData={products} />
}
