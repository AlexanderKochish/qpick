'use client'

import { useState } from 'react'
import s from './page.module.css'

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
  Badge,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Cancel as CancelledIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'

import AdminLayout from '../layout'

interface Order {
  id: string
  status: OrderStatus
  total: number
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string
    email: string
  }
  orderItems: OrderItem[]
  shippingAddress: Address
}

interface OrderItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
  quantity: number
  price: number
}

interface Address {
  id: string
  street: string
  city: string
  zipCode: string
  country: string
}

type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export default function OrdersPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const orders: Order[] = [
    {
      id: 'ORD-001',
      status: 'processing',
      total: 12500,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
      user: {
        id: '1',
        name: 'Иван Иванов',
        email: 'ivan@example.com',
      },
      orderItems: [
        {
          id: '1',
          product: {
            id: 'p1',
            name: 'iPhone 15 Pro',
            price: 99900,
            images: ['/api/placeholder/80/80'],
          },
          quantity: 1,
          price: 99900,
        },
        {
          id: '2',
          product: {
            id: 'p2',
            name: 'AirPods Pro',
            price: 24900,
            images: ['/api/placeholder/80/80'],
          },
          quantity: 1,
          price: 24900,
        },
      ],
      shippingAddress: {
        id: 'a1',
        street: 'ул. Пушкина, д. 10',
        city: 'Москва',
        zipCode: '101000',
        country: 'Россия',
      },
    },
    {
      id: 'ORD-002',
      status: 'shipped',
      total: 45900,
      createdAt: new Date('2024-03-02'),
      updatedAt: new Date('2024-03-02'),
      user: {
        id: '2',
        name: 'Петр Петров',
        email: 'petr@example.com',
      },
      orderItems: [
        {
          id: '3',
          product: {
            id: 'p3',
            name: 'MacBook Air',
            price: 45900,
            images: ['/api/placeholder/80/80'],
          },
          quantity: 1,
          price: 45900,
        },
      ],
      shippingAddress: {
        id: 'a2',
        street: 'ул. Ленина, д. 25',
        city: 'Санкт-Петербург',
        zipCode: '190000',
        country: 'Россия',
      },
    },
    {
      id: 'ORD-003',
      status: 'delivered',
      total: 3200,
      createdAt: new Date('2024-03-03'),
      updatedAt: new Date('2024-03-04'),
      user: {
        id: '3',
        name: 'Мария Сидорова',
        email: 'maria@example.com',
      },
      orderItems: [
        {
          id: '4',
          product: {
            id: 'p4',
            name: 'Чехол для iPhone',
            price: 3200,
            images: ['/api/placeholder/80/80'],
          },
          quantity: 1,
          price: 3200,
        },
      ],
      shippingAddress: {
        id: 'a3',
        street: 'пр. Мира, д. 15',
        city: 'Казань',
        zipCode: '420000',
        country: 'Россия',
      },
    },
    {
      id: 'ORD-004',
      status: 'pending',
      total: 8900,
      createdAt: new Date('2024-03-04'),
      updatedAt: new Date('2024-03-04'),
      user: {
        id: '4',
        name: 'Анна Ковалева',
        email: 'anna@example.com',
      },
      orderItems: [
        {
          id: '5',
          product: {
            id: 'p5',
            name: 'Apple Watch',
            price: 8900,
            images: ['/api/placeholder/80/80'],
          },
          quantity: 1,
          price: 8900,
        },
      ],
      shippingAddress: {
        id: 'a4',
        street: 'ул. Гагарина, д. 8',
        city: 'Екатеринбург',
        zipCode: '620000',
        country: 'Россия',
      },
    },
    {
      id: 'ORD-005',
      status: 'cancelled',
      total: 15600,
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-05'),
      user: {
        id: '5',
        name: 'Дмитрий Соколов',
        email: 'dmitry@example.com',
      },
      orderItems: [
        {
          id: '6',
          product: {
            id: 'p6',
            name: 'iPad Air',
            price: 15600,
            images: ['/api/placeholder/80/80'],
          },
          quantity: 1,
          price: 15600,
        },
      ],
      shippingAddress: {
        id: 'a5',
        street: 'ул. Кирова, д. 12',
        city: 'Новосибирск',
        zipCode: '630000',
        country: 'Россия',
      },
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    order: Order
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrder(order)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewOrder = () => {
    setViewDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = () => {
    console.log('Удалить заказ:', selectedOrder?.id)
    setDeleteDialogOpen(false)
    setSelectedOrder(null)
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'processing':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <PendingIcon />
      case 'processing':
        return <PendingIcon />
      case 'shipped':
        return <ShippingIcon />
      case 'delivered':
        return <CompletedIcon />
      case 'cancelled':
        return <CancelledIcon />
      default:
        return <PendingIcon />
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Ожидание'
      case 'processing':
        return 'В обработке'
      case 'shipped':
        return 'Отправлен'
      case 'delivered':
        return 'Доставлен'
      case 'cancelled':
        return 'Отменен'
      default:
        return status
    }
  }

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  }

  return (
    <AdminLayout>
      <Box className={s.ordersContainer}>
        <Box className={s.header}>
          <Typography variant="h4" className={s.title}>
            Управление заказами
          </Typography>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            className={s.exportButton}
          >
            Экспорт
          </Button>
        </Box>

        <Grid container spacing={2} className={s.statsGrid}>
          {(
            [
              'pending',
              'processing',
              'shipped',
              'delivered',
              'cancelled',
            ] as OrderStatus[]
          ).map((status) => (
            <Grid size={2} key={status}>
              <Card
                className={`${s.statCard} ${statusFilter === status ? s.statCardActive : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                <CardContent className={s.statContent}>
                  <Box className={s.statIcon}>{getStatusIcon(status)}</Box>
                  <Typography variant="h4" className={s.statNumber}>
                    {statusCounts[status]}
                  </Typography>
                  <Typography variant="body2" className={s.statLabel}>
                    {getStatusText(status)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper className={s.content}>
          <Box className={s.toolbar}>
            <TextField
              placeholder="Поиск по ID заказа, имени или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={s.searchField}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />

            <Box className={s.filterGroup}>
              <Button
                variant={statusFilter === 'all' ? 'contained' : 'outlined'}
                onClick={() => setStatusFilter('all')}
                className={s.filterButton}
              >
                Все ({statusCounts.all})
              </Button>
            </Box>
          </Box>

          <TableContainer>
            <Table className={s.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID заказа</TableCell>
                  <TableCell>Клиент</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Товары</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell width="100">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order.id} className={s.tableRow}>
                      <TableCell>
                        <Typography variant="subtitle2" className={s.orderId}>
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box className={s.userCell}>
                          <MuiAvatar
                            sx={{ width: 32, height: 32 }}
                            className={s.avatar}
                          >
                            {order.user.name.charAt(0)}
                          </MuiAvatar>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              className={s.userName}
                            >
                              {order.user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {order.user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {order.createdAt.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.createdAt.toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box className={s.itemsCell}>
                          {order.orderItems.slice(0, 2).map((item, index) => (
                            <Typography key={item.id} variant="body2">
                              {item.product.name}
                              {item.quantity > 1 && ` × ${item.quantity}`}
                            </Typography>
                          ))}
                          {order.orderItems.length > 2 && (
                            <Typography variant="body2" color="text.secondary">
                              +{order.orderItems.length - 2} еще
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          className={s.orderTotal}
                        >
                          {order.total.toLocaleString()} ₽
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={getStatusText(order.status)}
                          color={getStatusColor(order.status)}
                          size="small"
                          className={s.statusChip}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, order)}
                          className={s.menuButton}
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
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Заказов на странице:"
          />
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={s.actionMenu}
        >
          <MenuItem onClick={handleViewOrder} className={s.menuItem}>
            <ViewIcon sx={{ mr: 2 }} fontSize="small" />
            Просмотреть
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className={s.menuItem}>
            <EditIcon sx={{ mr: 2 }} fontSize="small" />
            Редактировать
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} className={s.menuItemDelete}>
            <DeleteIcon sx={{ mr: 2 }} fontSize="small" />
            Удалить
          </MenuItem>
        </Menu>

        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
          className={s.dialog}
        >
          {selectedOrder && (
            <>
              <DialogTitle className={s.dialogTitle}>
                <Box className={s.dialogHeader}>
                  <Typography variant="h5">Заказ {selectedOrder.id}</Typography>
                  <Chip
                    icon={getStatusIcon(selectedOrder.status)}
                    label={getStatusText(selectedOrder.status)}
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid size={6}>
                    <Typography variant="h6" gutterBottom>
                      Информация о клиенте
                    </Typography>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1">
                          {selectedOrder.user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedOrder.user.email}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={6}>
                    <Typography variant="h6" gutterBottom>
                      Адрес доставки
                    </Typography>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="body2">
                          {selectedOrder.shippingAddress.street}
                        </Typography>
                        <Typography variant="body2">
                          {selectedOrder.shippingAddress.city},{' '}
                          {selectedOrder.shippingAddress.zipCode}
                        </Typography>
                        <Typography variant="body2">
                          {selectedOrder.shippingAddress.country}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={3}>
                    <Typography variant="h6" gutterBottom>
                      Товары в заказе
                    </Typography>
                    <Card variant="outlined">
                      <CardContent>
                        <List>
                          {selectedOrder.orderItems.map((item) => (
                            <ListItem key={item.id} divider>
                              <Box className={s.orderItem}>
                                <MuiAvatar
                                  src={item.product.images[0]}
                                  variant="rounded"
                                  sx={{ width: 60, height: 60, mr: 2 }}
                                />
                                <ListItemText
                                  primary={item.product.name}
                                  secondary={`Количество: ${item.quantity}`}
                                />
                                <Typography variant="subtitle1">
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}{' '}
                                  ₽
                                </Typography>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Box className={s.orderSummary}>
                          <Typography variant="h6">
                            Итого: {selectedOrder.total.toLocaleString()} ₽
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setViewDialogOpen(false)}>
                  Закрыть
                </Button>
                <Button variant="contained">Редактировать заказ</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          className={s.dialog}
        >
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Typography>
              Вы уверены, что хотите удалить заказ {selectedOrder?.id}? Это
              действие нельзя отменить.
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
