import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../actions/actions'

export const useUser = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  return {
    data,
    ...rest,
  }
}
