'use client'

import { getCounters } from '@/features/counters/actions/actions'
import { useQuery } from '@tanstack/react-query'
import { CountersData } from '../types/types'

export const useCounters = (initialData?: CountersData) => {
  return useQuery({
    queryKey: ['counters'],
    queryFn: getCounters,
    initialData: initialData,
  })
}
