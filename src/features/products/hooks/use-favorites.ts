import {
  isProductInFavorites,
  toggleFavorite,
} from '@/features/favorites/actions/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useFavorites = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['favorite'],
    queryFn: isProductInFavorites,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => toggleFavorite(id),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['favorite'] })

      const prevFavorite = queryClient.getQueryData<string[]>(['favorite'])

      queryClient.setQueryData<string[]>(['favorite'], (old = []) =>
        old.includes(productId)
          ? old.filter((id) => id !== productId)
          : [...old, productId]
      )

      return { prevFavorite }
    },

    onError: (_err, _id, context) => {
      if (context?.prevFavorite) {
        queryClient.setQueryData(['favorite'], context.prevFavorite)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counters'] })
    },
  })

  return {
    isFavorite: data,
    mutate,
    isPending,
  }
}
