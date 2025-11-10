'use server'

import { PaymentRepository } from '../repository/payment.repository'

const repo = new PaymentRepository()
export async function confirmPayment(orderId: string) {
  return await repo.confirmPayment(orderId)
}

export async function updatePaymentStatus(
  orderId: string,
  status: 'SUCCEEDED' | 'FAILED'
) {
  return await repo.updatePaymentStatus(orderId, status)
}
