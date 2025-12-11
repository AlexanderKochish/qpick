export interface PaymentIntentResponse {
  clientSecret: string
  id: string
  status: string
  amount: number
  currency: string
}

export interface UsePaymentIntentProps {
  orderId?: string
  enabled?: boolean
}
