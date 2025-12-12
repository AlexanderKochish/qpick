import { useQuery } from '@tanstack/react-query'
import { getProductModels } from '../actions/actions'

export const useProductModel = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['product-model'],
    queryFn: getProductModels,
  })

  return {
    data,
    ...rest,
  }
}
