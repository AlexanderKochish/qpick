'use client'

import { Box, Paper, Grid, Skeleton, Tabs, Tab } from '@mui/material'
import {
  InfoOutlined,
  LocationOnOutlined,
  ShoppingBagOutlined,
  RateReviewOutlined,
} from '@mui/icons-material'

export default function ProfilePageSkeleton() {
  return (
    <Box sx={{ m: 2 }}>
      <Skeleton variant="text" sx={{ width: 200, height: 40, mb: 3 }} />

      <Grid container spacing={3} sx={{ justifyContent: 'center', mb: 4 }}>
        <Grid size={{ xs: 12, md: 10, lg: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Skeleton variant="circular" width={120} height={120} />
              <Skeleton width={140} height={28} sx={{ mt: 2 }} />
              <Skeleton width={80} height={24} sx={{ mt: 1 }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton width={120} height={20} />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Skeleton width={200} height={20} />
              <Skeleton width={180} height={20} />
              <Skeleton width={100} height={32} sx={{ borderRadius: 2 }} />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 10, lg: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}
            >
              <Tabs value={0} sx={{ minHeight: 48 }}>
                <Tab icon={<InfoOutlined />} disabled />
                <Tab icon={<LocationOnOutlined />} disabled />
                <Tab icon={<ShoppingBagOutlined />} disabled />
                <Tab icon={<RateReviewOutlined />} disabled />
              </Tabs>

              <Skeleton variant="rounded" width={140} height={36} />
            </Box>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
