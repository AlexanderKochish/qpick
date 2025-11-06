'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites'
import { IconButton } from '@mui/material'
interface Props {
  isFavorite?: boolean
  productId: string
}

const FavoriteToggle = ({ isFavorite, productId }: Props) => {
  const { mutate, isPending } = useFavorites()

  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
      }}
      disabled={isPending}
      onClick={() => mutate(productId)}
    >
      {isFavorite ? <Heart fill="black" /> : <Heart color="#1C1C27" />}
    </IconButton>
  )
}

export default FavoriteToggle
