import s from './card.module.css'
import Image from 'next/image'
import { IProductCard } from '../../types/types'
import { use } from 'react'
import { isProductInFavorites } from '@/features/favorites/actions/actions'
import FavoriteToggle from '../favorite-toggle/favorite-toggle'
import Link from 'next/link'

const Card = ({ item }: IProductCard) => {
  const isFavorite = use(isProductInFavorites())?.items.flatMap((favorite) =>
    Object.values(favorite)
  )

  return (
    <div className={s.card}>
      <FavoriteToggle
        isFavorite={isFavorite?.includes(item.id)}
        productId={item.id}
      />
      <Link key={item.id} href={`/product/${item.id}`}>
        <div className={s.img}>
          <Image
            src={item?.images[0].url}
            width={250}
            height={250}
            alt="airpods"
          />
        </div>
      </Link>
      <div className={s.info}>
        <div className={s.name}>{item?.name}</div>
        <div className={s.price}>{item?.price} $</div>
      </div>
    </div>
  )
}

export default Card
