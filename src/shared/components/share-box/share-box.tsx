'use client'
import { IconButton } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import s from './share-box.module.css'
import { useCopy } from '@/shared/hooks/use-copy'

export default function ShareBox({ shareUrl }: { shareUrl: string }) {
  const { handleCopy, copied } = useCopy(shareUrl)
  return (
    <div className={s.actions}>
      <div className={s.inputBox}>
        <input value={shareUrl} readOnly className={s.input} />
        <IconButton onClick={handleCopy} className={s.copyBtn}>
          {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
        </IconButton>
      </div>
    </div>
  )
}
