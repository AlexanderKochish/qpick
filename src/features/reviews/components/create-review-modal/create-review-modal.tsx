import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from '@mui/material'
import { SendIcon } from 'lucide-react'
import React, { useActionState } from 'react'
import s from './create-review-modal.module.css'
import { createReview } from '../../actions/actions'

interface Props {
  setIsOpen: (open: boolean) => void
  isOpen: boolean
  ratingCount?: number
}

const CreateReviewModal = ({ setIsOpen, isOpen, ratingCount }: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={s.dialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className={s.dialogTitle}>
        Оставить отзыв о товаре
      </DialogTitle>

      <DialogContent className={s.content}>
        <form id="review-modal" action={createReview} className={s.form}>
          <TextField
            name="name"
            label="Ваше имя"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          <div className={s.ratingSection}>
            <Typography component="legend">Ваша оценка</Typography>
            <Rating
              name="rating"
              // value={ratingValue}
              // onChange={(event, newValue) => setRatingValue(newValue)}
              size="large"
              precision={0.5}
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
            required
          />

          <div className={s.prosCons}>
            <TextField
              name="pros"
              label="Достоинства"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              name="cons"
              label="Недостатки"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </div>
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
          startIcon={<SendIcon />}
          // disabled={!ratingCount}
        >
          Опубликовать отзыв
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateReviewModal
