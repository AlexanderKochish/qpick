'use client'

import { Box, Skeleton, Paper, Grid } from '@mui/material'
import s from './order-skeleton.module.css'
import React from 'react'

export default function OrderSkeleton() {
  return (
    <section className={s.orderSection}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {[1, 2, 3].map((step) => (
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

      <div className={s.order}>
        <Grid size={{ lg: 8, xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Skeleton variant="rounded" height={56} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Skeleton variant="rounded" height={56} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Skeleton variant="rounded" height={56} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Skeleton variant="rounded" height={56} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton variant="rounded" height={56} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton variant="rounded" height={56} />
                </Grid>
              </Grid>
            </Box>

            <Skeleton variant="rounded" height={56} width="100%" />
          </Paper>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 3, position: 'sticky', top: 20 }}>
            <Skeleton variant="text" width={150} height={30} sx={{ mb: 3 }} />

            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Skeleton variant="rounded" width={60} height={60} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Box>
            ))}

            <Box sx={{ mt: 3 }}>
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Skeleton variant="text" width={100} />
                  <Skeleton variant="text" width={60} />
                </Box>
              ))}
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Skeleton variant="text" width={100} height={30} />
              <Skeleton variant="text" width={120} height={40} />
            </Box>
          </Paper>
        </Grid>
      </div>
    </section>
  )
}
