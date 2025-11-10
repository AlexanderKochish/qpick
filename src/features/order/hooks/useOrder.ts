import { useQuery } from '@tanstack/react-query'
import { getOrderTotalPrice } from '../actions/actions'

export const useOrder = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['order-amount'],
    queryFn: () => getOrderTotalPrice(id),
    enabled: !!id,
  })

  return {
    data,
    ...rest,
  }
}
