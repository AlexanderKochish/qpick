import {
  isProductInFavorites,
  toggleFavorite,
} from '@/features/favorites/actions/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useFavorites = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['favorite'],
    mutationFn: (id: string) => toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
      queryClient.invalidateQueries({ queryKey: ['counters'] })
    },
  })

  const { data } = useQuery({
    queryKey: ['favorite'],
    queryFn: isProductInFavorites,
  })

  const isFavorite = data && data[0]?.items.map((item) => item.productId)

  return {
    isFavorite,
    mutate,
    isPending,
  }
}
