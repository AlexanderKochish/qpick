'use client'

import { useState } from 'react'

import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Alert,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material'
import {
  Save as SaveIcon,
  Store as StoreIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material'

import styles from './page.module.css'
import AdminLayout from '../layout'

interface StoreSettings {
  name: string
  email: string
  phone: string
  address: string
  currency: string
  timezone: string
  language: string
}

interface PaymentSettings {
  methods: string[]
  currency: string
  testMode: boolean
  autoConfirm: boolean
}

interface ShippingSettings {
  methods: ShippingMethod[]
  freeShippingThreshold: number
  defaultWeight: number
}

interface ShippingMethod {
  id: string
  name: string
  cost: number
  enabled: boolean
  estimatedDays: number
}

interface NotificationSettings {
  email: {
    orders: boolean
    products: boolean
    promotions: boolean
    security: boolean
  }
  push: {
    orders: boolean
    products: boolean
    promotions: boolean
  }
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordPolicy: string
  loginAttempts: number
}

interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  secondaryColor: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    name: 'TechStore Pro',
    email: 'admin@techstore.ru',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Тверская, д. 1',
    currency: 'RUB',
    timezone: 'Europe/Moscow',
    language: 'ru',
  })

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    methods: ['card', 'apple-pay', 'google-pay', 'yoomoney'],
    currency: 'RUB',
    testMode: true,
    autoConfirm: false,
  })

  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>({
    methods: [
      {
        id: 'courier',
        name: 'Курьерская доставка',
        cost: 500,
        enabled: true,
        estimatedDays: 1,
      },
      {
        id: 'pickup',
        name: 'Самовывоз',
        cost: 0,
        enabled: true,
        estimatedDays: 0,
      },
      {
        id: 'post',
        name: 'Почта России',
        cost: 300,
        enabled: false,
        estimatedDays: 7,
      },
      {
        id: 'express',
        name: 'Экспресс-доставка',
        cost: 1000,
        enabled: true,
        estimatedDays: 1,
      },
    ],
    freeShippingThreshold: 5000,
    defaultWeight: 1,
  })

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      email: {
        orders: true,
        products: true,
        promotions: false,
        security: true,
      },
      push: {
        orders: true,
        products: false,
        promotions: true,
      },
    })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 60,
    passwordPolicy: 'strong',
    loginAttempts: 5,
  })

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    mode: 'light',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
  })

  const handleSaveSettings = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const toggleShippingMethod = (methodId: string) => {
    setShippingSettings((prev) => ({
      ...prev,
      methods: prev.methods.map((method) =>
        method.id === methodId
          ? { ...method, enabled: !method.enabled }
          : method
      ),
    }))
  }

  const toggleNotification = (type: 'email' | 'push', setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: !prev[type][setting as keyof (typeof prev)[typeof type]],
      },
    }))
  }

  const tabs = [
    { label: 'Магазин', icon: <StoreIcon /> },
    { label: 'Платежи', icon: <PaymentIcon /> },
    { label: 'Доставка', icon: <ShippingIcon /> },
    { label: 'Уведомления', icon: <NotificationsIcon /> },
    { label: 'Безопасность', icon: <SecurityIcon /> },
    { label: 'Внешний вид', icon: <PaletteIcon /> },
  ]

  return (
    <AdminLayout>
      <Box className={styles.settingsContainer}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Настройки системы
          </Typography>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            disabled={saving}
            className={styles.saveButton}
          >
            {saving ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </Box>

        {saveSuccess && (
          <Alert severity="success" className={styles.alert}>
            Настройки успешно сохранены!
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={3}>
            <Paper className={styles.sidebar}>
              <List component="nav">
                {tabs.map((tab, index) => (
                  <ListItem
                    key={tab.label}
                    onClick={() => setActiveTab(index)}
                    className={`${styles.navItem} ${activeTab === index ? styles.navItemSelected : ''}`}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '8px',
                      margin: '4px 8px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor:
                          activeTab === index ? 'transparent' : '#f5f7fa',
                      },
                    }}
                  >
                    <ListItemIcon className={styles.navIcon}>
                      {tab.icon}
                    </ListItemIcon>
                    <ListItemText primary={tab.label} />
                  </ListItem>
                ))}
              </List>

              <Box className={styles.quickStats}>
                <Divider />
                <Typography variant="subtitle2" className={styles.statsTitle}>
                  Быстрая статистика
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Активные платежные методы" />
                    <Chip label={paymentSettings.methods.length} size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Способы доставки" />
                    <Chip
                      label={
                        shippingSettings.methods.filter((m) => m.enabled).length
                      }
                      size="small"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Уведомления Email" />
                    <Chip
                      label={
                        Object.values(notificationSettings.email).filter(
                          Boolean
                        ).length
                      }
                      size="small"
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>

          <Grid size={9}>
            <Paper className={styles.content}>
              {activeTab === 0 && (
                <Box className={styles.tabContent}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.tabTitle}
                  >
                    <StoreIcon className={styles.tabIcon} />
                    Настройки магазина
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={7}>
                      <TextField
                        label="Название магазина"
                        value={storeSettings.name}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={7}>
                      <TextField
                        label="Контактный email"
                        type="email"
                        value={storeSettings.email}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={8}>
                      <TextField
                        label="Телефон"
                        value={storeSettings.phone}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid size={8}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Валюта</InputLabel>
                        <Select
                          value={storeSettings.currency}
                          label="Валюта"
                          onChange={(e) =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              currency: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="RUB">Рубль (RUB)</MenuItem>
                          <MenuItem value="USD">Доллар (USD)</MenuItem>
                          <MenuItem value="EUR">Евро (EUR)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={8}>
                      <TextField
                        label="Адрес магазина"
                        value={storeSettings.address}
                        onChange={(e) =>
                          setStoreSettings((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        fullWidth
                        margin="normal"
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid size={8}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Часовой пояс</InputLabel>
                        <Select
                          value={storeSettings.timezone}
                          label="Часовой пояс"
                          onChange={(e) =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              timezone: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="Europe/Moscow">
                            Москва (UTC+3)
                          </MenuItem>
                          <MenuItem value="Europe/London">
                            Лондон (UTC+0)
                          </MenuItem>
                          <MenuItem value="America/New_York">
                            Нью-Йорк (UTC-5)
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={8}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Язык</InputLabel>
                        <Select
                          value={storeSettings.language}
                          label="Язык"
                          onChange={(e) =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              language: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="ru">Русский</MenuItem>
                          <MenuItem value="en">English</MenuItem>
                          <MenuItem value="de">Deutsch</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 1 && (
                <Box className={styles.tabContent}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.tabTitle}
                  >
                    <PaymentIcon className={styles.tabIcon} />
                    Настройки платежей
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={8}>
                      <FormLabel component="legend">Платежные методы</FormLabel>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        {[
                          { value: 'card', label: 'Банковские карты' },
                          { value: 'apple-pay', label: 'Apple Pay' },
                          { value: 'google-pay', label: 'Google Pay' },
                          { value: 'yoomoney', label: 'ЮMoney' },
                          { value: 'sberpay', label: 'СберПэй' },
                          { value: 'qiwi', label: 'QIWI' },
                        ].map((method) => (
                          <Grid size={8} key={method.value}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={paymentSettings.methods.includes(
                                    method.value
                                  )}
                                  onChange={(e) => {
                                    const newMethods = e.target.checked
                                      ? [
                                          ...paymentSettings.methods,
                                          method.value,
                                        ]
                                      : paymentSettings.methods.filter(
                                          (m) => m !== method.value
                                        )
                                    setPaymentSettings((prev) => ({
                                      ...prev,
                                      methods: newMethods,
                                    }))
                                  }}
                                />
                              }
                              label={method.label}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    <Grid size={8}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={paymentSettings.testMode}
                            onChange={(e) =>
                              setPaymentSettings((prev) => ({
                                ...prev,
                                testMode: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Тестовый режим"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Включите для тестирования платежей без реальных списаний
                      </Typography>
                    </Grid>

                    <Grid size={8}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={paymentSettings.autoConfirm}
                            onChange={(e) =>
                              setPaymentSettings((prev) => ({
                                ...prev,
                                autoConfirm: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Автоподтверждение платежей"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Автоматически подтверждать успешные платежи
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 2 && (
                <Box className={styles.tabContent}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.tabTitle}
                  >
                    <ShippingIcon className={styles.tabIcon} />
                    Настройки доставки
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={8}>
                      <Typography variant="h6" gutterBottom>
                        Способы доставки
                      </Typography>
                      {shippingSettings.methods.map((method) => (
                        <Card key={method.id} className={styles.shippingMethod}>
                          <CardContent>
                            <Box className={styles.shippingHeader}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={method.enabled}
                                    onChange={() =>
                                      toggleShippingMethod(method.id)
                                    }
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="subtitle1">
                                      {method.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Срок: {method.estimatedDays} дн. •
                                      Стоимость:{' '}
                                      {method.cost === 0
                                        ? 'Бесплатно'
                                        : `${method.cost} ₽`}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Grid>

                    <Grid size={8}>
                      <TextField
                        label="Порог бесплатной доставки (₽)"
                        type="number"
                        value={shippingSettings.freeShippingThreshold}
                        onChange={(e) =>
                          setShippingSettings((prev) => ({
                            ...prev,
                            freeShippingThreshold: Number(e.target.value),
                          }))
                        }
                        fullWidth
                        margin="normal"
                        helperText="Сумма заказа, при которой доставка становится бесплатной"
                      />
                    </Grid>

                    <Grid size={8}>
                      <TextField
                        label="Вес по умолчанию (кг)"
                        type="number"
                        value={shippingSettings.defaultWeight}
                        onChange={(e) =>
                          setShippingSettings((prev) => ({
                            ...prev,
                            defaultWeight: Number(e.target.value),
                          }))
                        }
                        fullWidth
                        margin="normal"
                        helperText="Используется если вес товара не указан"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 3 && (
                <Box className={styles.tabContent}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.tabTitle}
                  >
                    <NotificationsIcon className={styles.tabIcon} />
                    Настройки уведомлений
                  </Typography>

                  <Grid container spacing={4}>
                    <Grid size={8}>
                      <Typography variant="h6" gutterBottom>
                        <EmailIcon sx={{ mr: 1 }} />
                        Email уведомления
                      </Typography>
                      {Object.entries(notificationSettings.email).map(
                        ([key, value]) => (
                          <FormControlLabel
                            key={key}
                            control={
                              <Switch
                                checked={value}
                                onChange={() =>
                                  toggleNotification('email', key)
                                }
                              />
                            }
                            label={getNotificationLabel(key)}
                            sx={{ display: 'block', mb: 2 }}
                          />
                        )
                      )}
                    </Grid>

                    <Grid size={8}>
                      <Typography variant="h6" gutterBottom>
                        Push уведомления
                      </Typography>
                      {Object.entries(notificationSettings.push).map(
                        ([key, value]) => (
                          <FormControlLabel
                            key={key}
                            control={
                              <Switch
                                checked={value}
                                onChange={() => toggleNotification('push', key)}
                              />
                            }
                            label={getNotificationLabel(key)}
                            sx={{ display: 'block', mb: 2 }}
                          />
                        )
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 4 && (
                <Box className={styles.tabContent}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.tabTitle}
                  >
                    <SecurityIcon className={styles.tabIcon} />
                    Настройки безопасности
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={8}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={securitySettings.twoFactorAuth}
                            onChange={(e) =>
                              setSecuritySettings((prev) => ({
                                ...prev,
                                twoFactorAuth: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Двухфакторная аутентификация"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Требовать подтверждение входа через email или приложение
                      </Typography>
                    </Grid>

                    <Grid size={8}>
                      <TextField
                        label="Таймаут сессии (минуты)"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            sessionTimeout: Number(e.target.value),
                          }))
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>

                    <Grid size={8}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Политика паролей</InputLabel>
                        <Select
                          value={securitySettings.passwordPolicy}
                          label="Политика паролей"
                          onChange={(e) =>
                            setSecuritySettings((prev) => ({
                              ...prev,
                              passwordPolicy: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="basic">Базовая</MenuItem>
                          <MenuItem value="medium">Средняя</MenuItem>
                          <MenuItem value="strong">Строгая</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid size={8}>
                      <TextField
                        label="Максимум попыток входа"
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            loginAttempts: Number(e.target.value),
                          }))
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 5 && (
                <Box className={styles.tabContent}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.tabTitle}
                  >
                    <PaletteIcon className={styles.tabIcon} />
                    Настройки внешнего вида
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={8}>
                      <FormLabel component="legend">Тема оформления</FormLabel>
                      <RadioGroup
                        value={themeSettings.mode}
                        onChange={(e) =>
                          setThemeSettings((prev) => ({
                            ...prev,
                            mode: e.target.value as 'light' | 'dark' | 'auto',
                          }))
                        }
                        row
                        sx={{ mt: 1 }}
                      >
                        <FormControlLabel
                          value="light"
                          control={<Radio />}
                          label="Светлая"
                        />
                        <FormControlLabel
                          value="dark"
                          control={<Radio />}
                          label="Темная"
                        />
                        <FormControlLabel
                          value="auto"
                          control={<Radio />}
                          label="Авто"
                        />
                      </RadioGroup>
                    </Grid>

                    <Grid size={8}>
                      <TextField
                        label="Основной цвет"
                        type="color"
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        fullWidth
                        margin="normal"
                        InputProps={{
                          style: {
                            height: '56px',
                            borderRadius: '4px',
                          },
                          startAdornment: (
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: themeSettings.primaryColor,
                                borderRadius: 1,
                                mr: 1,
                                border: '1px solid #ccc',
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid size={8}>
                      <TextField
                        label="Дополнительный цвет"
                        type="color"
                        value={themeSettings.secondaryColor}
                        onChange={(e) =>
                          setThemeSettings((prev) => ({
                            ...prev,
                            secondaryColor: e.target.value,
                          }))
                        }
                        fullWidth
                        margin="normal"
                        InputProps={{
                          style: {
                            height: '56px',
                            borderRadius: '4px',
                          },
                          startAdornment: (
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: themeSettings.secondaryColor,
                                borderRadius: 1,
                                mr: 1,
                                border: '1px solid #ccc',
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

function getNotificationLabel(key: string): string {
  const labels: { [key: string]: string } = {
    orders: 'Новые заказы',
    products: 'Изменения в товарах',
    promotions: 'Акции и скидки',
    security: 'События безопасности',
  }
  return labels[key] || key
}
