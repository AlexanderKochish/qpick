import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { SortBy } from '../types/types'

export const useSort = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const sortBy = (searchParams.get('sort') as SortBy) || 'newest'

  const handleSortChange = useCallback(
    (value: SortBy) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === 'newest') {
        params.delete('sort')
      } else {
        params.set('sort', value)
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, searchParams, pathname]
  )

  return { sortBy, setSortBy: handleSortChange, isPending }
}
