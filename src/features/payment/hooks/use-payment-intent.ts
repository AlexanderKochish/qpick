import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PaymentIntentResponse, UsePaymentIntentProps } from '../types/types'

export const usePaymentIntent = ({
  orderId,
  enabled = true,
}: UsePaymentIntentProps): UseQueryResult<PaymentIntentResponse, Error> => {
  return useQuery<PaymentIntentResponse, Error>({
    queryKey: ['paymentIntent', orderId],
    queryFn: async (): Promise<PaymentIntentResponse> => {
      if (!orderId) {
        throw new Error('Order ID is required to create payment intent')
      }

      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.message || `HTTP error! status: ${res.status}`)
      }
      return await res.json()
    },
    enabled: !!orderId && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.message.includes('4')) return false
      return failureCount < 2
    },
    meta: {
      errorMessage: 'Failed to create payment intent',
    },
  })
}
