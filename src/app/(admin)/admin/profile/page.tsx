'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material'
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
  AdminPanelSettings as AdminIcon,
  VerifiedUser as VerifiedIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material'
import styles from './page.module.css'
import AdminLayout from '../layout'

interface AdminProfile {
  id: string
  name: string
  email: string
  phone: string
  role: string
  avatar?: string
  isActive: boolean
  emailVerified: boolean
  twoFactorEnabled: boolean
  lastLogin: Date
  createdAt: Date
  permissions: string[]
}

interface ActivityLog {
  id: string
  action: string
  description: string
  timestamp: Date
  ipAddress: string
}

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [profile, setProfile] = useState<AdminProfile>({
    id: 'admin-001',
    name: 'Александр Петров',
    email: 'admin@techstore.ru',
    phone: '+7 (999) 123-45-67',
    role: 'Супер администратор',
    avatar: '/api/placeholder/150/150',
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: new Date('2024-03-15T14:30:00'),
    createdAt: new Date('2024-01-01'),
    permissions: [
      'users:read',
      'users:write',
      'products:read',
      'products:write',
      'orders:read',
      'orders:write',
      'analytics:read',
      'settings:write',
    ],
  })

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      action: 'LOGIN',
      description: 'Успешный вход в систему',
      timestamp: new Date('2024-03-15T14:30:00'),
      ipAddress: '192.168.1.100',
    },
    {
      id: '2',
      action: 'USER_UPDATE',
      description: 'Обновлен профиль пользователя ID: user-123',
      timestamp: new Date('2024-03-15T13:15:00'),
      ipAddress: '192.168.1.100',
    },
    {
      id: '3',
      action: 'ORDER_CREATE',
      description: 'Создан новый заказ ORD-005',
      timestamp: new Date('2024-03-15T11:45:00'),
      ipAddress: '192.168.1.100',
    },
    {
      id: '4',
      action: 'PRODUCT_UPDATE',
      description: 'Обновлен товар iPhone 15 Pro',
      timestamp: new Date('2024-03-14T16:20:00'),
      ipAddress: '192.168.1.100',
    },
  ])

  const handleSaveProfile = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSaving(false)
    setSaveSuccess(true)
    setIsEditing(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const toggleTwoFactor = () => {
    setProfile((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }))
  }

  const getPermissionColor = (permission: string) => {
    if (permission.includes('write')) return 'primary'
    if (permission.includes('read')) return 'secondary'
    return 'default'
  }

  const formatPermission = (permission: string) => {
    const [resource, action] = permission.split(':')
    const resourceMap: { [key: string]: string } = {
      users: 'Пользователи',
      products: 'Товары',
      orders: 'Заказы',
      analytics: 'Аналитика',
      settings: 'Настройки',
    }
    const actionMap: { [key: string]: string } = {
      read: 'Просмотр',
      write: 'Редактирование',
    }

    return `${resourceMap[resource] || resource} - ${actionMap[action] || action}`
  }

  return (
    <AdminLayout>
      <Box className={styles.profileContainer}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Профиль администратора
          </Typography>
          <Box className={styles.headerActions}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                >
                  Отмена
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className={styles.saveButton}
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                Редактировать
              </Button>
            )}
          </Box>
        </Box>

        {saveSuccess && (
          <Alert severity="success" className={styles.alert}>
            Профиль успешно обновлен!
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={4}>
            <Paper className={styles.sidebar}>
              <Box className={styles.avatarSection}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 120, height: 120 }}
                  className={styles.avatar}
                >
                  {profile.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" className={styles.userName}>
                  {profile.name}
                </Typography>
                <Chip
                  icon={<AdminIcon />}
                  label={profile.role}
                  color="primary"
                  className={styles.roleChip}
                />
                <Box className={styles.statusChips}>
                  <Chip
                    icon={<VerifiedIcon />}
                    label={profile.isActive ? 'Активен' : 'Неактивен'}
                    color={profile.isActive ? 'success' : 'default'}
                    size="small"
                  />
                  <Chip
                    label={
                      profile.emailVerified
                        ? 'Email подтвержден'
                        : 'Email не подтвержден'
                    }
                    color={profile.emailVerified ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              </Box>

              <Divider />

              <Box className={styles.statsSection}>
                <Typography variant="h6" gutterBottom>
                  Статистика
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Последний вход"
                      secondary={profile.lastLogin.toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Дата регистрации"
                      secondary={profile.createdAt.toLocaleDateString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BadgeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="ID администратора"
                      secondary={profile.id}
                    />
                  </ListItem>
                </List>
              </Box>

              <Divider />

              <Box className={styles.permissionsSection}>
                <Typography variant="h6" gutterBottom>
                  Права доступа
                </Typography>
                <Box className={styles.permissionsList}>
                  {profile.permissions.map((permission, index) => (
                    <Chip
                      key={index}
                      label={formatPermission(permission)}
                      color={getPermissionColor(permission)}
                      size="small"
                      className={styles.permissionChip}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid size={8}>
            <Paper className={styles.content}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className={styles.tabs}
              >
                <Tab label="Основная информация" icon={<PersonIcon />} />
                <Tab label="Безопасность" icon={<SecurityIcon />} />
                <Tab label="Активность" icon={<NotificationsIcon />} />
              </Tabs>

              <Box className={styles.tabContent}>
                {activeTab === 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={styles.sectionTitle}
                    >
                      Личная информация
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={6}>
                        <TextField
                          label="ФИО"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          fullWidth
                          margin="normal"
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          label="Email"
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          fullWidth
                          margin="normal"
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          label="Телефон"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          fullWidth
                          margin="normal"
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          label="Роль"
                          value={profile.role}
                          fullWidth
                          margin="normal"
                          disabled
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      variant="h6"
                      gutterBottom
                      className={styles.sectionTitle}
                      sx={{ mt: 3 }}
                    >
                      Настройки уведомлений
                    </Typography>

                    <Card variant="outlined" className={styles.settingsCard}>
                      <CardContent>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Уведомления о новых заказах"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Уведомления о проблемах с системой"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Еженедельные отчеты по email"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Уведомления о безопасности"
                        />
                      </CardContent>
                    </Card>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={styles.sectionTitle}
                    >
                      Настройки безопасности
                    </Typography>

                    <Card variant="outlined" className={styles.securityCard}>
                      <CardContent>
                        <Box className={styles.securityItem}>
                          <Box className={styles.securityInfo}>
                            <SecurityIcon color="primary" />
                            <Box>
                              <Typography variant="subtitle1">
                                Двухфакторная аутентификация
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Добавьте дополнительный уровень безопасности к
                                вашей учетной записи
                              </Typography>
                            </Box>
                          </Box>
                          <Switch
                            checked={profile.twoFactorEnabled}
                            onChange={toggleTwoFactor}
                            color="primary"
                          />
                        </Box>
                      </CardContent>
                    </Card>

                    <Card
                      variant="outlined"
                      className={styles.securityCard}
                      sx={{ mt: 2 }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Смена пароля
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={4}>
                            <TextField
                              label="Текущий пароль"
                              type="password"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid size={4}>
                            <TextField
                              label="Новый пароль"
                              type="password"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid size={4}>
                            <TextField
                              label="Подтвердите пароль"
                              type="password"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                        </Grid>
                        <Button variant="contained" sx={{ mt: 2 }}>
                          Обновить пароль
                        </Button>
                      </CardContent>
                    </Card>

                    <Card
                      variant="outlined"
                      className={styles.securityCard}
                      sx={{ mt: 2 }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Сеансы входа
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <LocationIcon color="action" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Москва, Россия"
                              secondary={`${profile.lastLogin.toLocaleString()} • Текущая сессия`}
                            />
                            <Chip
                              label="Активна"
                              color="success"
                              size="small"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <LocationIcon color="action" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Санкт-Петербург, Россия"
                              secondary="14 марта 2024, 10:30"
                            />
                            <Button size="small" color="error">
                              Завершить
                            </Button>
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>
                )}

                {activeTab === 2 && (
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={styles.sectionTitle}
                    >
                      История активности
                    </Typography>

                    <List>
                      {activityLogs.map((log) => (
                        <ListItem key={log.id} className={styles.activityItem}>
                          <ListItemIcon>
                            <Avatar
                              sx={{ width: 40, height: 40, bgcolor: '#667eea' }}
                            >
                              <NotificationsIcon />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box className={styles.activityHeader}>
                                <Typography variant="subtitle2">
                                  {log.description}
                                </Typography>
                                <Chip
                                  label={log.action}
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            }
                            secondary={
                              <Box className={styles.activityDetails}>
                                <Typography variant="body2">
                                  {log.timestamp.toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                  IP: {log.ipAddress}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}
