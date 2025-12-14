'use server'

import { getCurrentSession } from '@/features/auth/actions/actions'
import { ReviewRepository } from '../repository/review.repository'
import { RatingRepository } from '@/features/rating/repository/rating.repository'
import prisma from '@/shared/lib/prisma'
import { reviewSchema } from '../lib/zod/review.schema'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const repo = new ReviewRepository()
const ratingRepo = new RatingRepository()

type ReviewFormState = {
  success: boolean
  message?: string
  errors: {
    _errors?: string[]
  }
} | null

export async function createReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  try {
    const session = await getCurrentSession()
    if (!session) {
      return {
        success: false,
        errors: { _errors: ['Unauthorized'] },
      }
    }

    formData.set('authorId', session.user.id)

    const validated = reviewSchema.safeParse({
      productId: formData.get('productId'),
      rating: Number(formData.get('rating')),
      review: formData.get('review'),
      authorId: formData.get('authorId'),
    })

    if (!validated.success) {
      const tree = z.treeifyError(validated.error)

      return {
        success: false,
        errors: {
          _errors: tree.errors ?? ['Invalid form data'],
        },
      }
    }

    const data = validated.data

    const hasReview = Boolean(data.review?.trim())
    const hasRating = Boolean(data.rating)

    if (!hasReview && !hasRating) {
      return {
        success: false,
        errors: { _errors: ['A review or rating must be completed'] },
      }
    }

    if (hasReview && !hasRating) {
      await repo.create({
        ...data,
        review: data.review!,
      })
    } else if (hasRating && !hasReview) {
      await ratingRepo.create({
        ...data,
        rating: String(data.rating),
      })
    } else {
      await prisma.$transaction(async (tx) => {
        await ratingRepo.create({ ...data, rating: String(data.rating) }, tx)
        await repo.create({ ...data, review: data.review! }, tx)
      })
    }

    revalidatePath(`/product/${data.productId}`)
    revalidatePath('/')

    return {
      success: true,
      message: 'Review submitted successfully',
      errors: { _errors: [] },
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return {
        success: false,
        errors: { _errors: ['You already left a review for this product'] },
      }
    }

    return {
      success: false,
      errors: {
        _errors: [
          error instanceof Error ? error.message : 'Something went wrong',
        ],
      },
    }
  }
}
