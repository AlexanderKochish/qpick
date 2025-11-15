import { z } from 'zod'

export const orderSchema = z.object({
  //   country: z.string().optional(),
  city: z
    .string({
      error: 'Please provide a city',
    })
    .min(2, 'The city is too short')
    .max(30, 'The city is too long'),

  street: z
    .string({
      error: 'Please provide a street',
    })
    .min(2, 'The street name is too short')
    .max(50, 'The street name is too long'),

  building: z
    .string({
      error: 'Please provide a house number',
    })
    .min(1, 'The house number is required')
    .max(10, 'The house number is too long'),

  apartment: z
    .string()
    .min(1, 'Apartment number required')
    .max(10, 'Apartment number is too long')
    .or(z.literal('')),

  postalCode: z
    .string({
      error: 'Please enter a postal code',
    })
    .length(5, 'The postal code must be 5 digits')
    .regex(/^\d{5}$/, 'Numbers only'),
  phone: z
    .string({
      error: 'Please enter a phone number',
    })
    .min(9, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Invalid phone number format'),

  paymentType: z.enum(['CARD', 'CASH', 'APPLE_PAY', 'GOOGLE_PAY'], {
    error: 'Select a payment method',
  }),
  totalPrice: z
    .string({ error: 'Please enter a total price' })
    .min(1, 'Price is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
})

export type OrderFormData = z.infer<typeof orderSchema>
export type orderSchemaType = z.infer<typeof orderSchema>
