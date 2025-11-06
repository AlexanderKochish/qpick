'use client'
import s from './actions-buttons.module.css'
import { Button } from '@mui/material'
import { toggleFavorite } from '@/features/favorites/actions/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart } from '@/features/cart/actions/actions'

interface Props {
  productId?: string
}

const ActionsButtons = ({ productId }: Props) => {
  const quaryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['favorite'],
    mutationFn: (id: string) => toggleFavorite(id),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['counters'] })
    },
  })

  const { mutate: addToCartMutate } = useMutation({
    mutationKey: ['product-cart'],
    mutationFn: (id: string) => addToCart(id),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['counters'] })
      quaryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  return (
    <div className={s.actions}>
      <Button variant="contained" onClick={() => addToCartMutate(productId!)}>
        Buy
      </Button>
      {productId && (
        <Button onClick={() => mutate(productId!)} variant="contained">
          Add into cart
        </Button>
      )}
    </div>
  )
}

export default ActionsButtons
