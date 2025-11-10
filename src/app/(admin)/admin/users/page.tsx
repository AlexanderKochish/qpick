'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar as MuiAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import styles from './page.module.css'
import AdminLayout from '../layout'

interface User {
  id: string
  email: string
  name: string
  image?: string
  role: string
  isActive: boolean
  emailVerified: Date | null
  createdAt: Date
  orders: { id: string }[]
}

export default function UsersPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const users: User[] = [
    {
      id: '1',
      email: 'admin@shop.com',
      name: 'Администратор Системы',
      role: 'ADMIN',
      isActive: true,
      emailVerified: new Date(),
      createdAt: new Date('2024-01-01'),
      orders: [{ id: '1' }],
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'Иван Иванов',
      role: 'USER',
      isActive: true,
      emailVerified: new Date(),
      createdAt: new Date('2024-01-15'),
      orders: [{ id: '2' }, { id: '3' }],
    },
    {
      id: '3',
      email: 'manager@shop.com',
      name: 'Петр Петров',
      role: 'MANAGER',
      isActive: true,
      emailVerified: new Date(),
      createdAt: new Date('2024-02-01'),
      orders: [{ id: '4' }],
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = () => {
    console.log('Удалить пользователя:', selectedUser?.id)
    setDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'error'
      case 'MANAGER':
        return 'warning'
      default:
        return 'primary'
    }
  }

  return (
    <AdminLayout>
      <Box className={styles.usersContainer}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Управление пользователями
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className={styles.addButton}
          >
            Добавить пользователя
          </Button>
        </Box>

        <Paper className={styles.content}>
          <Box className={styles.toolbar}>
            <TextField
              size="small"
              placeholder="Поиск по имени или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchField}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Box>

          <TableContainer>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Пользователь</TableCell>
                  <TableCell>Роль</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Заказы</TableCell>
                  <TableCell>Дата регистрации</TableCell>
                  <TableCell width="80">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id} className={styles.tableRow}>
                      <TableCell>
                        <Box className={styles.userCell}>
                          <MuiAvatar
                            src={user.image}
                            sx={{ width: 40, height: 40 }}
                            className={styles.avatar}
                          >
                            {user.name.charAt(0)}
                          </MuiAvatar>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              className={styles.userName}
                            >
                              {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={getRoleColor(user.role)}
                          size="small"
                          className={styles.roleChip}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Активен' : 'Заблокирован'}
                          color={user.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.orders.length} заказов
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.createdAt.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, user)}
                          className={styles.menuButton}
                        >
                          <MoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Строк на странице:"
          />
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.actionMenu}
        >
          <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
            <EditIcon sx={{ mr: 2 }} fontSize="small" />
            Редактировать
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
            <BlockIcon sx={{ mr: 2 }} fontSize="small" />
            Заблокировать
          </MenuItem>
          <MenuItem
            onClick={handleDeleteClick}
            className={styles.menuItemDelete}
          >
            <DeleteIcon sx={{ mr: 2 }} fontSize="small" />
            Удалить
          </MenuItem>
        </Menu>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          className={styles.dialog}
        >
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Typography>
              Вы уверены, что хотите удалить пользователя {selectedUser?.name}?
              Это действие нельзя отменить.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  )
}
