export const dynamic = 'force-dynamic'
import HomeClient from '@/features/home/components/home-client/home-client'
import { getAllProducts } from '@/features/products/actions/actions'
import { SortBy } from '@/shared/types/types'

interface Props {
  searchParams: Promise<{
    search?: string
    sort?: SortBy
  }>
}

export default async function HomePage({ searchParams }: Props) {
  const { search, sort } = await searchParams

  const products = await getAllProducts(sort, search)

  return <HomeClient search={search} initialData={products} sort={sort} />
}
