import { getAllFavorites } from '../../actions/actions'
import { getCurrentSession } from '@/features/auth/actions/actions'
import s from './favorites.module.css'
import BreadcrumbNav from '@/widgets/breadcrumbs-nav/breadcrumbs-nav'
import FavoritesClient from '../favorites-client/favorites-client'

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
      <FavoritesClient
        favorites={favorites.items.map((item) => item.product)}
      />
    </section>
  )
}

export default Favorites
