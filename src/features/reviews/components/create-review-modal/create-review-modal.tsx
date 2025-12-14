import { Dialog, DialogTitle } from '@mui/material'
import s from './create-review-modal.module.css'
import ReviewForm from '../review-form/review-form'

interface Props {
  setIsOpen: (open: boolean) => void
  isOpen: boolean
  ratingCount?: number
  productId: string
}

const CreateReviewModal = ({ setIsOpen, isOpen, productId }: Props) => {
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
      <ReviewForm productId={productId} setIsOpen={setIsOpen} />
    </Dialog>
  )
}

export default CreateReviewModal
