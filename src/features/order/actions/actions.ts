'use server'

import { z } from 'zod'
import { orderSchema } from '../lib/zod/order.schema'
import { OrderRepository } from '../repository/order.repository'

type FormFields = {
  city?: { errors: string[] }
  street?: { errors: string[] }
  building?: { errors: string[] }
  apartment?: { errors: string[] }
  postalCode?: { errors: string[] }
  phone?: { errors: string[] }
  paymentType?: { errors: string[] }
  totalPrice?: { errors: string[] }
}

export interface IInitialState {
  message?: string
  errors?: string[]
  properties?: FormFields
  redirectTo?: string
  orderId?: string
  success?: boolean
}

const repo = new OrderRepository()

export async function sendOrderForm(
  state: IInitialState,
  formData: FormData
): Promise<IInitialState> {
  const data = Object.fromEntries(formData.entries())
  const validatedFields = orderSchema.safeParse(data)

  if (!validatedFields.success) {
    const fieldErrors = z.treeifyError(validatedFields.error)
    return {
      message: 'Please correct the errors in the form.',
      errors: fieldErrors.errors,
      properties: fieldErrors.properties,
      success: false,
    }
  }

  try {
    const result = await repo.create(validatedFields.data)

    return {
      message: 'Order created! Redirecting to payment...',
      redirectTo: `/payment/${result.order.id}`,
      orderId: result.order.id,
      errors: undefined,
      properties: undefined,
      success: true,
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Order creation failed',
      errors: [],
      properties: undefined,
      success: false,
    }
  }
}

export async function getOrderTotalPrice(orderId: string) {
  if (!orderId) return

  return await repo.getOrderTotalPrice(orderId)
}

export async function getOrderById(id: string) {
  return await repo.getOrderById(id)
}
