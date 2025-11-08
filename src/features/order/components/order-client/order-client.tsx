import s from './order-client.module.css'
import OrderForm from '../order-form/order-form'

const OrderClient = () => {
  return (
    <section className={s.orderSection}>
      <h2>Оформление заказа</h2>
      <OrderForm />
    </section>
  )
}

export default OrderClient
