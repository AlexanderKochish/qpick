import { Cart, CartItem } from '../types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addToCart,
  getCartTotalPrice,
  getOrCreateCart,
  updateCartItemQuantity,
} from '../actions/actions'
import { useMemo, useState } from 'react'
import { useToast } from '@/shared/hooks/use-toast'

interface Props {
  initialData?: {
    initialCartData: Cart
    cartTotalPrice: number
  }
}

export const useCart = (props?: Props) => {
  const [appliedPromo, setAppliedPromo] = useState('')
  const toast = useToast()
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

  const { mutate: addProductToCart, isPending: isPendingAddProduct } =
    useMutation({
      mutationKey: ['cart'],
      mutationFn: (productId: string) => addToCart(productId),

      onMutate: async (productId) => {
        await queryClient.cancelQueries({ queryKey: ['cart'] })

        const prevCart = queryClient.getQueryData<Cart>(['cart'])

        queryClient.setQueryData<Cart>(['cart'], (old) => {
          if (!old) return old

          const existing = old.items.find(
            (item) => item.productId === productId
          )

          let newItems: CartItem[]

          if (existing) {
            newItems = old.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ) as CartItem[]
          } else {
            newItems = [
              ...old.items,
              {
                id: `optimistic-${productId}`,
                productId,
                quantity: 1,
                product: {},
                cartId: old.id,
              },
            ] as CartItem[]
            toast.success('Product added to cart')
          }

          return {
            ...old,
            items: newItems,
          }
        })

        return { prevCart }
      },

      onError: (_err, _productId, context) => {
        if (context?.prevCart) {
          queryClient.setQueryData(['cart'], context.prevCart)
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      },
    })

  const cartCount = useMemo(() => {
    return data?.items.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0
  }, [data?.items])

  const discount = data?.items.reduce(
    (acc, curr) => acc + Number(curr.product.discount),
    0
  )

  const totalDiscount = data?.items.reduce(
    (sum, item) =>
      sum +
      ((Number(item.product.price) * Number(item.product.discount)) / 100) *
        item.quantity,
    0
  )
  const promoDiscount = appliedPromo ? totalPrice! * 0.1 : 0
  const total = totalPrice! - totalDiscount! - promoDiscount

  return {
    data,
    discount,
    updateQuantity,
    isPendingUpdateQuantity,
    total,
    promoDiscount,
    totalPrice,
    totalDiscount,
    appliedPromo,
    setAppliedPromo,
    addProductToCart,
    isPendingAddProduct,
    cartCount,
    ...rest,
  }
}
