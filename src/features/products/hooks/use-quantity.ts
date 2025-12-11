import { removeCartItem } from '@/features/cart/actions/actions'
import { useCart } from '@/features/cart/hooks/useCart'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useState, useEffect, useCallback } from 'react'

interface Props {
  initialQuantity: number
  productId: string
}

export function useQuantity({ initialQuantity, productId }: Props) {
  const [qtity, setQtity] = useState(initialQuantity)
  const { updateQuantity } = useCart()

  const debouncedQty = useDebounce(qtity, 400)

  useEffect(() => {
    updateQuantity({
      itemId: productId,
      quantity: +debouncedQty,
    })
  }, [debouncedQty, productId, updateQuantity])

  const handleDecrease = useCallback(() => {
    setQtity((prev) => Math.max(1, prev - 1))
  }, [])

  const handleIncrease = useCallback(() => {
    setQtity((prev) => prev + 1)
  }, [])
  const handleRemove = () => {
    removeCartItem(productId)
    updateQuantity({
      itemId: productId,
      quantity: 0,
    })
  }

  return {
    qtity,
    handleDecrease,
    handleIncrease,
    handleRemove,
  }
}
