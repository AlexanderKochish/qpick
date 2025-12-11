'use client'
import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  LocalShipping,
  FlashOn,
  Store,
  Place,
  ExpandMore,
  CheckCircle,
  AccessTime,
  Payment,
  Phone,
  Email,
  Map,
  Inventory,
  DoneAll,
} from '@mui/icons-material'
import Link from 'next/link'

export default function DeliveryPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Chip
          icon={<LocalShipping />}
          label="Быстрая доставка"
          color="primary"
          sx={{ mb: 2, px: 2, py: 1, fontSize: '1rem' }}
        />
        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
          Доставка и самовывоз
        </Typography>
        <Typography variant="h5" color="text.secondary" component="p">
          Быстрая и надежная доставка гаджетов по всей Украине
        </Typography>
      </Box>

      <Alert
        severity="info"
        sx={{
          mb: 4,
          borderRadius: 2,
          '& .MuiAlert-icon': { alignItems: 'center' },
        }}
      >
        <Typography fontWeight={600} component="p">
          🚚 Бесплатная доставка при заказе от 10 000 грн
          <br />⚡ Экспресс-доставка в день заказа по Киеву и СПб
        </Typography>
      </Alert>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Способы доставки
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderTop: '4px solid #1976d2' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <LocalShipping sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Курьерская доставка
                </Typography>
                <Typography color="text.secondary" component="p">
                  Доставка до двери в удобное для вас время
                </Typography>
                <Chip
                  label="1-3 дня"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <List dense sx={{ mt: 2, textAlign: 'left' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Бесплатно от 10 000 ₽" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Отслеживание заказа" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Примерка и проверка" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderTop: '4px solid #ed6c02' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <FlashOn sx={{ fontSize: 60, color: '#ed6c02', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Экспресс доставка
                </Typography>
                <Typography color="text.secondary" component="p">
                  Доставка в день заказа в пределах города
                </Typography>
                <Chip
                  label="2-5 часов"
                  color="warning"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <List dense sx={{ mt: 2, textAlign: 'left' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="В день заказа" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Точное время прибытия" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Доступно 24/7" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderTop: '4px solid #2e7d32' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Store sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Самовывоз
                </Typography>
                <Typography color="text.secondary" component="p">
                  Заберите заказ из нашего магазина
                </Typography>
                <Chip
                  label="1-2 часа"
                  color="success"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <List dense sx={{ mt: 2, textAlign: 'left' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Бесплатно" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Консультация специалиста" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Моментальная выдача" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Стоимость доставки
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>
                  <Typography fontWeight={600}>Город</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Стандартная</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Экспресс</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Сроки</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Киев</TableCell>
                <TableCell>Бесплатно*</TableCell>
                <TableCell>300 грн</TableCell>
                <TableCell>1-2 дня / 2-5 часов</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Киев</TableCell>
                <TableCell>Бесплатно*</TableCell>
                <TableCell>400 грн</TableCell>
                <TableCell>1-3 дня / 3-6 часов</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Города-миллионники</TableCell>
                <TableCell>150 грн</TableCell>
                <TableCell>200 грн</TableCell>
                <TableCell>2-4 дня</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Другие города</TableCell>
                <TableCell>100 грн</TableCell>
                <TableCell>200 грн</TableCell>
                <TableCell>3-7 дней</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          * Бесплатная доставка при заказе от 10 000 грн
        </Typography>
      </Box>

      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container alignItems="center" spacing={2} mb={3}>
            <Grid>
              <Place color="primary" sx={{ fontSize: 40 }} />
            </Grid>
            <Grid>
              <Typography variant="h5" fontWeight={600}>
                Пункты самовывоза
              </Typography>
              <Typography color="text.secondary">
                150+ пунктов выдачи по всей Украине
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Киев
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="ул. Шевченко, д. 10"
                    secondary="Ежедневно 10:00-22:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Шевченко пр., д. 25"
                    secondary="Ежедневно 9:00-21:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary='ТРЦ "Гулливер"'
                    secondary="10:00-23:00, без выходных"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Санкт-Петербург
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Шевченко пр., д. 60"
                    secondary="Ежедневно 10:00-22:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary='ТРК "Гулливер"'
                    secondary="10:00-23:00, без выходных"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="ул. Шевченко, д. 12"
                    secondary="Пн-Пт 9:00-21:00, Сб-Вс 10:00-20:00"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            startIcon={<Map />}
            sx={{ mt: 3 }}
            component={Link}
            href="/pickup-points"
          >
            Посмотреть все пункты на карте
          </Button>
        </CardContent>
      </Card>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Частые вопросы о доставке
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Как отследить мой заказ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              После отправки заказа вам на email и SMS придет трекинг-номер. Вы
              можете отслеживать статус доставки в личном кабинете или на сайте
              транспортной компании.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Можно ли изменить адрес доставки после оформления заказа?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Да, вы можете изменить адрес доставки до момента отправки заказа
              со склада. Для этого свяжитесь с нашим менеджером по телефону 8
              (800) 555-35-35 или через онлайн-чат.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Что если меня не будет дома при доставке?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Курьер свяжется с вами за 1-2 часа до прибытия. Если вас не будет,
              доставка будет перенесена на удобное для вас время. Либо вы можете
              забрать заказ в ближайшем пункте выдачи.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Нужно ли оплачивать доставку при возврате?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              При возврате товара надлежащего качества доставку оплачивает
              покупатель. При возврате по гарантии или браку - доставку
              оплачивает магазин.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Как сделать заказ
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              icon: <Inventory color="primary" />,
              title: 'Выберите товар',
              description: 'Добавьте понравившиеся гаджеты в корзину',
            },
            {
              icon: <Payment color="primary" />,
              title: 'Оформите заказ',
              description: 'Заполните данные и выберите способ доставки',
            },
            {
              icon: <DoneAll color="primary" />,
              title: 'Подтверждение',
              description: 'Наш менеджер свяжется для подтверждения',
            },
            {
              icon: <LocalShipping color="primary" />,
              title: 'Получите заказ',
              description: 'Доставка или самовывоз в удобное время',
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box sx={{ fontSize: 40, mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card sx={{ bgcolor: 'grey.50', mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Нужна помощь с доставкой?
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Горячая линия
                  </Typography>
                  <Typography variant="h6">8 (800) 555-35-35</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="h6">delivery@gadget-store.ru</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Режим работы
                  </Typography>
                  <Typography variant="h6">Круглосуточно 24/7</Typography>
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
        mb={6}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<LocalShipping />}
          component={Link}
          href="/cart"
          sx={{ px: 4, py: 1.5 }}
        >
          Перейти к оформлению заказа
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Phone />}
          component={Link}
          href="/contact"
          sx={{ px: 4, py: 1.5 }}
        >
          Задать вопрос о доставке
        </Button>
      </Box>

      <Box pt={4} borderTop={1} borderColor="divider">
        <Typography variant="body2" color="text.secondary" align="center">
          * Сроки доставки указаны ориентировочно и могут меняться в зависимости
          от загруженности транспортных компаний и погодных условий.
          <br />
          ** При заказе на сумму менее 10 000 ₽ стоимость доставки
          рассчитывается автоматически при оформлении заказа.
          <br />
          *** Экспресс-доставка доступна не во всех регионах. Уточняйте
          возможность при оформлении заказа.
          <br />© {new Date().getFullYear()} GadgetStore. Все права защищены.
        </Typography>
      </Box>
    </Container>
  )
}
