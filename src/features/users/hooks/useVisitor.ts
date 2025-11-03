'use client'

import { getStableVisitorId } from '@/shared/utils/fingerprint'
import { useEffect, useState } from 'react'

export function useVisitor() {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initVisitor = async () => {
      try {
        const id = await getStableVisitorId()
        setVisitorId(id)
      } catch (error) {
        console.error('Failed to get visitor ID:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initVisitor()
  }, [])

  return { visitorId, isLoading }
}
