'use server'

import { getCurrentSession } from '@/features/auth/actions/actions'
import { ReviewRepository } from '../repository/review.repository'
import { RatingRepository } from '@/features/rating/repository/rating.repository'
import prisma from '@/shared/lib/prisma'

const repo = new ReviewRepository()
const ratingRepo = new RatingRepository()

type ReviewCreate = {
  rating: string
  review: string
  authorId: string
  productId: string
}

export async function createReview(formData: FormData) {
  const session = await getCurrentSession()
  if (!session) return

  formData.set('authorId', String(session.user.id))

  const data = Object.fromEntries(formData.entries()) as ReviewCreate

  const hasReview = Boolean(data.review?.trim())
  const hasRating = Boolean(data.rating)

  if (hasReview && !hasRating) {
    await repo.create(data)
    return
  }

  if (hasRating && !hasReview) {
    await ratingRepo.create(data)
    return
  }

  await prisma.$transaction(async (tx) => {
    await ratingRepo.create(data, tx)
    await repo.create(data, tx)
  })
}
