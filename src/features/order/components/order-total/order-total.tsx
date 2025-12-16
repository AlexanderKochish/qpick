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
    <Grid size={{ lg: 4, xs: 12 }}>
      <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Order results
        </Typography>

        <Box sx={{ space: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Devices (
              {cart?.items.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0} )
            </Typography>
            <Typography variant="body2">{total} €</Typography>
          </Box>

          {discount ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Discount
              </Typography>
              <Typography variant="body2" color="success.main">
                ({discount ?? 0}) €
              </Typography>
            </Box>
          ) : null}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Delivery
            </Typography>
            <Typography variant="body2" color="success.main">
              Free
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="600">
              Total
            </Typography>
            <Typography variant="h5" fontWeight="600" color="primary">
              {total ?? 0} €
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
            Free delivery throughout Ukraine
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default OrderTotal
