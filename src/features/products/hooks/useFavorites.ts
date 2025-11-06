import { toggleFavorite } from '@/features/favorites/actions/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

  return {
    mutate,
    isPending,
  }
}
