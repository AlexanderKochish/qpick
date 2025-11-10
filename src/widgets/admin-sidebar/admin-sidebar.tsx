'use client'

import { useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material'
import styles from './admin-sidebar.module.css'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  onItemClick?: () => void
}

interface MenuItem {
  text: string
  icon: React.ReactNode
  path?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    text: 'Дашборд',
    icon: <DashboardIcon />,
    path: '/admin',
  },
  {
    text: 'Пользователи',
    icon: <PeopleIcon />,
    path: '/admin/users',
  },
  {
    text: 'Товары',
    icon: <InventoryIcon />,
    children: [
      { text: 'Все товары', icon: <CategoryIcon />, path: '/admin/products' },
      { text: 'Категории', icon: <CategoryIcon />, path: '/admin/categories' },
    ],
  },
  {
    text: 'Заказы',
    icon: <ReceiptIcon />,
    path: '/admin/orders',
  },
  {
    text: 'Настройки',
    icon: <SettingsIcon />,
    path: '/admin/settings',
  },
]

export default function AdminSidebar({ onItemClick }: SidebarProps) {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})
  const router = useRouter()

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      setOpenItems((prev) => ({
        ...prev,
        [item.text]: !prev[item.text],
      }))
    } else {
      router.push(item.path!)
      onItemClick?.()
    }
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openItems[item.text]

    return (
      <Box key={item.text}>
        <ListItem disablePadding className={styles.listItem}>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            className={styles.listItemButton}
            sx={{
              pl: 6,
              borderRadius: '8px',
              margin: '2px 8px',
            }}
          >
            <ListItemIcon className={styles.listItemIcon}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    )
  }

  return (
    <Box className={styles.sidebarContainer}>
      <Box className={styles.sidebarHeader}>
        <Typography
          variant="h6"
          className={styles.logo}
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 700,
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <Divider className={styles.divider} />

      <List className={styles.list}>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Box>
  )
}
