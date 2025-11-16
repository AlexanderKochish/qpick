'use client'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { Place } from '@mui/icons-material'

const OrderAddress = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight="600"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Place color="primary" />
        Адрес доставки
      </Typography>

      <Grid container spacing={3}>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Город"
            name="city"
            // {...register('city')}
            // error={!!errors.city}
            // helperText={errors.city?.message}
            placeholder="Например: Москва"
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Улица"
            name="street"
            // {...register('street')}
            // error={!!errors.street}
            // helperText={errors.street?.message}
            placeholder="Например: Ленина"
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Дом"
            name="building"
            // {...register('building')}
            // error={!!errors.building}
            // helperText={errors.building?.message}
            placeholder="Например: 15"
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Квартира (необязательно)"
            name="apartment"
            // {...register('apartment')}
            // error={!!errors.apartment}
            // helperText={errors.apartment?.message}
            placeholder="Например: 42"
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Почтовый индекс"
            name="postalCode"
            // {...register('postalCode')}
            // error={!!errors.postalCode}
            // helperText={errors.postalCode?.message}
            placeholder="12345"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderAddress
