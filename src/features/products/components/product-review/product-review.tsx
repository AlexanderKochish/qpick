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
            На основе {product.ratings.length} оценок
          </Typography>
        </Box>
        <Button
          onClick={() => setOpenDialog((prev) => !prev)}
          variant="outlined"
          startIcon={<Comment />}
        >
          Написать отзыв
        </Button>
      </Box>

      <Divider />

      <Box className={s.reviewsList}>
        {product.ratings.map((rating) => (
          <Card key={rating.id} className={s.reviewCard}>
            <CardContent>
              <Box className={s.reviewHeader}>
                <Box className={s.reviewAuthor}>
                  {rating.author.avatar && (
                    <Avatar
                      src={rating.author?.avatar.url}
                      className={s.avatar}
                    >
                      {rating.author.name?.charAt(0)}
                    </Avatar>
                  )}
                  <Box>
                    <Typography variant="subtitle2">
                      {rating.author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rating.createdAt.toLocaleDateString('ru-RU')}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={Number(rating.rating)} readOnly size="small" />
              </Box>
              {rating.rating && (
                <Typography variant="body1" className={s.reviewComment}>
                  {rating.rating}
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
