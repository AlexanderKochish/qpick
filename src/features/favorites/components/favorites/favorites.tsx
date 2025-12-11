import { getAllFavorites } from '../../actions/actions'
import { getCurrentSession } from '@/features/auth/actions/actions'
import s from './favorites.module.css'
import FavoriteCard from '../card/card'
import BreadcrumbNav from '@/widgets/breadcrumbs-nav/breadcrumbs-nav'

const Favorites = async () => {
  const session = await getCurrentSession()
  const favorites = await getAllFavorites(session?.user.id as string)

  if (!favorites || favorites.items.length === 0) {
    return (
      <section className={s.favorites}>
        <BreadcrumbNav
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Избранное', href: '/favorites' },
          ]}
        />
        <p>У вас нет избранных товаров.</p>
      </section>
    )
  }

  return (
    <section className={s.favorites}>
      <BreadcrumbNav
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Избранное', href: '/favorites' },
        ]}
      />
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
