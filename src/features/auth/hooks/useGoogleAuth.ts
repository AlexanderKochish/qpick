import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setIsError] = useState<string | null>(null)
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      setIsError(
        error instanceof Error ? error.message : 'Something went wrong'
      )
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return { handleGoogleSignIn, isLoading, error }
}
