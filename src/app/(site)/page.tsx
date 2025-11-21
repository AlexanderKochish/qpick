export const dynamic = 'force-dynamic'
import HomeClient from '@/features/home/components/home-client/home-client'
import { getAllProducts } from '@/features/products/actions/actions'

interface Props {
  searchParams: Promise<{ search?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const products = await getAllProducts('', (await searchParams).search)
  const search = (await searchParams).search ?? ''

  return <HomeClient initialData={products} search={search || ''} />
}
