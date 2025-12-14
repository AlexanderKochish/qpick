'use client'
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Rating,
  TextField,
  Typography,
} from '@mui/material'
import { useActionState, useEffect } from 'react'
import s from './review-form.module.css'
import { createReview } from '../../actions/actions'
import { Send } from '@mui/icons-material'
import { useToast } from '@/shared/hooks/use-toast'

interface Props {
  productId: string
  setIsOpen: (open: boolean) => void
}

const ReviewForm = ({ productId, setIsOpen }: Props) => {
  const toast = useToast()
  const [state, formAction, isPending] = useActionState(createReview, null)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success(state.message!)
      setIsOpen(false)
    } else if (state.errors?._errors?.length) {
      toast.error(state.errors._errors[0])
    }
  }, [state])

  return (
    <Box>
      <DialogContent className={s.content}>
        {state?.errors._errors && state?.errors._errors.length > 0 && (
          <Alert sx={{ my: 1 }} severity="error">
            {state?.errors._errors?.[0]}
          </Alert>
        )}
        {state?.success && state.message && (
          <Alert sx={{ my: 1 }} severity="success">
            {state?.success && state.message}
          </Alert>
        )}
        <form id="review-modal" action={formAction} className={s.form}>
          <input type="hidden" name="productId" value={productId} />

          <div className={s.ratingSection}>
            <Typography component="legend">Ваша оценка</Typography>
            <Rating
              name="rating"
              size="large"
              precision={0.5}
              defaultValue={0}
            />
          </div>
          <TextField
            name="review"
            label="Ваш отзыв"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </form>
      </DialogContent>

      <DialogActions className={s.actions}>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Отмена
        </Button>
        <Button
          type="submit"
          form="review-modal"
          color="primary"
          variant="contained"
          startIcon={<Send />}
          disabled={isPending}
        >
          Опубликовать отзыв
        </Button>
      </DialogActions>
    </Box>
  )
}

export default ReviewForm
