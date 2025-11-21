import { Box, Typography } from '@mui/material'
import React from 'react'
import s from './product-specifications.module.css'

const ProductSpecifications = () => {
  return (
    <Box className={s.specifications}>
      <Typography variant="h6" gutterBottom>
        Технические характеристики
      </Typography>
      {/* <Grid container spacing={2}>
                  {product.specifications.map((spec, index) => (
                    <Grid size={4} key={index}>
                      <Box className={s.specItem}>
                        <Typography variant="body2" color="text.secondary">
                          {spec.name}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {spec.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid> */}
    </Box>
  )
}

export default ProductSpecifications
