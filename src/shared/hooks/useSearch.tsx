import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useDebounce } from './useDebounce'

export const useSearch = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const initial = searchParams.get('search') || ''
  const [search, setSearch] = useState(initial)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('search', String(debouncedSearch))
    } else {
      params.delete('search')
    }
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }, [debouncedSearch])

  return { search, setSearch }
}
