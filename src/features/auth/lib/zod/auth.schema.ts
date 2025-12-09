import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z
    .string()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})
export type SignInSchema = z.infer<typeof signInSchema>
