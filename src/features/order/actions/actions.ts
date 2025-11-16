'use server'

import { z } from 'zod'
import { orderSchema } from '../lib/zod/order.schema'
import { OrderRepository } from '../repository/order.repository'

export interface IInitialState {
  message?: string
  errors?: string[]
  redirectTo?: string
  orderId?: string
}

const repo = new OrderRepository()

export async function sendOrderForm(
  state: IInitialState,
  formData: FormData
): Promise<IInitialState> {
  const data = Object.fromEntries(formData.entries())
  const validatedFields = orderSchema.safeParse(data)
  console.log({ data })
  if (!validatedFields.success) {
    const fieldErrors = z.treeifyError(validatedFields.error)
    return {
      message: 'Please correct the errors in the form.',
      errors: fieldErrors.errors,
    }
  }

  try {
    const result = await repo.create(validatedFields.data)

    return {
      message: 'Order created! Redirecting to payment...',
      redirectTo: `/payment/${result.order.id}`,
      orderId: result.order.id,
      errors: undefined,
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Order creation failed',
      errors: [],
    }
  }
}

export async function getOrderTotalPrice(orderId: string) {
  if (!orderId) return

  return await repo.getOrderTotalPrice(orderId)
}
