import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  Chip,
  Paper,
} from '@mui/material'
import { ShoppingCartCheckout } from '@mui/icons-material'
import Link from 'next/link'

interface Props {
  appliedPromo: string
  promoCode: string
  setPromoCode: (value: string) => void
  total: number
  applyPromoCode: () => void
  removePromoCode: () => void
  promoDiscount: number
  subtotal: number
  totalDiscount: number
  cartItemsCount: number | undefined
}

const CartTotal = ({
  appliedPromo,
  promoCode,
  setPromoCode,
  applyPromoCode,
  removePromoCode,
  total,
  promoDiscount,
  subtotal,
  totalDiscount,
  cartItemsCount,
}: Props) => {
  return (
    <Grid size={{ lg: 4, xs: 12 }}>
      <Paper sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Итоги заказа
        </Typography>

        <Box sx={{ mb: 3 }}>
          {!appliedPromo ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Введите промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={applyPromoCode}
                disabled={!promoCode.trim()}
              >
                Применить
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Chip
                label={`Промокод: ${appliedPromo}`}
                color="success"
                onDelete={removePromoCode}
              />
              <Typography variant="body2" color="success.main">
                -{promoDiscount.toLocaleString()} €
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ space: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Промежуточный итог
            </Typography>
            <Typography variant="body2">
              {subtotal.toLocaleString()} €
            </Typography>
          </Box>

          {totalDiscount > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Скидка на товары
              </Typography>
              <Typography variant="body2" color="success.main">
                -{totalDiscount.toLocaleString()} €
              </Typography>
            </Box>
          )}

          {promoDiscount > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Скидка по промокоду
              </Typography>
              <Typography variant="body2" color="success.main">
                -{promoDiscount.toLocaleString()} €
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
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight="600">
            Итого
          </Typography>
          <Typography variant="h5" fontWeight="600" color="primary">
            {total.toLocaleString()} €
          </Typography>
        </Box>

        {totalDiscount + promoDiscount > 0 && (
          <Box
            sx={{
              backgroundColor: 'success.light',
              p: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography variant="body2" color="success.dark" textAlign="center">
              🎉 Вы экономите {(totalDiscount + promoDiscount).toLocaleString()}{' '}
              €
            </Typography>
          </Box>
        )}

        <Link href={'/order'}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckout />}
            disabled={cartItemsCount! === 0}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
            }}
          >
            Перейти к оформлению
          </Button>
        </Link>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Бесплатная доставка по всей Украине
        </Typography>
      </Paper>
    </Grid>
  )
}

export default CartTotal
