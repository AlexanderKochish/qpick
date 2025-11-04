'use client'

import { getStableVisitorId } from '@/shared/utils/fingerprint'
import { useEffect, useState } from 'react'

export function useVisitor() {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initVisitor = async () => {
      try {
        const id = await getStableVisitorId()

        if (mounted) {
          setVisitorId(id)
          console.log('Visitor ID set:', id)
        }
      } catch (error) {
        console.error('Failed to get visitor ID:', error)
        if (mounted) {
          setVisitorId(null)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initVisitor()

    return () => {
      mounted = false
    }
  }, [])

  return { visitorId, isLoading }
}
