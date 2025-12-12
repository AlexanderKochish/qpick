import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { SortBy } from '../types/types'

export const useSort = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const sortBy = (searchParams.get('sort') as SortBy) || 'newest'

  const handleSortChange = useCallback(
    (value: SortBy) => {
      const currentParams = new URLSearchParams(searchParams.toString())

      if (value === 'newest') {
        currentParams.delete('sort')
      } else {
        currentParams.set('sort', value)
      }

      startTransition(() => {
        router.push(`/?${currentParams.toString()}`, { scroll: false })
      })
    },
    [router, searchParams]
  )

  return { sortBy, setSortBy: handleSortChange, isPending }
}
