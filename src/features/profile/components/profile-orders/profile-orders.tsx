import { Box, Card, CardContent, Chip, Typography } from '@mui/material'

import s from './profile-orders.module.css'
import { Order } from '@/generated/prisma/client'

function OrdersSection({ orders }: { orders: Order[] }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        История заказов
      </Typography>
      {orders.map((order) => (
        <Card key={order.id} className={s.orderCard}>
          <CardContent>
            <Box className={s.orderHeader}>
              <Typography variant="subtitle1">Заказ #{order.id}</Typography>
              <Chip
                label={order.status}
                color={
                  order.status === 'CONFIRMED'
                    ? 'success'
                    : order.status === 'PENDING'
                      ? 'warning'
                      : 'default'
                }
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Дата: {order.createdAt.toLocaleDateString()}
            </Typography>
            <Typography variant="h6" className={s.orderTotal}>
              {order.totalPrice} $
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
export default OrdersSection
