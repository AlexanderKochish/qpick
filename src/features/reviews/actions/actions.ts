'use server'

import { getCurrentSession } from '@/features/auth/actions/actions'
import { ReviewRepository } from '../repository/review.repository'

const repo = new ReviewRepository()

export async function createReview(formData: FormData) {
  const session = await getCurrentSession()
  if (!session) {
    return null
  }
  formData.set('authorId', String(session?.user.id))
  const data = Object.fromEntries(formData.entries())
  console.log({ data })
}
