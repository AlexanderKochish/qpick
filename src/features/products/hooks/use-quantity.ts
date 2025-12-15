import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  updateCartItemQuantity,
  removeCartItem,
} from '@/features/cart/actions/actions'
import { Cart } from '@/features/cart/types/types'

interface Props {
  initialQuantity: number
  productId: string
}

export function useQuantity({ initialQuantity, productId }: Props) {
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(initialQuantity)
  const debouncedQty = useDebounce(quantity, 400)

  const mutation = useMutation({
    mutationFn: ({ quantity }: { quantity: number }) =>
      quantity === 0
        ? removeCartItem(productId)
        : updateCartItemQuantity(productId, quantity),

    onMutate: async ({ quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const prevCart = queryClient.getQueryData<Cart>(['cart'])

      queryClient.setQueryData<Cart>(['cart'], (old) => {
        if (!old) return old

        const items =
          quantity === 0
            ? old.items.filter((i) => i.productId !== productId)
            : old.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
              )

        return { ...old, items }
      })

      return { prevCart }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevCart) {
        queryClient.setQueryData(['cart'], ctx.prevCart)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['counters'] })
    },
  })

  useEffect(() => {
    if (quantity > 0 && quantity !== initialQuantity) {
      mutation.mutate({ quantity })
    }
  }, [debouncedQty])

  const handleDecrease = useCallback(() => {
    setQuantity((q) => Math.max(1, q - 1))
  }, [])

  const handleIncrease = useCallback(() => {
    setQuantity((q) => q + 1)
  }, [])

  const handleRemove = () => {
    mutation.mutate({ quantity: 0 })
  }

  return {
    quantity,
    handleDecrease,
    handleIncrease,
    handleRemove,
    isPending: mutation.isPending,
  }
}
