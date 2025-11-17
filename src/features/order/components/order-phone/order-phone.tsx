import { Person } from '@mui/icons-material'
import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { IInitialState } from '../../actions/actions'

interface Props {
  state: IInitialState
}

const OrderPhone = ({ state }: Props) => {
  const phoneError = state?.properties?.phone?.errors?.[0]
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight="600"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Person color="primary" />
        Контактная информация
      </Typography>

      <Grid container spacing={3}>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Телефон"
            name="phone"
            placeholder="+3 (980) 123 33 33"
            error={!!phoneError}
            helperText={phoneError}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderPhone
