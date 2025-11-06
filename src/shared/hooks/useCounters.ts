'use client'

import { getCounters } from '@/features/counters/actions/actions'
import { useQuery } from '@tanstack/react-query'

interface CountersData {
  favoritesCount: number
  cartItemsCount: number
}

export const useCounters = (initialData?: CountersData) => {
  return useQuery({
    queryKey: ['counters'],
    queryFn: getCounters,
    initialData: initialData,
  })
}
