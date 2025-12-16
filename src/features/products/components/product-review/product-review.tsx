import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Rating,
  Typography,
} from '@mui/material'
import s from './product-review.module.css'
import { Comment } from '@mui/icons-material'
import { ProductWithRelations } from '../../types/types'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  averageRating: string
  product: ProductWithRelations
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const ProductReview = ({ averageRating, product, setOpenDialog }: Props) => {
  return (
    <Box className={s.reviews}>
      <Box className={s.reviewsHeader}>
        <Box className={s.ratingSummary}>
          <Typography variant="h4" className={s.averageRating}>
            {averageRating}
          </Typography>
          <Rating value={Number(averageRating)} readOnly size="large" />
          <Typography variant="body2" color="text.secondary">
            Based on {product.ratings.length} ratings
          </Typography>
        </Box>
        <Button
          onClick={() => setOpenDialog((prev) => !prev)}
          variant="outlined"
          startIcon={<Comment />}
        >
          Write a Review
        </Button>
      </Box>

      <Divider />

      <Box className={s.reviewsList}>
        {product.reviews &&
          product.reviews.map((review) => (
            <Card key={review.id} className={s.reviewCard}>
              <CardContent>
                <Box className={s.reviewHeader}>
                  <Box className={s.reviewAuthor}>
                    {review.author.avatar && (
                      <Avatar
                        src={review.author?.avatar.url}
                        className={s.avatar}
                      >
                        {review.author.name?.charAt(0)}
                      </Avatar>
                    )}
                    <Box sx={{ display: 'flex', gap: 5 }}>
                      <Typography variant="subtitle2">
                        {review.author.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.createdAt.toLocaleDateString('en-EN')}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={Number(averageRating)} readOnly size="small" />
                </Box>
                {review.review && (
                  <Typography variant="body1" className={s.reviewComment}>
                    {review.review}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  )
}

export default ProductReview
