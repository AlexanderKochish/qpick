import React, { ReactNode } from 'react'
import s from './base-card.module.css'

interface Props {
  children: ReactNode
}

const BaseCard = ({ children }: Props) => {
  return <div className={s.baseCard}>{children}</div>
}

export default BaseCard
