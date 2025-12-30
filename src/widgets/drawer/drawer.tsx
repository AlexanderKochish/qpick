import { Close } from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import s from './drawer.module.css'

interface Props {
  setMobileOpen: (open: boolean) => void
  onOpenDrawer: () => void
  onOpenCategory: (event: React.MouseEvent<HTMLElement>) => void
}

const list = [
  { id: crypto.randomUUID(), primary: 'Home', link: '/' },
  { id: crypto.randomUUID(), primary: 'Categories', link: '' },
  { id: crypto.randomUUID(), primary: 'All products', link: '/' },
  { id: crypto.randomUUID(), primary: 'About us', link: '/about' },
  { id: crypto.randomUUID(), primary: 'Contacts', link: '/contacts' },
  { id: crypto.randomUUID(), primary: 'Delivery', link: '/delivery' },
  { id: crypto.randomUUID(), primary: 'Guarantee', link: '/guarantee' },
]

const ShopDrawer = ({ setMobileOpen, onOpenCategory, onOpenDrawer }: Props) => {
  const router = useRouter()
  const handleRoute = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  return (
    <Box className={s.drawer}>
      <Box className={s.drawerHeader}>
        <Typography variant="h6" className={s.drawerTitle}>
          TechDevices
        </Typography>
        <IconButton onClick={onOpenDrawer}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {list.map((item, index) => {
          const isContacts = item.link === '/contacts'
          const isCategory = item.primary.toLowerCase() === 'categories'
          return (
            <React.Fragment key={item.id}>
              <ListItem
                onClick={
                  isCategory ? onOpenCategory : () => handleRoute(item.link)
                }
              >
                <ListItemText primary={item.primary} />
              </ListItem>

              {isContacts && index < list.length - 1 && (
                <Divider sx={{ my: 3 }} />
              )}
            </React.Fragment>
          )
        })}
      </List>
    </Box>
  )
}

export default ShopDrawer
