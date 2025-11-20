import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../actions/actions'
import { ProductCard } from '../types/types'

export const useProducts = (sortBy?: string, initialData?: ProductCard[]) => {
  const { data, ...rest } = useQuery({
    queryKey: ['products', sortBy],
    queryFn: () => getAllProducts(sortBy),
    initialData: initialData,
  })

  return {
    data,
    ...rest,
  }
}
