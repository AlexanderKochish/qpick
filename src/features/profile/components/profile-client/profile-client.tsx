'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Avatar as MuiAvatar,
  Button,
  Grid,
  Tab,
  Tabs,
  Chip,
} from '@mui/material'
import {
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  ShoppingBag as OrderIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import s from './profile-client.module.css'
import { UserProfile } from '@/features/profile/types/types'
import ProfileInfo from '../profile-info/profile-info'
import AddressSection from '../profile-address/profile-address'
import OrdersSection from '../profile-orders/profile-orders'
import ReviewsSection from '../profile-reviews/profile-reviews'

export default function ProfileClient() {
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  const userData: UserProfile = {
    id: '1',
    email: 'user@example.com',
    name: 'Иван Иванов',
    emailVerified: new Date(),
    role: 'USER',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    avatar: {
      url: '/api/placeholder/150/150',
    },
    orders: [
      {
        id: '1',
        status: 'completed',
        total: 12500,
        createdAt: new Date('2024-03-01'),
      },
      {
        id: '2',
        status: 'processing',
        total: 8900,
        createdAt: new Date('2024-03-02'),
      },
    ],
    ratings: [
      {
        id: '1',
        value: 5,
        product: { name: 'iPhone 15 Pro' },
        createdAt: new Date('2024-02-15'),
      },
      {
        id: '2',
        value: 4,
        product: { name: 'MacBook Air' },
        createdAt: new Date('2024-02-10'),
      },
    ],
    reviews: [
      {
        id: '1',
        title: 'Отличный товар!',
        product: { name: 'iPhone 15 Pro' },
        createdAt: new Date('2024-02-15'),
      },
    ],
    address: [
      {
        id: '1',
        street: 'ул. Пушкина, д. 10',
        city: 'Москва',
        zipCode: '101000',
        isDefault: true,
      },
    ],
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box className={s.profileContainer}>
      <Typography variant="h4" gutterBottom className={s.title}>
        Мой профиль
      </Typography>

      <Grid container spacing={3}>
        <Grid size={4}>
          <Paper className={s.sidebar}>
            <Box className={s.avatarSection}>
              <MuiAvatar
                src={userData.avatar?.url}
                sx={{ width: 120, height: 120 }}
                className={s.avatar}
              >
                {userData.name?.charAt(0)}
              </MuiAvatar>
              <Typography variant="h6" className={s.userName}>
                {userData.name}
              </Typography>
              <Chip
                label={userData.role}
                color="primary"
                size="small"
                className={s.roleChip}
              />
            </Box>

            <Box className={s.stats}>
              <Box className={s.statItem}>
                <OrderIcon color="primary" />
                <Typography variant="body2">
                  Заказы: {userData.orders.length}
                </Typography>
              </Box>
              <Box className={s.statItem}>
                <StarIcon color="warning" />
                <Typography variant="body2">
                  Оценки: {userData.ratings.length}
                </Typography>
              </Box>
              <Box className={s.statItem}>
                <FavoriteIcon color="error" />
                <Typography variant="body2">
                  Отзывы: {userData.reviews.length}
                </Typography>
              </Box>
            </Box>

            <Box className={s.infoSection}>
              <Typography variant="subtitle2" color="text.secondary">
                Email: {userData.email}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Дата регистрации: {userData.createdAt.toLocaleDateString()}
              </Typography>
              <Chip
                label={userData.isActive ? 'Активен' : 'Неактивен'}
                color={userData.isActive ? 'success' : 'default'}
                size="small"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={8}>
          <Paper className={s.content}>
            <Box className={s.tabsHeader}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className={s.tabs}
              >
                <Tab label="Основная информация" />
                <Tab label="Адреса" />
                <Tab label="Заказы" />
                <Tab label="Отзывы и оценки" />
              </Tabs>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                className={s.editButton}
              >
                {isEditing ? 'Сохранить' : 'Редактировать'}
              </Button>
            </Box>

            <Box className={s.tabContent}>
              {activeTab === 0 && (
                <ProfileInfo user={userData} isEditing={isEditing} />
              )}
              {activeTab === 1 && (
                <AddressSection addresses={userData.address} />
              )}
              {activeTab === 2 && <OrdersSection orders={userData.orders} />}
              {activeTab === 3 && (
                <ReviewsSection
                  ratings={userData.ratings}
                  reviews={userData.reviews}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
