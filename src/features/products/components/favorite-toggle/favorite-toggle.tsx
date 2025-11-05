'use client'

import { Heart } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleFavorite } from '@/features/favorites/actions/actions'

interface Props {
  isFavorite?: boolean
  productId: string
}

const FavoriteToggle = ({ isFavorite, productId }: Props) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['favorite'],
    mutationFn: (id: string) => toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] })
    },
  })

  return (
    <div onClick={() => mutate(productId)}>
      {isFavorite ? (
        <Heart fill="currentColor" strokeWidth={1.5} />
      ) : (
        <Heart color="#1C1C27" />
      )}
    </div>
  )
}

export default FavoriteToggle
