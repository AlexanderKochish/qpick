import s from './order-info.module.css'
import BaseCard from '@/shared/components/base-card/base-card'
import { ICart } from '@/features/cart/types/types'

interface Props {
  totalPrice?: number
  products?: ICart
}

const OrderInfo = ({ totalPrice, products }: Props) => {
  return (
    <BaseCard>
      <strong>Ваш заказ</strong>
      <div className={s.details}>
        {products &&
          products.items.map((item) => (
            <div key={item.id}>
              <span>{item.product.name}</span>
              <span>{item.product.price} $</span>
            </div>
          ))}
        <div>
          <span>Доставка:</span>
          <span>15 $</span>
        </div>
        <div>
          <span>К оплате</span>
          <span>{totalPrice && totalPrice + 15} $</span>
        </div>
      </div>
    </BaseCard>
  )
}

export default OrderInfo
