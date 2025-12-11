// Если не хочешь устанавливать framer-motion
'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Fade,
} from '@mui/material'
import { Lock, Login, Security, Warning, ArrowBack } from '@mui/icons-material'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 2,
                }}
              >
                <Warning sx={{ fontSize: 40, mr: 2 }} />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '6rem', md: '8rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    textShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  401
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Доступ запрещен
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Для доступа к этой странице необходима авторизация. Пожалуйста,
                войдите в свою учетную запись.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Button
                  component={Link}
                  href="/auth/sign-in"
                  variant="contained"
                  size="large"
                  startIcon={<Login />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'white',
                    color: '#c92a2a',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      background: 'white',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Войти в аккаунт
                </Button>

                <Button
                  component={Link}
                  href="/"
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowBack />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  На главную
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <Box
                sx={{
                  height: '8px',
                  background: 'linear-gradient(90deg, #ff6b6b, #c92a2a)',
                }}
              />

              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: 'white',
                  }}
                >
                  <Lock sx={{ fontSize: 40 }} />
                </Box>

                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight={600}
                  align="center"
                  sx={{ color: '#c92a2a' }}
                >
                  Требуется авторизация
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                  paragraph
                >
                  Эта страница защищена и доступна только авторизованным
                  пользователям.
                </Typography>

                <Button
                  component={Link}
                  href="/auth/sign-up"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderColor: '#ff6b6b',
                    color: '#c92a2a',
                    '&:hover': {
                      borderColor: '#c92a2a',
                      background: 'rgba(255, 107, 107, 0.1)',
                    },
                  }}
                >
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
