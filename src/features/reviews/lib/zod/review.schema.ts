import { z } from 'zod'

export const reviewSchema = z.object({
  productId: z.string({ error: 'Product ID is required.' }),
  rating: z.number().optional(),
  review: z.string().optional(),
  authorId: z.string({ error: 'Author ID is required.' }),
})

export type reviewSchemaType = z.infer<typeof reviewSchema>
