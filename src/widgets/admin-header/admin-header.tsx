'use client'

import { useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import styles from './admin-header.module.css'
import Link from 'next/link'

export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={styles.headerContainer}>
      <Typography
        variant="h6"
        component="div"
        className={styles.title}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Административная панель
      </Typography>

      <Box className={styles.headerActions}>
        <IconButton color="inherit" className={styles.iconButton}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          onClick={handleProfileMenuOpen}
          color="inherit"
          className={styles.avatarButton}
        >
          <Avatar
            sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}
            src="/api/placeholder/32/32"
          >
            <AccountCircle />
          </Avatar>
          {!isMobile && (
            <Typography variant="body2" sx={{ ml: 1 }}>
              Администратор
            </Typography>
          )}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.profileMenu}
        >
          <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
            <AccountCircle sx={{ mr: 2 }} />
            <Link href={'/admin/profile'}>Профиль</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
            <SettingsIcon sx={{ mr: 2 }} />
            <Link href={'/admin/settings'}>Настройки</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
            <LogoutIcon sx={{ mr: 2 }} />
            Выйти
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
