'use client'

import { usePagination } from '@/shared/hooks/use-pagination'
import s from './favorites-client.module.css'
import FavoriteCard from '../card/card'
import SitePagination from '@/shared/components/site-pagination/site-pagination'
import { FavoriteCardType } from '../../types/types'

interface Props {
  favorites: FavoriteCardType[]
}

const FavoritesClient = ({ favorites }: Props) => {
  const { currentPage, currentProducts, setCurrentPage, totalPages } =
    usePagination({ items: favorites, itemsPerPage: 3 })
  return (
    <div className={s.favoritesBlock}>
      <div className={s.favoritesList}>
        {currentProducts &&
          currentProducts.map((product) => (
            <FavoriteCard key={product.id} product={product} />
          ))}
      </div>
      <SitePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default FavoritesClient
