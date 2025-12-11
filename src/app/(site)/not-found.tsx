'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Fade,
} from '@mui/material'
import {
  Home,
  Search,
  ShoppingCart,
  Refresh,
  ErrorOutline,
} from '@mui/icons-material'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Анимированный фон */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Плавающие элементы */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          fontSize: '60px',
          opacity: 0.1,
        }}
      >
        <ErrorOutline />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          fontSize: '80px',
          opacity: 0.1,
        }}
      >
        <ErrorOutline />
      </motion.div>

      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box>
            <Grid container spacing={4} alignItems="center">
              {/* Левая часть - основной контент */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box
                    sx={{
                      color: 'white',
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    {/* Код ошибки с анимацией */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2,
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: { xs: '8rem', md: '12rem' },
                          fontWeight: 900,
                          lineHeight: 1,
                          mb: 2,
                          textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        404
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 3,
                          fontSize: { xs: '2rem', md: '3rem' },
                        }}
                      >
                        Ой! Страница не найдена
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 4,
                          opacity: 0.9,
                          fontSize: { xs: '1rem', md: '1.25rem' },
                        }}
                      >
                        Возможно, страница была удалена или вы ошиблись адресом.
                        Давайте найдем что-то интересное!
                      </Typography>
                    </motion.div>

                    {/* Кнопки */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
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
                          href="/"
                          variant="contained"
                          size="large"
                          startIcon={<Home />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            background: 'white',
                            color: '#667eea',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                              background: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          На главную
                        </Button>

                        <Button
                          component={Link}
                          href="/products"
                          variant="outlined"
                          size="large"
                          startIcon={<ShoppingCart />}
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
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          В каталог
                        </Button>
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>

              {/* Правая часть - карточки */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Grid container spacing={3}>
                    {/* Карточка 1 */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                          }}
                        >
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background:
                                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                                color: 'white',
                              }}
                            >
                              <Search sx={{ fontSize: 30 }} />
                            </Box>
                            <Typography
                              variant="h6"
                              gutterBottom
                              fontWeight={600}
                            >
                              Используйте поиск
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Найдите нужный товар через поисковую систему
                              нашего магазина
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>

                    {/* Карточка 2 */}
                    <Grid size={{ xs: 12, md: 6 }}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          delay: 0.1,
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                          }}
                        >
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background:
                                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                                color: 'white',
                              }}
                            >
                              <Refresh sx={{ fontSize: 30 }} />
                            </Box>
                            <Typography
                              variant="h6"
                              gutterBottom
                              fontWeight={600}
                            >
                              Обновите страницу
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Иногда помогает простое обновление страницы
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>

                    {/* Карточка 3 */}
                    <Grid size={{ xs: 12 }}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          delay: 0.2,
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            mt: { sm: 3 },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              fontWeight={600}
                            >
                              Популярные разделы
                            </Typography>
                            <Box
                              sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
                            >
                              <Button
                                component={Link}
                                href="/products?category=smartphones"
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: 2 }}
                              >
                                Смартфоны
                              </Button>
                              <Button
                                component={Link}
                                href="/products?category=laptops"
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: 2 }}
                              >
                                Ноутбуки
                              </Button>
                              <Button
                                component={Link}
                                href="/products?category=tablets"
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: 2 }}
                              >
                                Планшеты
                              </Button>
                              <Button
                                component={Link}
                                href="/products?category=accessories"
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: 2 }}
                              >
                                Аксессуары
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>

            {/* Анимированный текст внизу */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  mt: 8,
                  color: 'white',
                  opacity: 0.7,
                }}
              >
                <Typography variant="body2">
                  Если вы уверены, что страница должна существовать,{' '}
                  <Link
                    href="/contact"
                    style={{
                      color: 'white',
                      textDecoration: 'underline',
                      fontWeight: 500,
                    }}
                  >
                    свяжитесь с поддержкой
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}
