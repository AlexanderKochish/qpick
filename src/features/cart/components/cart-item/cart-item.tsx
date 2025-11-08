'use client'
import { useEffect, useState } from 'react'
import s from './cart-item.module.css'
import { IProductCard } from '@/features/products/types/types'
import BaseCard from '@/shared/components/base-card/base-card'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { useCart } from '../../hooks/useCart'
import { useDebounce } from '@/shared/hooks/useDebounce'

interface Props extends IProductCard {
  quantity: number
}

const CartItem = ({ item, quantity }: Props) => {
  const [qtity, setQtity] = useState(quantity)
  const { updateQuantity } = useCart()
  const debounceValue = useDebounce(qtity)

  useEffect(() => {
    const handleUpdateQuantity = async (itemId: string, value: number) => {
      try {
        await updateQuantity({
          itemId: itemId,
          quantity: Number(value),
        })
      } catch (error) {
        setQtity(quantity)
        console.error('Failed to update quantity:', error)
      }
    }

    if (debounceValue !== quantity) {
      handleUpdateQuantity(item.id, +debounceValue)
    }
  }, [debounceValue, item.id, quantity])

  const handleDecrease = () => {
    setQtity((prev) => Math.max(1, prev - 1))
  }

  const handleIncrease = () => {
    setQtity((prev) => prev + 1)
  }

  const handleRemove = async () => {
    try {
      await updateQuantity({
        itemId: item.id,
        quantity: 0,
      })
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  return (
    <BaseCard>
      <div className={s.trash}>
        <IconButton className={s.trashBtn} onClick={handleRemove}>
          <Trash2 />
        </IconButton>
      </div>
      <div className={s.cardInfo}>
        <Image
          src={item.images[0].url}
          alt="Product card"
          width={145}
          height={135}
        />
        <div className={s.info}>
          <h4>{item.name}</h4>
          <span className={s.price}>{item.price.toString()} $</span>
        </div>
      </div>
      <div>
        <div className={s.quantity}>
          <IconButton onClick={handleDecrease} className={s.quantityBtn}>
            <Minus color="#fff" />
          </IconButton>
          <span>{qtity}</span>
          <IconButton onClick={handleIncrease} className={s.quantityBtn}>
            <Plus color="#fff" />
          </IconButton>
        </div>
      </div>
    </BaseCard>
  )
}

export default CartItem
