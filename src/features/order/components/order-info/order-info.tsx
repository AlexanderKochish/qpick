import React from 'react'
import s from './order-info.module.css'
import BaseCard from '@/shared/components/base-card/base-card'

const OrderInfo = () => {
  return (
    <BaseCard>
      <strong>Ваш заказ</strong>
      <div className={s.details}>
        <div>
          <span>1х Наушники Apple BYZ S852I</span>
          <span>₸ 2 927</span>
        </div>
        <div>
          <span>Доставка ₸ 2 927</span>
          <span>₸ 2 927</span>
        </div>
        <div>
          <span>К оплате</span>
          <span>₸ 2 927</span>
        </div>
      </div>
    </BaseCard>
  )
}

export default OrderInfo
