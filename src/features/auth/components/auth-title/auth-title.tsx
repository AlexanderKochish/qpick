import React from 'react'
import s from './auth-title.module.css'
import { Box, Typography } from '@mui/material'
import { Smartphone } from '@mui/icons-material'

interface AuthTitleProps {
  title: string
  subtitle: string
  description: string
}

const AuthTitle = ({ title, subtitle, description }: AuthTitleProps) => {
  return (
    <Box className={s.header}>
      <Box className={s.logo}>
        <Smartphone className={s.logoIcon} />
      </Box>
      <Typography variant="h4" component="h1" className={s.title}>
        {title}
      </Typography>
      <Typography variant="h6" className={s.subtitle}>
        {subtitle}
      </Typography>
      <Typography variant="body2" className={s.description}>
        {description}
      </Typography>
    </Box>
  )
}

export default AuthTitle
