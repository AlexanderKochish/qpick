import { Box, Card, CardContent, Typography } from '@mui/material'
import s from './profile-reviews.module.css'
import { Rating as MuiRating } from '@mui/material'
import { Rating, Review } from '../../types/types'

function ReviewsSection({
  ratings,
  reviews,
}: {
  ratings: Rating[]
  reviews: Review[]
}) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Мои отзывы и оценки
      </Typography>

      <Typography variant="subtitle1" gutterBottom className={s.sectionTitle}>
        Оценки товаров
      </Typography>

      {ratings.map((rating) => (
        <Card key={rating.id} className={s.card}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              {rating.product.name}
            </Typography>
            <Box className={s.ratingInfo}>
              <MuiRating value={rating.rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                {rating.createdAt.toLocaleDateString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Typography variant="subtitle1" gutterBottom className={s.sectionTitle}>
        Отзывы
      </Typography>

      {reviews.map((review) => (
        <Card key={review.id} className={s.card}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              {review.product.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {review.review}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {review.createdAt.toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default ReviewsSection
