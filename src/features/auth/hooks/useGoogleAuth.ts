import { signIn } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: () => signIn('google', { callbackUrl: '/' }),
    retry: false,
  })
}
