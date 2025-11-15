import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '../actions/actions'

export const useCategory = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['category'],
    queryFn: getAllCategories,
  })

  return {
    data,
    ...rest,
  }
}
