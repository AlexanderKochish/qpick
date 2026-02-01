export const dynamic = 'force-dynamic'
import HomeClient from '@/features/home/components/home-client/home-client'
import { getAllProducts } from '@/features/products/actions/actions'
import { SortBy } from '@/shared/types/types'

interface Props {
  searchParams: Promise<{
    sort?: SortBy
  }>
}

export default async function HomePage({ searchParams }: Props) {
  const { sort } = await searchParams

  const products = await getAllProducts(sort)

  return <HomeClient initialData={products} sort={sort} />
}
