import { useCart } from '@/features/cart/hooks/useCart'
import { LocalShipping } from '@mui/icons-material'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'

const OrderTotal = () => {
  const { data: cart, totalPrice } = useCart()
  return (
    <Grid size={4}>
      <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Итоги заказа
        </Typography>

        <Box sx={{ space: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Товары ({cart?.items.length})
            </Typography>
            <Typography variant="body2">{totalPrice} €</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Скидка
            </Typography>
            <Typography variant="body2" color="success.main">
              (
              {cart?.items.reduce(
                (acc, curr) => acc + Number(curr.product.discount),
                0
              )}
              ) €
            </Typography>
          </Box>

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
              {totalPrice} €
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
