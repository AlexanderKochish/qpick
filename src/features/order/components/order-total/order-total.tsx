import { Cart } from '@/features/cart/types/types'
import { LocalShipping } from '@mui/icons-material'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'

interface Props {
  cart: Cart | undefined
  total: number
  discount?: number
}

const OrderTotal = ({ cart, total, discount }: Props) => {
  return (
    <Grid size={4}>
      <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Итоги заказа
        </Typography>

        <Box sx={{ space: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Товары (
              {cart?.items.reduce((acc, curr) => acc + curr.quantity, 0)})
            </Typography>
            <Typography variant="body2">{total} €</Typography>
          </Box>

          {discount && (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Скидка
              </Typography>
              <Typography variant="body2" color="success.main">
                ({discount}) €
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Доставка
            </Typography>
            <Typography variant="body2" color="success.main">
              Бесплатно
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="600">
              Итого
            </Typography>
            <Typography variant="h5" fontWeight="600" color="primary">
              {total && discount ? total - discount : total} €
            </Typography>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: 'info.light', p: 2, borderRadius: 2 }}>
          <Typography
            variant="body2"
            color="info.dark"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <LocalShipping fontSize="small" />
            Бесплатная доставка за 1-2 дня
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default OrderTotal
