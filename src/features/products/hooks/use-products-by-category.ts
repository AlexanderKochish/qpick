import { useQuery } from '@tanstack/react-query'

import { getProductsByCategory } from '../actions/actions'
import { ProductCard } from '../types/types'

export const useProductsByCategory = (
  initialData: ProductCard[],
  id: string
) => {
  const { data, ...rest } = useQuery({
    queryKey: ['products-by-category', id],
    queryFn: () => getProductsByCategory(id),
    initialData: initialData,
  })

  return {
    data,
    ...rest,
  }
}
