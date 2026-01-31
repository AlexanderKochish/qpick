'use client'
import { confirmPayment } from '@/features/payment/actions/actions'
import BaseCard from '@/shared/components/base-card/base-card'

import React, { useEffect } from 'react'
import s from './order-success.module.css'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  id: string
}

const OrderSuccess = ({ id }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)

    const handleBackButton = (e: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href)
      router.replace('/')
    }

    window.addEventListener('popstate', handleBackButton)

    const confirmDevPayment = async () => {
      try {
        await confirmPayment(id)
        console.log('Payment manually confirmed')
      } catch (error) {
        console.log('Manual confirmation failed (maybe already confirmed)')
      }
    }

    confirmDevPayment()

    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [id, router])

  useEffect(() => {
    queryClient.setQueryData(['cart'], null)
    queryClient.setQueryData(['total-price'], 0)
    queryClient.setQueryData(['counters'], 0)

    queryClient.invalidateQueries({ queryKey: ['cart'] })
    queryClient.invalidateQueries({ queryKey: ['total-price'] })
  }, [queryClient])

  return (
    <div className={s.successSection}>
      <BaseCard>
        <div className={s.content}>
          <h1 className={s.title}>Payment Successful!</h1>
          <p>
            Your order id is <strong>№ {id}</strong>, our manager will contact
            you.
          </p>
        </div>
      </BaseCard>
    </div>
  )
}

export default OrderSuccess
