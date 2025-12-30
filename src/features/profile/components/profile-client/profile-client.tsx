'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Avatar as MuiAvatar,
  Grid,
  Tab,
  Tabs,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  InfoOutlined,
  LocationOnOutlined,
  ShoppingBagOutlined,
  RateReviewOutlined,
} from '@mui/icons-material'
import {
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  ShoppingBag as OrderIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import s from './profile-client.module.css'
import ProfileInfo from '../profile-info/profile-info'
import AddressSection from '../profile-address/profile-address'
import OrdersSection from '../profile-orders/profile-orders'
import ReviewsSection from '../profile-reviews/profile-reviews'
import { Profile } from '../../types/types'

interface Props {
  profileData: Profile
}

export default function ProfileClient({ profileData }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('lg'))

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box className={s.profileContainer}>
      <Typography variant="h4" gutterBottom className={s.title}>
        My Profile
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'center', marginBottom: 2 }}
      >
        <Grid size={{ xs: 12, md: 10, lg: 4 }}>
          <Paper className={s.sidebar}>
            <Box className={s.avatarSection}>
              <MuiAvatar
                src={profileData.image || undefined}
                sx={{ width: 120, height: 120 }}
                className={s.avatar}
              >
                {profileData.name?.charAt(0)}
              </MuiAvatar>
              <Typography variant="h6" className={s.userName}>
                {profileData.name}
              </Typography>
              <Chip
                label={profileData.role}
                color="primary"
                size="small"
                className={s.roleChip}
              />
            </Box>

            <Box className={s.stats}>
              <Box className={s.statItem}>
                <OrderIcon color="primary" />
                <Typography variant="body2">
                  Orders: {profileData.orders.length}
                </Typography>
              </Box>
              <Box className={s.statItem}>
                <StarIcon color="warning" />
                <Typography variant="body2">
                  Ratings: {profileData.ratings.length}
                </Typography>
              </Box>
              <Box className={s.statItem}>
                <FavoriteIcon color="error" />
                <Typography variant="body2">
                  Reviews: {profileData.reviews.length}
                </Typography>
              </Box>
            </Box>

            <Box className={s.infoSection}>
              <Typography variant="subtitle2" color="text.secondary">
                Email: {profileData.email}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Date of registration:{' '}
                {profileData.createdAt.toLocaleDateString()}
              </Typography>
              <Chip
                label={profileData.isActive ? 'Active' : 'Inactive'}
                color={profileData.isActive ? 'success' : 'default'}
                size="small"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ lg: 8, xs: 12, md: 10 }}>
          <Paper className={s.content}>
            <Box className={s.tabsHeader}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className={s.tabs}
              >
                <Tab
                  icon={<InfoOutlined />}
                  label={isSmall ? null : 'Basic information'}
                />
                <Tab
                  icon={<LocationOnOutlined />}
                  label={isSmall ? null : 'Addresses'}
                />
                <Tab
                  icon={<ShoppingBagOutlined />}
                  label={isSmall ? null : 'Orders'}
                />
                <Tab
                  icon={<RateReviewOutlined />}
                  label={isSmall ? null : 'Reviews and Ratings'}
                />
              </Tabs>
            </Box>

            <Box className={s.tabContent}>
              {activeTab === 0 && (
                <ProfileInfo user={profileData} isEditing={isEditing} />
              )}
              {activeTab === 1 && (
                <AddressSection addresses={profileData.address} />
              )}
              {activeTab === 2 && <OrdersSection orders={profileData.orders} />}
              {activeTab === 3 && (
                <ReviewsSection
                  ratings={profileData.ratings}
                  reviews={profileData.reviews}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
