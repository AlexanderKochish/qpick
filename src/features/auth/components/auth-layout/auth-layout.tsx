// features/auth/components/auth-layout/AuthLayout.tsx
'use client'

import { ReactNode } from 'react'
import { Box, Container, Paper } from '@mui/material'
import s from './auth-layout.module.css'

interface AuthLayoutProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function AuthLayout({
  children,
  maxWidth = 'sm',
}: AuthLayoutProps) {
  return (
    <Box className={s.container}>
      <Box className={s.backgroundAnimation} />

      <Container component="main" maxWidth={maxWidth}>
        <Paper className={s.paper} elevation={24}>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}
