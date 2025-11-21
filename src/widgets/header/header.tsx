'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material'
import {
  Search,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Close,
  Phone,
  Email,
  LocationOn,
  Smartphone,
  Laptop,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './header.module.css'
import { useCategory } from '@/features/category/hooks/useCategory'
import { useSearch } from '@/shared/hooks/useSearch'

interface Props {
  initCartCount: number
  isLogged: boolean
}

export default function Header({ initCartCount, isLogged }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(
    null
  )
  const router = useRouter()
  const { search, setSearch } = useSearch()

  const { data: categories } = useCategory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleCategoriesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoriesAnchor(event.currentTarget)
  }

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null)
  }

  const drawer = (
    <Box className={styles.drawer}>
      <Box className={styles.drawerHeader}>
        <Typography variant="h6" className={styles.drawerTitle}>
          TechDevices
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem onClick={() => router.push('/')}>
          <ListItemText primary="Главная" />
        </ListItem>
        <ListItem onClick={handleCategoriesOpen}>
          <ListItemText primary="Категории" />
        </ListItem>
        <ListItem onClick={() => router.push('/products')}>
          <ListItemText primary="Все товары" />
        </ListItem>
        <ListItem onClick={() => router.push('/about')}>
          <ListItemText primary="О нас" />
        </ListItem>
        <ListItem onClick={() => router.push('/contact')}>
          <ListItemText primary="Контакты" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <Box className={styles.topBar}>
        <Container maxWidth="xl">
          <Box className={styles.topBarContent}>
            <Box className={styles.contactInfo}>
              <Box className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <Typography variant="body2">+38 (098) 111 11 11</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Email className={styles.contactIcon} />
                <Typography variant="body2">info@techdevices.ua</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <LocationOn className={styles.contactIcon} />
                <Typography variant="body2">Киев, ул. Шевченка, 15</Typography>
              </Box>
            </Box>
            <Box className={styles.topBarActions}>
              <Button className={styles.topBarButton}>Акции</Button>
              <Button className={styles.topBarButton}>Доставка</Button>
              <Button className={styles.topBarButton}>Гарантия</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <AppBar position="sticky" className={styles.appBar}>
        <Container maxWidth="xl">
          <Toolbar className={styles.toolbar}>
            <Box className={styles.firstSection}>
              <Box className={styles.logoSection}>
                <Link href="/" className={styles.logoLink}>
                  <Box className={styles.logo}>
                    <Smartphone className={styles.logoIcon} />
                    <Typography variant="h5" className={styles.logoText}>
                      TechDevices
                    </Typography>
                  </Box>
                </Link>
              </Box>

              <Box className={styles.categoriesSection}>
                <Button
                  className={styles.categoriesButton}
                  onMouseEnter={handleCategoriesOpen}
                >
                  <MenuIcon className={styles.categoriesIcon} />
                  Категории
                </Button>
              </Box>

              <Box className={styles.searchSection}>
                <Box className={styles.searchContainer}>
                  <Search className={styles.searchIcon} />
                  <InputBase
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск смартфонов, ноутбуков, аксессуаров..."
                    className={styles.searchInput}
                  />
                  <Button variant="contained" className={styles.searchButton}>
                    Найти
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className={styles.actionsSection}>
              <IconButton
                className={styles.actionButton}
                onClick={() => router.push('/cart')}
              >
                <Badge badgeContent={initCartCount} color="error">
                  <ShoppingCart className={styles.actionIcon} />
                </Badge>
              </IconButton>

              <IconButton
                className={styles.actionButton}
                onClick={handleUserMenuOpen}
              >
                <Person className={styles.actionIcon} />
              </IconButton>

              <IconButton
                className={styles.mobileMenuButton}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={categoriesAnchor}
        open={Boolean(categoriesAnchor)}
        onClose={handleCategoriesClose}
        onMouseLeave={handleCategoriesClose}
        className={styles.categoriesMenu}
        disableScrollLock={true}
        MenuListProps={{
          onMouseLeave: handleCategoriesClose,
          className: styles.categoriesMenuList,
        }}
      >
        {categories?.map((category) => (
          <MenuItem
            key={category.name}
            onClick={handleCategoriesClose}
            className={styles.categoryItem}
          >
            <Box className={styles.categoryContent}>
              <Link href={`/category/${category.name}/${category.id}`}>
                <Box className={styles.categoryInfo}>
                  {category.name === 'smartphones' && <Smartphone />}
                  {category.name === 'laptops' && <Laptop />}
                  <Typography className={styles.categoryName}>
                    {category.name}
                  </Typography>
                </Box>
              </Link>
              <Chip
                label={category._count.products}
                size="small"
                className={styles.categoryCount}
              />
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={handleCategoriesClose}
          className={styles.allCategories}
        >
          <Link href={'/'}>
            <Typography>Все категории</Typography>
          </Link>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        className={styles.userMenu}
      >
        {isLogged
          ? [
              <MenuItem key="profile" onClick={handleUserMenuClose}>
                <Link href={'/profile'}>Мой профиль</Link>
              </MenuItem>,
              <MenuItem key="orders" onClick={handleUserMenuClose}>
                Мои заказы
              </MenuItem>,
              <MenuItem key="favorites" onClick={handleUserMenuClose}>
                <Link href={'/favorites'}> Избранное</Link>
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem key="logout" onClick={handleUserMenuClose}>
                Выйти
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="login"
                onClick={() => router.push('/auth/sign-in')}
              >
                Войти
              </MenuItem>,
              <MenuItem
                key="register"
                onClick={() => router.push('/auth/sign-up')}
              >
                Зарегистрироваться
              </MenuItem>,
            ]}
      </Menu>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className={styles.mobileDrawer}
      >
        {drawer}
      </Drawer>
    </>
  )
}
