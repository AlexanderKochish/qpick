import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        height: '90vh',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Spinner
