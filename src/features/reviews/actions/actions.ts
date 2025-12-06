'use server'

import { getCurrentSession } from '@/features/auth/actions/actions'
import { ReviewRepository } from '../repository/review.repository'

const repo = new ReviewRepository()

type ReviewCreate = {
  review: string
  authorId: string
  productId: string
}

export async function createReview(formData: FormData) {
  const session = await getCurrentSession()
  if (!session) {
    return
  }
  formData.set('authorId', String(session?.user.id))
  const data = Object.fromEntries(formData.entries()) as ReviewCreate
  await repo.create(data)
}
