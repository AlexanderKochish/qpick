'use client'
import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material'
import {
  Security,
  Build,
  LocalShipping,
  VerifiedUser,
  ExpandMore,
  CheckCircle,
  Warning,
  Phone,
  Email,
  AccessTime,
  Description,
} from '@mui/icons-material'
import Link from 'next/link'

export default function GuaranteePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Chip
          icon={<VerifiedUser />}
          label="Официальная гарантия"
          color="primary"
          sx={{ mb: 2, px: 2, py: 1, fontSize: '1rem' }}
        />
        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
          Гарантия и сервис
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Мы гарантируем качество каждой покупки и обеспечиваем полную поддержку
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid #1976d2' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Security sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                24 месяца гарантии
              </Typography>
              <Typography color="text.secondary">
                На все устройства предоставляется официальная гарантия
                производителя сроком на 2 года
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid #2e7d32' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Build sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Авторизованный сервис
              </Typography>
              <Typography color="text.secondary">
                Обслуживание осуществляется в официальных сервисных центрах
                производителей
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid #ed6c02' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <LocalShipping sx={{ fontSize: 60, color: '#ed6c02', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Бесплатный ремонт
              </Typography>
              <Typography color="text.secondary">
                В случае гарантийного случая ремонт осуществляется бесплатно в
                течение 14 дней
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography fontWeight={600}>
          Гарантия активируется автоматически при покупке товара. Сохраняйте чек
          и гарантийный талон!
        </Typography>
      </Alert>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Что покрывает гарантия?
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">
                  <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Гарантийные случаи
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Заводские дефекты" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Выход из строя компонентов" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Неисправности ПО" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Проблемы с аккумулятором" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="error.main">
                  <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Не гарантийные случаи
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Механические повреждения" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Попадание жидкости" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Неправильная эксплуатация" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Вмешательство в конструкцию" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Часто задаваемые вопросы
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Как активируется гарантия?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Гарантия активируется автоматически при покупке товара. Для
              подтверждения необходимо предоставить кассовый чек или гарантийный
              талон. Дата начала гарантии - день покупки.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Что делать если устройство сломалось?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Свяжитесь с нами по телефону или через онлайн-чат
              <br />
              2. Предоставьте данные о покупке и описание проблемы
              <br />
              3. Отправьте устройство в сервисный центр (бесплатный выезд
              курьера)
              <br />
              4. Получите отремонтированное устройство в течение 14 дней
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Можно ли продлить гарантию?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Да, вы можете продлить гарантию на дополнительный год. Стоимость
              продления составляет 10% от стоимости товара. Обратитесь в наш
              сервисный центр для оформления расширенной гарантии.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Распространяется ли гарантия на аксессуары?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              На оригинальные аксессуары (зарядные устройства, наушники, чехлы)
              предоставляется гарантия 12 месяцев. На неоригинальные аксессуары
              - 6 месяцев.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Процесс гарантийного ремонта
        </Typography>
        <Grid container spacing={3} mt={2}>
          {[
            {
              step: 1,
              title: 'Заявка',
              description: 'Оставьте заявку онлайн или по телефону',
            },
            {
              step: 2,
              title: 'Диагностика',
              description: 'Бесплатная диагностика в течение 1-2 дней',
            },
            {
              step: 3,
              title: 'Ремонт',
              description: 'Бесплатный ремонт в течение 14 дней',
            },
            {
              step: 4,
              title: 'Возврат',
              description: 'Доставка отремонтированного устройства',
            },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.step}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  minHeight: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 15,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  {item.step}
                </Box>
                <Typography variant="h6" mt={5} mb={2} fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card
        sx={{ mb: 6, bgcolor: 'primary.light', color: 'primary.contrastText' }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Контакты сервисного центра
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Phone sx={{ mr: 2 }} />
                <div>
                  <Typography variant="body2">Телефон</Typography>
                  <Typography variant="h6">8 (800) 555-35-35</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Email sx={{ mr: 2 }} />
                <div>
                  <Typography variant="body2">Email</Typography>
                  <Typography variant="h6">service@gadget-store.ua</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AccessTime sx={{ mr: 2 }} />
                <div>
                  <Typography variant="body2">Режим работы</Typography>
                  <Typography variant="h6">Пн-Пт: 9:00-20:00</Typography>
                </div>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        justifyContent="center"
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<Description />}
          component={Link}
          href="/documents/warranty-terms.pdf"
          sx={{ px: 4, py: 1.5 }}
        >
          Скачать условия гарантии (PDF)
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Phone />}
          component={Link}
          href="/contact"
          sx={{ px: 4, py: 1.5 }}
        >
          Связаться с поддержкой
        </Button>
      </Box>

      <Box mt={6} pt={4} borderTop={1} borderColor="divider">
        <Typography variant="body2" color="text.secondary" align="center">
          * Гарантийные условия могут отличаться для разных производителей.
          Подробности уточняйте при покупке.
          <br />
          ** Сроки ремонта указаны ориентировочно и могут меняться в зависимости
          от сложности случая и наличия запчастей.
          <br />© {new Date().getFullYear()} TechDevices. Все права защищены.
        </Typography>
      </Box>
    </Container>
  )
}
