import { getAllProducts } from '@/features/products/actions/actions'
import { SortBy } from '@/shared/types/types'
import SearchClient from '@/features/search/components/search-client/search-client'

interface Props {
  searchParams: Promise<{
    q?: string
    sort?: SortBy
  }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, sort } = await searchParams

  const products = await getAllProducts(sort, q)

  return <SearchClient products={products} q={q} sort={sort} />
}
