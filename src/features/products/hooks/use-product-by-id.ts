import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../actions/actions'

export const useProductById = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })

  return {
    data,
    ...rest,
  }
}
