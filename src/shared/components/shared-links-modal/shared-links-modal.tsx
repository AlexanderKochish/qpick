import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import s from './shared-links-modal.module.css'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'
import ShareBox from '../share-box/share-box'

interface Props {
  setIsOpen: (open: boolean) => void
  isOpen: boolean
  link: string
}

const SharedLinksModal = ({ setIsOpen, isOpen, link }: Props) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${link}`
  const title = 'Check out this product'
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={s.dialog}
      maxWidth="sm"
      fullWidth
    >
      <IconButton
        onClick={() => setIsOpen(false)}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'rgba(0,0,0,0.05)',
          backdropFilter: 'blur(6px)',
          borderRadius: '10px',
          transition: '0.2s',
          '&:hover': {
            background: 'rgba(0,0,0,0.12)',
            transform: 'rotate(90deg)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle className={s.dialogTitle}>
        Поделиться ссылкой на товар
      </DialogTitle>

      <DialogContent className={s.content}>
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={52} round />
        </FacebookShareButton>

        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={52} round />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={52} round />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={52} round />
        </TwitterShareButton>
      </DialogContent>

      <ShareBox shareUrl={shareUrl} />
    </Dialog>
  )
}

export default SharedLinksModal
