import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../actions/actions'
import { ProductCard } from '../types/types'

export const useProducts = (
  sortBy?: string,
  initialData?: ProductCard[],
  search?: string
) => {
  const { data, ...rest } = useQuery({
    queryKey: ['products', sortBy, search],
    queryFn: () => getAllProducts(sortBy, search),
    initialData: initialData,
  })

  return {
    data,
    ...rest,
  }
}
