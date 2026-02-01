import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useDebounce } from './use-debounce'

export const useSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get('q') || '')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (!debouncedSearch && pathname !== '/search') return

    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('q', String(debouncedSearch))
    } else {
      params.delete('q')
    }

    startTransition(() => {
      const queryString = params.toString()
      const newPath = `/search${queryString ? `?${queryString}` : ''}`

      if (`${pathname}?${searchParams.toString()}` !== newPath) {
        router.push(newPath, { scroll: false })
      }
    })
  }, [debouncedSearch, router])

  return { search, setSearch, isPending }
}
