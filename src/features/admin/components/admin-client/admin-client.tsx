'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material'
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  LocalShipping,
  Star,
  Notifications,
  Schedule,
  MoreVert,
  Add,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './admin-client.module.css'
import {
  MetricCard,
  RecentOrder,
  SalesData,
  TopProduct,
} from '../../types/types'
import AdminLayout from '@/app/(admin)/admin/layout'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  const salesData: SalesData[] = [
    { month: 'Jan', sales: 4000, revenue: 24000 },
    { month: 'Feb', sales: 3000, revenue: 13980 },
    { month: 'Mar', sales: 5000, revenue: 29000 },
    { month: 'Apr', sales: 2780, revenue: 18900 },
    { month: 'May', sales: 1890, revenue: 13980 },
    { month: 'Jun', sales: 4390, revenue: 24900 },
    { month: 'Jul', sales: 5490, revenue: 31900 },
    { month: 'Aug', sales: 6490, revenue: 38900 },
    { month: 'Sep', sales: 5490, revenue: 32900 },
    { month: 'Oct', sales: 4490, revenue: 27900 },
    { month: 'Nov', sales: 3490, revenue: 21900 },
    { month: 'Dec', sales: 2490, revenue: 16900 },
  ]

  const categoryData = [
    { name: 'Электроника', value: 35, color: '#8884d8' },
    { name: 'Одежда', value: 25, color: '#82ca9d' },
    { name: 'Книги', value: 15, color: '#ffc658' },
    { name: 'Дом и сад', value: 12, color: '#ff8042' },
    { name: 'Спорт', value: 8, color: '#0088fe' },
    { name: 'Красота', value: 5, color: '#00C49F' },
  ]

  const metrics: MetricCard[] = [
    {
      title: 'Общая выручка',
      value: '284,500 ₽',
      change: 15.2,
      isPositive: true,
      icon: <AttachMoney />,
      color: '#4caf50',
    },
    {
      title: 'Всего заказов',
      value: '184',
      change: 8.7,
      isPositive: true,
      icon: <ShoppingCart />,
      color: '#2196f3',
    },
    {
      title: 'Новые клиенты',
      value: '68',
      change: 12.3,
      isPositive: true,
      icon: <People />,
      color: '#ff9800',
    },
    {
      title: 'Товары в наличии',
      value: '1,248',
      change: -2.1,
      isPositive: false,
      icon: <Inventory />,
      color: '#9c27b0',
    },
  ]

  const recentOrders: RecentOrder[] = [
    {
      id: 'ORD-001',
      customer: 'Иван Иванов',
      date: '2024-03-15',
      amount: 12500,
      status: 'completed',
    },
    {
      id: 'ORD-002',
      customer: 'Петр Петров',
      date: '2024-03-15',
      amount: 8900,
      status: 'processing',
    },
    {
      id: 'ORD-003',
      customer: 'Мария Сидорова',
      date: '2024-03-14',
      amount: 15600,
      status: 'completed',
    },
    {
      id: 'ORD-004',
      customer: 'Анна Ковалева',
      date: '2024-03-14',
      amount: 3200,
      status: 'pending',
    },
    {
      id: 'ORD-005',
      customer: 'Дмитрий Соколов',
      date: '2024-03-13',
      amount: 24900,
      status: 'completed',
    },
  ]

  const topProducts: TopProduct[] = [
    { id: '1', name: 'iPhone 15 Pro', sales: 45, revenue: 4499550, growth: 12 },
    {
      id: '2',
      name: 'MacBook Air M2',
      sales: 28,
      revenue: 3499720,
      growth: 15,
    },
    { id: '3', name: 'AirPods Pro', sales: 65, revenue: 1624350, growth: 8 },
    { id: '4', name: 'iPad Air', sales: 32, revenue: 2111680, growth: 5 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'processing':
        return 'warning'
      case 'pending':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершен'
      case 'processing':
        return 'В обработке'
      case 'pending':
        return 'Ожидание'
      default:
        return status
    }
  }

  return (
    <AdminLayout>
      <Box className={styles.dashboardContainer}>
        <Box className={styles.header}>
          <Box>
            <Typography variant="h4" className={styles.title}>
              Дашборд
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Обзор статистики и показателей магазина
            </Typography>
          </Box>
          <Box className={styles.headerActions}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              className={styles.actionButton}
            >
              Новый заказ
            </Button>
            <Button
              variant="contained"
              startIcon={<TrendingUp />}
              className={styles.actionButton}
            >
              Отчеты
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <Grid size={3} key={index}>
              <Card className={styles.metricCard}>
                <CardContent className={styles.metricContent}>
                  <Box className={styles.metricHeader}>
                    <Avatar
                      className={styles.metricIcon}
                      sx={{ bgcolor: metric.color }}
                    >
                      {metric.icon}
                    </Avatar>
                    <Chip
                      icon={
                        metric.isPositive ? <ArrowUpward /> : <ArrowDownward />
                      }
                      label={`${metric.isPositive ? '+' : ''}${metric.change}%`}
                      color={metric.isPositive ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h3" className={styles.metricValue}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" className={styles.metricTitle}>
                    {metric.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} className={styles.chartsGrid}>
          <Grid size={12}>
            <Paper className={styles.chartCard}>
              <Box className={styles.chartHeader}>
                <Typography variant="h6">Динамика продаж и выручки</Typography>
                <Box className={styles.chartControls}>
                  <Button
                    size="small"
                    variant={timeRange === 'week' ? 'contained' : 'outlined'}
                    onClick={() => setTimeRange('week')}
                  >
                    Неделя
                  </Button>
                  <Button
                    size="small"
                    variant={timeRange === 'month' ? 'contained' : 'outlined'}
                    onClick={() => setTimeRange('month')}
                  >
                    Месяц
                  </Button>
                  <Button
                    size="small"
                    variant={timeRange === 'year' ? 'contained' : 'outlined'}
                    onClick={() => setTimeRange('year')}
                  >
                    Год
                  </Button>
                </Box>
              </Box>
              <Box className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'revenue' ? `${value} ₽` : value,
                        name === 'revenue' ? 'Выручка' : 'Продажи',
                      ]}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      strokeWidth={3}
                      name="Продажи"
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      strokeWidth={3}
                      name="Выручка"
                      dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper className={styles.chartCard}>
              <Typography variant="h6" gutterBottom>
                Распределение по категориям
              </Typography>
              <Box className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent! * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Доля']} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={6}>
            <Paper className={styles.tableCard}>
              <Box className={styles.tableHeader}>
                <Typography variant="h6">Последние заказы</Typography>
                <Button color="primary">Все заказы</Button>
              </Box>
              <List>
                {recentOrders.map((order) => (
                  <ListItem key={order.id} className={styles.orderItem}>
                    <ListItemAvatar>
                      <Avatar className={styles.orderAvatar}>
                        <ShoppingCart />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box className={styles.orderInfo}>
                          <Typography variant="subtitle2">
                            {order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.customer}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box className={styles.orderDetails}>
                          <Typography variant="body2">{order.date}</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {order.amount.toLocaleString()} ₽
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper className={styles.tableCard}>
              <Box className={styles.tableHeader}>
                <Typography variant="h6">Популярные товары</Typography>
                <Button color="primary">Все товары</Button>
              </Box>
              <List>
                {topProducts.map((product) => (
                  <ListItem key={product.id} className={styles.productItem}>
                    <ListItemAvatar>
                      <Avatar
                        className={styles.productAvatar}
                        sx={{ bgcolor: '#667eea' }}
                      >
                        <Star />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={
                        <Box className={styles.productStats}>
                          <Typography variant="body2">
                            Продажи: {product.sales} шт.
                          </Typography>
                          <Typography variant="body2">
                            Выручка: {(product.revenue / 1000).toFixed(0)}K ₽
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={`+${product.growth}%`}
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} className={styles.additionalGrid}>
          <Grid size={4}>
            <Paper className={styles.statsCard}>
              <Typography variant="h6" gutterBottom>
                Конверсия
              </Typography>
              <Box className={styles.conversionStats}>
                <Box className={styles.conversionItem}>
                  <Typography variant="body2">Посетители</Typography>
                  <Typography variant="h6">1,248</Typography>
                </Box>
                <Box className={styles.conversionItem}>
                  <Typography variant="body2">Конверсия</Typography>
                  <Typography variant="h6">3.2%</Typography>
                </Box>
                <Box className={styles.conversionItem}>
                  <Typography variant="body2">Средний чек</Typography>
                  <Typography variant="h6">15,462 ₽</Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
                color="success"
              />
            </Paper>
          </Grid>

          <Grid size={4}>
            <Paper className={styles.statsCard}>
              <Typography variant="h6" gutterBottom>
                Доставка
              </Typography>
              <Box className={styles.deliveryStats}>
                <Box className={styles.deliveryItem}>
                  <LocalShipping color="primary" />
                  <Box>
                    <Typography variant="body2">В процессе</Typography>
                    <Typography variant="h6">12</Typography>
                  </Box>
                </Box>
                <Box className={styles.deliveryItem}>
                  <Schedule color="warning" />
                  <Box>
                    <Typography variant="body2">Ожидают</Typography>
                    <Typography variant="h6">8</Typography>
                  </Box>
                </Box>
                <Box className={styles.deliveryItem}>
                  <Notifications color="success" />
                  <Box>
                    <Typography variant="body2">Доставлено</Typography>
                    <Typography variant="h6">156</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid size={4}>
            <Paper className={styles.statsCard}>
              <Typography variant="h6" gutterBottom>
                Активность
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <People />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Новый клиент зарегистрирован"
                    secondary="2 минуты назад"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <ShoppingCart />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Новый заказ #ORD-006"
                    secondary="15 минут назад"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <Star />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Получен новый отзыв"
                    secondary="1 час назад"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}
