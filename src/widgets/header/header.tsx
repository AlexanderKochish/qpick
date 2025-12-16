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
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Search,
  ShoppingCart,
  Person,
  CategoryOutlined,
  Close,
  Phone,
  Menu as MenuIcon,
  Email,
  LocationOn,
  Smartphone,
  Laptop,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import s from './header.module.css'
import { useCategory } from '@/features/category/hooks/useCategory'
import { useSearch } from '@/shared/hooks/use-search'
import { logout } from '@/features/profile/actions/actions'
import { useCart } from '@/features/cart/hooks/useCart'

interface Props {
  isLogged: boolean
}

export default function Header({ isLogged }: Props) {
  const { cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(
    null
  )
  const router = useRouter()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const { search, setSearch } = useSearch()

  const { data: categories } = useCategory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleLogout = () => {
    logout()
    setUserMenuAnchor(null)
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
    <Box className={s.drawer}>
      <Box className={s.drawerHeader}>
        <Typography variant="h6" className={s.drawerTitle}>
          TechDevices
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem onClick={() => router.push('/')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem onClick={handleCategoriesOpen}>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem onClick={() => router.push('/products')}>
          <ListItemText primary="All products" />
        </ListItem>
        <ListItem onClick={() => router.push('/about')}>
          <ListItemText primary="About us" />
        </ListItem>
        <ListItem onClick={() => router.push('/contacts')}>
          <ListItemText primary="Contacts" />
        </ListItem>
        <Divider sx={{ my: 3 }} />
        {/* <ListItem onClick={() => router.push('/')}>
          <ListItemText primary="Акции" />
        </ListItem> */}
        <ListItem onClick={() => router.push('/delivery')}>
          <ListItemText primary="Delivery" />
        </ListItem>
        <ListItem onClick={() => router.push('/guarantee')}>
          <ListItemText primary="Guarantee" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <Box className={s.topBar}>
        <Container maxWidth="xl">
          <Box className={s.topBarContent}>
            <Box className={s.contactInfo}>
              <Box className={s.contactItem}>
                <Phone className={s.contactIcon} />
                <Typography variant="body2">
                  <a href="tel:+380981111111">+38 (098) 111 11 11</a>
                </Typography>
              </Box>
              <Box className={s.contactItem}>
                <Email className={s.contactIcon} />
                <Typography variant="body2">
                  <a href="mailto:info@techdevices.ua">info@techdevices.ua</a>
                </Typography>
              </Box>
              <Box className={s.contactItem}>
                <LocationOn className={s.contactIcon} />
                <Typography variant="body2">
                  Kyiv, st. Shevchenka, 15
                </Typography>
              </Box>
            </Box>
            <Box className={s.topBarActions}>
              {/* <Button className={s.topBarButton}>Акции</Button> */}
              <Button className={s.topBarButton}>
                <Link href="/delivery">Delivery</Link>
              </Button>
              <Button className={s.topBarButton}>
                <Link href="/guarantee">Guarantee</Link>
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <AppBar position="sticky" className={s.appBar}>
        <Container maxWidth="xl">
          <Toolbar className={s.toolbar}>
            <Box className={s.firstSection}>
              <Box className={s.logoSection}>
                <Link href="/" className={s.logoLink}>
                  <Box className={s.logo}>
                    <Smartphone className={s.logoIcon} />
                    <Typography variant="h5" className={s.logoText}>
                      TechDevices
                    </Typography>
                  </Box>
                </Link>
              </Box>

              <Box className={s.categoriesSection}>
                <Button
                  className={s.categoriesButton}
                  onMouseEnter={handleCategoriesOpen}
                >
                  <CategoryOutlined className={s.categoriesIcon} />
                  {isSmall ? '' : 'Categories'}
                </Button>
              </Box>

              <Box className={s.searchSection}>
                <Box className={s.searchContainer}>
                  <Search className={s.searchIcon} />
                  <InputBase
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className={s.searchInput}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={s.actionsSection}>
              <IconButton
                className={s.actionButton}
                onClick={() => router.push('/cart')}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCart className={s.actionIcon} />
                </Badge>
              </IconButton>

              <IconButton
                className={s.actionButton}
                onClick={handleUserMenuOpen}
              >
                <Person className={s.actionIcon} />
              </IconButton>

              <IconButton
                className={s.mobileMenuButton}
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
        className={s.categoriesMenu}
        disableScrollLock={true}
        slotProps={{
          list: {
            onMouseLeave: handleCategoriesClose,
            className: s.categoriesMenuList,
          },
        }}
      >
        {categories?.map((category) => (
          <MenuItem
            key={category.name}
            onClick={handleCategoriesClose}
            className={s.categoryItem}
          >
            <Box className={s.categoryContent}>
              <Link href={`/category/${category.name}/${category.id}`}>
                <Box className={s.categoryInfo}>
                  {category.name === 'smartphones' && <Smartphone />}
                  {category.name === 'laptops' && <Laptop />}
                  <Typography className={s.categoryName}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </Typography>
                </Box>
              </Link>
              <Chip
                label={category._count.products}
                size="small"
                className={s.categoryCount}
              />
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleCategoriesClose} className={s.allCategories}>
          <Link href={'/'}>
            <Typography>All categories</Typography>
          </Link>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        className={s.userMenu}
        disableScrollLock={true}
      >
        {isLogged
          ? [
              <MenuItem key="profile" onClick={handleUserMenuClose}>
                <Link href={'/profile'}>My profile</Link>
              </MenuItem>,
              // <MenuItem key="orders" onClick={handleUserMenuClose}>
              //   Мои заказы
              // </MenuItem>,
              <MenuItem key="favorites" onClick={handleUserMenuClose}>
                <Link href={'/favorites'}>Favorites</Link>
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="login"
                onClick={() => router.push('/auth/sign-in')}
              >
                Login
              </MenuItem>,
              <MenuItem
                key="register"
                onClick={() => router.push('/auth/sign-up')}
              >
                Register
              </MenuItem>,
            ]}
      </Menu>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className={s.mobileDrawer}
      >
        {drawer}
      </Drawer>
    </>
  )
}
