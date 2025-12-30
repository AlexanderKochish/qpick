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
        My reviews and ratings
      </Typography>

      <Typography variant="subtitle1" gutterBottom className={s.sectionTitle}>
        Ratings
      </Typography>

      <Typography variant="subtitle1">
        {ratings.length === 0 && 'There are no ratings yet.'}
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
        Reviews
      </Typography>
      <Typography variant="subtitle1">
        {reviews.length === 0 && 'There are no reviews yet'}
      </Typography>

      {reviews.map((review) => (
        <Card key={review.id} className={s.card}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              {review.product.name}
            </Typography>
            <Typography variant="body1" component={'p'}>
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
