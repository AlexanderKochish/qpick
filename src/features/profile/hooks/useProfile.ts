import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../actions/actions'

export const useProfile = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  return {
    data,
    ...rest,
  }
}
