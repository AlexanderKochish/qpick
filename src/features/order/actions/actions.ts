'use server'

import { z } from 'zod'
import { orderSchema } from '../lib/zod/order.schema'

export interface IInitialState {
  message?: string
  errors?: string[]
}

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
    }
  }

  return {
    message: 'The form has been sent successfully!',
    errors: undefined,
  }
}
