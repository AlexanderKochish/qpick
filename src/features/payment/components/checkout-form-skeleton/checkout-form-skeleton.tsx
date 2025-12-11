import React from 'react'
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Skeleton,
  Divider,
} from '@mui/material'

export default function CheckoutFormSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {[1, 2].map((step) => (
            <React.Fragment key={step}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Skeleton
                  variant="circular"
                  width={32}
                  height={32}
                  sx={{ mr: 1 }}
                />
                <Skeleton
                  variant="text"
                  width={60}
                  height={20}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                />
              </Box>
              {step < 4 && (
                <Skeleton
                  variant="text"
                  width={20}
                  height={2}
                  sx={{ alignSelf: 'center' }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3, mb: { xs: 3, lg: 0 } }}>
            <Typography variant="h6" gutterBottom>
              <Skeleton variant="text" width={200} height={30} />
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
              <Skeleton
                variant="rectangular"
                height={56}
                sx={{ mb: 2, borderRadius: 1 }}
              />

              <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
              <Skeleton
                variant="rectangular"
                height={56}
                sx={{ mb: 2, borderRadius: 1 }}
              />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton
                    variant="text"
                    width={100}
                    height={20}
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton
                    variant="text"
                    width={100}
                    height={20}
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Skeleton variant="text" width={180} height={30} />
            </Typography>

            <Box sx={{ mb: 3 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ mb: 2, display: 'flex' }}>
                  <Skeleton
                    variant="rectangular"
                    width={64}
                    height={64}
                    sx={{ mr: 2, borderRadius: 1 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ mb: 0.5 }}
                    />
                    <Skeleton variant="text" width="60%" height={16} />
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              {[
                { label: 'Товары', width: 100 },
                { label: 'Доставка', width: 120 },
                { label: 'Скидка', width: 80 },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5,
                  }}
                >
                  <Skeleton variant="text" width={item.width} height={20} />
                  <Skeleton variant="text" width={60} height={20} />
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
