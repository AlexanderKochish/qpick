'use client'

import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Stack,
  Link,
  Paper,
  IconButton,
  Divider,
} from '@mui/material'
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Telegram,
  WhatsApp,
  Store,
  SupportAgent,
} from '@mui/icons-material'
import { useState } from 'react'

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={700}
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Контакты
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Свяжитесь с нами любым удобным способом
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight={600} mb={3}>
                Свяжитесь с нами
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <Phone />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Телефон
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        8 (800) 555-35-35
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Бесплатно по России
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <Email />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        info@gadget-store.ua
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ответим в течение часа
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <Store />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Главный офис
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        Киев, ул. Крещатик, д. 10
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        БЦ &quot;Тверской&quot;
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <AccessTime />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Режим работы
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        Пн-Пт: 9:00-21:00
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Сб-Вс: 10:00-20:00
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom fontWeight={600} mb={2}>
                Мы в соцсетях
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  sx={{
                    bgcolor: '#1877F2',
                    color: 'white',
                    '&:hover': { bgcolor: '#166FE5' },
                  }}
                  href="https://facebook.com"
                  target="_blank"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: '#E4405F',
                    color: 'white',
                    '&:hover': { bgcolor: '#D32C4F' },
                  }}
                  href="https://instagram.com"
                  target="_blank"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: '#0088CC',
                    color: 'white',
                    '&:hover': { bgcolor: '#0077B5' },
                  }}
                  href="https://telegram.org"
                  target="_blank"
                >
                  <Telegram />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: '#25D366',
                    color: 'white',
                    '&:hover': { bgcolor: '#1DA851' },
                  }}
                  href="https://whatsapp.com"
                  target="_blank"
                >
                  <WhatsApp />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight={600} mb={3}>
                Напишите нам
              </Typography>

              {isSubmitted && (
                <Alert
                  severity="success"
                  icon={<CheckCircle />}
                  sx={{ mb: 3 }}
                  onClose={() => setIsSubmitted(false)}
                >
                  Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Ваше имя"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Телефон"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Сообщение"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Send />}
                  disabled={isSubmitting}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Наши филиалы
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Киев
                </Typography>
                <Typography paragraph>
                  ул. Крещатик, д. 10, БЦ &quot;Крещатик&quot;, 5 этаж
                </Typography>
                <Typography color="text.secondary" paragraph>
                  🕒 Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-20:00
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  href="tel:+380951234567"
                >
                  +380 (95) 123-45-67
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Киев
                </Typography>
                <Typography component={'p'}>
                  ул. Крещатик, д. 10, БЦ &quot;Крещатик&quot;, 5 этаж
                </Typography>
                <Typography color="text.secondary" paragraph>
                  🕒 Пн-Пт: 10:00-22:00, Сб-Вс: 10:00-21:00
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  href="tel:+380951234567"
                >
                  +380 (95) 123-45-67
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Частые вопросы
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                <SupportAgent sx={{ verticalAlign: 'middle', mr: 1 }} />
                Техническая поддержка
              </Typography>
              <Typography paragraph>
                По вопросам работы устройств, гарантии и ремонта:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📞 +7 (800) 555-00-11
                <br />
                ✉️ support@gadget-store.ru
                <br />
                🕒 Круглосуточно
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                <Store sx={{ verticalAlign: 'middle', mr: 1 }} />
                Для бизнеса
              </Typography>
              <Typography component={'p'}>
                Корпоративные закупки и партнерство:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📞 +380 (95) 765-43-21
                <br />
                ✉️ corporate@gadget-store.ru
                <br />
                🕒 Пн-Пт: 9:00-18:00
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box textAlign="center">
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Не нашли ответ на свой вопрос?
        </Typography>
        <Typography color="text.secondary" component={'p'}>
          Посмотрите раздел с часто задаваемыми вопросами или напишите нам
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            href="/faq"
            sx={{
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Частые вопросы (FAQ)
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="#top"
            sx={{ px: 4, py: 1.5 }}
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('top')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Написать нам
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
