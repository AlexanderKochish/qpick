'use client'

import { useFavorites } from '../../hooks/useFavorites'
import { IconButton } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import s from './favorite-toggle.module.css'

interface Props {
  productId: string
}

const FavoriteToggle = ({ productId }: Props) => {
  const { mutate, isPending, isFavorite } = useFavorites()

  return (
    <IconButton
      disabled={isPending}
      className={s.actionButton}
      onClick={() => mutate(productId)}
    >
      {isFavorite?.includes(productId) ? (
        <Favorite color="error" />
      ) : (
        <FavoriteBorder />
      )}
    </IconButton>
  )
}

export default FavoriteToggle
