import { Rating } from '@prisma/client'

export const calculateAverageRating = (ratings: Rating[]) => {
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + Number(rating.rating), 0)
  return sum / ratings.length
}
