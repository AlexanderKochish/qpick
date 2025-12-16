'use client'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { Place } from '@mui/icons-material'
import { IInitialState } from '../../actions/actions'

interface Props {
  state: IInitialState
}

const OrderAddress = ({ state }: Props) => {
  const cityError = state?.properties?.city?.errors?.[0]
  const streetError = state?.properties?.street?.errors?.[0]
  const buildingError = state?.properties?.building?.errors?.[0]
  const postalCodeError = state?.properties?.postalCode?.errors?.[0]
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight="600"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Place color="primary" />
        Address information
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            placeholder="For example: Kyiv"
          />
          {cityError && (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              {cityError}
            </Typography>
          )}
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Street"
            name="street"
            placeholder="For example: Shevchenko St."
          />
          {streetError && (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              {streetError}
            </Typography>
          )}
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            required
            fullWidth
            label="House number"
            name="building"
            placeholder="For example: 15"
          />
          {buildingError && (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              {buildingError}
            </Typography>
          )}
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            fullWidth
            label="Apartment (optional)"
            name="apartment"
            placeholder="For example: 42"
          />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Zip Code"
            name="postalCode"
            placeholder="12345"
          />
          {postalCodeError && (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              {postalCodeError}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderAddress
