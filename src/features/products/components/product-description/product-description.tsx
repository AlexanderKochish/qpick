import { Box, Typography } from '@mui/material'
import s from './product-description.module.css'

interface Props {
  description: string
}

const ProductDescription = ({ description }: Props) => {
  return (
    <Box className={s.description}>
      <Typography variant="h6" gutterBottom>
        Product description
      </Typography>
      <Typography variant="body1" component={'p'}>
        {description}
      </Typography>
    </Box>
  )
}

export default ProductDescription
