import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../actions/actions'

export const useProducts = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  return {
    data,
    ...rest,
  }
}
