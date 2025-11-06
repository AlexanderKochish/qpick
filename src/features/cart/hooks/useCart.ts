import { ICart } from '../types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getCartTotalPrice,
  getOrCreateCart,
  updateCartItemQuantity,
} from '../actions/actions'

interface Props {
  initialData?: {
    initialCartData: ICart
    cartTotalPrice: number
  }
}

export const useCart = (props?: Props) => {
  const queryClient = useQueryClient()
  const { data, ...rest } = useQuery({
    queryKey: ['cart'],
    queryFn: getOrCreateCart,
    initialData: props?.initialData?.initialCartData,
  })

  const { data: totalPrice } = useQuery({
    queryKey: ['total-price'],
    queryFn: getCartTotalPrice,
    initialData: props?.initialData?.cartTotalPrice,
  })

  const { mutate: updateQuantity, isPending: isPendingUpdateQuantity } =
    useMutation({
      mutationKey: ['update-cart-item'],
      mutationFn: (data: { itemId: string; quantity: number }) =>
        updateCartItemQuantity(data.itemId, data.quantity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        queryClient.invalidateQueries({ queryKey: ['total-price'] })
        queryClient.invalidateQueries({ queryKey: ['counters'] })
      },
    })

  return {
    data,
    updateQuantity,
    totalPrice,
    isPendingUpdateQuantity,
    ...rest,
  }
}
