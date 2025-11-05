'use client'
import React, { useState } from 'react'
import s from './cart-item.module.css'
import { IProductCard } from '@/features/products/types/types'
import BaseCard from '@/shared/components/base-card/base-card'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { IconButton } from '@mui/material'

interface Props extends IProductCard {
  quantity: number
}

const CartItem = ({ item, quantity }: Props) => {
  const [qtity, setQtity] = useState(quantity)
  return (
    <BaseCard>
      <div className={s.trash}>
        <IconButton className={s.trashBtn}>
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
          <span className={s.price}>{item.price} $</span>
        </div>
      </div>
      <div>
        <div className={s.quantity}>
          <IconButton
            onClick={() => setQtity((prev) => Math.max(quantity, prev - 1))}
            className={s.quantityBtn}
          >
            <Minus color="#fff" />
          </IconButton>
          <span>{qtity}</span>
          <IconButton
            onClick={() => setQtity((prev) => prev + 1)}
            className={s.quantityBtn}
          >
            <Plus color="#fff" />
          </IconButton>
        </div>
      </div>
    </BaseCard>
  )
}

export default CartItem
