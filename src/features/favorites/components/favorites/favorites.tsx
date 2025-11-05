import Card from '@/features/products/components/card/card'
import { getAllFavorites, isProductInFavorites } from '../../actions/actions'
import { getCurrentSession } from '@/features/auth/actions/actions'

const Favorites = async () => {
  const session = await getCurrentSession()
  const favorites = await getAllFavorites(session?.user.id as string)
  const isFavorite = await isProductInFavorites(session?.user.id as string)

  const values = isFavorite?.items.flatMap((item) => Object.values(item))

  return (
    <div>
      {favorites?.items &&
        favorites.items.map((item) => (
          <Card
            isFavorite={values?.includes(item.product.id)}
            key={item.product.id}
            item={item.product}
          />
        ))}
    </div>
  )
}

export default Favorites
