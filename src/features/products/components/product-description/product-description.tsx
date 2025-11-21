import { Box, Typography } from '@mui/material'
import React from 'react'
import s from './product-description.module.css'

interface Props {
  description: string
}

const ProductDescription = ({ description }: Props) => {
  return (
    <Box className={s.description}>
      <Typography variant="h6" gutterBottom>
        Описание товара
      </Typography>
      <Typography variant="body1" component={'p'}>
        {description}
      </Typography>
      <Typography variant="body1">
        iPhone 15 Pro Max представляет собой вершину технологий Apple. С
        титановым корпусом, который одновременно прочный и легкий, этот смартфон
        устанавливает новые стандарты в индустрии.
      </Typography>
    </Box>
  )
}

export default ProductDescription
