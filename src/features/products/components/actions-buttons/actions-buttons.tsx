'use client'
import s from './actions-buttons.module.css'
import { Button } from '@mui/material'
import { addToFavorite } from '@/features/favorites/actions/actions'

interface Props {
  productId?: string
  userId?: string
}

const ActionsButtons = ({ productId, userId }: Props) => {
  return (
    <div className={s.actions}>
      <Button variant="contained">Buy</Button>
      {userId && productId && (
        <Button
          onClick={() => addToFavorite(productId!, userId)}
          variant="contained"
        >
          Add into cart
        </Button>
      )}
    </div>
  )
}

export default ActionsButtons
