import { FavoriteCardType } from '@/features/favorites/types/types'
import { ProductCard } from '@/features/products/types/types'
import { useState } from 'react'

interface Props {
  items: ProductCard[] | FavoriteCardType[]
  itemsPerPage?: number
}

export const usePagination = ({ items, itemsPerPage = 12 }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = items?.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = items?.length ? Math.ceil(items.length / itemsPerPage) : 0

  return {
    currentPage,
    setCurrentPage,
    currentProducts,
    totalPages,
  }
}
