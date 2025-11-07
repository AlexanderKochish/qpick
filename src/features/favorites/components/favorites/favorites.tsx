import Card from '@/features/products/components/card/card'
import { getAllFavorites } from '../../actions/actions'
import { getCurrentSession } from '@/features/auth/actions/actions'
import s from './favorites.module.css'

const Favorites = async () => {
  const session = await getCurrentSession()
  const favorites = await getAllFavorites(session?.user.id as string)

  return (
    <section className={s.favorites}>
      <h2>Избранное</h2>
      <div className={s.favoritesList}>
        {favorites?.items &&
          favorites.items.map((item) => (
            <Card key={item.product.id} item={item.product} />
          ))}
      </div>
    </section>
  )
}

export default Favorites
