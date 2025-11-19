import { getAllFavorites } from '../../actions/actions'
import { getCurrentSession } from '@/features/auth/actions/actions'
import s from './favorites.module.css'
import FavoriteCard from '../card/card'

const Favorites = async () => {
  const session = await getCurrentSession()
  const favorites = await getAllFavorites(session?.user.id as string)

  return (
    <section className={s.favorites}>
      <h2>Избранное</h2>
      <div className={s.favoritesList}>
        {favorites?.items &&
          favorites.items.map(({ product }) => (
            <FavoriteCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  )
}

export default Favorites
