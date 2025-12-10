'use client'

import { Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/link'
import s from './breadcrumbs-nav.module.css'
import { ReactNode } from 'react'

export type BreadcrumbItem = {
  label: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function BreadcrumbNav({
  items,
  className = '',
}: BreadcrumbNavProps) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      className={`${s.breadcrumbs} ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast || !item.href) {
          return (
            <Typography
              key={index}
              color="text.primary"
              className={s.currentPage}
            >
              {item.icon}
              {item.label}
            </Typography>
          )
        }

        return (
          <Link key={index} href={item.href} className={s.breadcrumbLink}>
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
