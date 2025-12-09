'use client'

import { Share } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import SharedLinksModal from '../shared-links-modal/shared-links-modal'
import { usePathname } from 'next/navigation'
import s from './share-button.module.css'
interface Props {
  className?: string
  link?: string
}

const ShareButton = ({ className = 'primary', link }: Props) => {
  const [isOpenShared, setIsOpenShared] = useState(false)
  const pathname = usePathname()

  const shareLink = () => {
    setIsOpenShared((prev) => !prev)
  }

  return (
    <>
      <IconButton onClick={shareLink} className={s[className]}>
        <Share />
      </IconButton>
      <SharedLinksModal
        isOpen={isOpenShared}
        setIsOpen={setIsOpenShared}
        link={!pathname.includes('/') ? pathname : link!}
      />
    </>
  )
}

export default ShareButton
