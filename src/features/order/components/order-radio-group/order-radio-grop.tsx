import { Payment } from '@mui/icons-material'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const OrderRadioGrop = () => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value)
  }
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        fontWeight="600"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Payment color="primary" />
        Payment method
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          name="paymentType"
          value={selectedPayment}
          onChange={handlePaymentChange}
        >
          <Grid container spacing={2}>
            <Grid size={{ md: 5, xs: 12 }}>
              <Paper
                variant={selectedPayment === 'CARD' ? 'elevation' : 'outlined'}
                sx={{
                  p: 2,
                  border:
                    selectedPayment === 'CARD' ? '2px solid' : '1px solid',
                  borderColor:
                    selectedPayment === 'CARD' ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              >
                <FormControlLabel
                  value="CARD"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography fontWeight="600">Bank card</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Visa, MasterCard
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <Paper
                variant={
                  selectedPayment === 'APPLE_PAY' ? 'elevation' : 'outlined'
                }
                sx={{
                  p: 2,
                  border:
                    selectedPayment === 'APPLE_PAY' ? '2px solid' : '1px solid',
                  borderColor:
                    selectedPayment === 'APPLE_PAY'
                      ? 'primary.main'
                      : 'divider',
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              >
                <FormControlLabel
                  value="APPLE_PAY"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography fontWeight="600">Apple Pay</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fast payment
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <Paper
                variant={
                  selectedPayment === 'GOOGLE_PAY' ? 'elevation' : 'outlined'
                }
                sx={{
                  p: 2,
                  border:
                    selectedPayment === 'GOOGLE_PAY'
                      ? '2px solid'
                      : '1px solid',
                  borderColor:
                    selectedPayment === 'GOOGLE_PAY'
                      ? 'primary.main'
                      : 'divider',
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
              >
                <FormControlLabel
                  value="GOOGLE_PAY"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography fontWeight="600">Google Pay</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fast payment
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default OrderRadioGrop
