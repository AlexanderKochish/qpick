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
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['favorite'],
    mutationFn: (id: string) => toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counters'] })
    },
  })

  const { mutate: addToCartMutate } = useMutation({
    mutationKey: ['product-cart'],
    mutationFn: (id: string) => addToCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counters'] })
      queryClient.invalidateQueries({ queryKey: ['total-price'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
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
