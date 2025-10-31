import EmptyState from '@/shared/components/empty-state/empty-state'
import emptyCart from '../../../public/empty-cart.png'

const CartPage = () => {
  return (
    <div className="container">
      <EmptyState
        img={emptyCart}
        title="Корзина пуста"
        description="Но это никогда не поздно исправить :)"
      />
    </div>
  )
}

export default CartPage
