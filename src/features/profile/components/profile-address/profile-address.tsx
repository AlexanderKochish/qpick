import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material'
import { LocationEditIcon } from 'lucide-react'
import s from './profile-address.module.css'
import { Address } from '@prisma/client'

function AddressSection({ addresses }: { addresses: Address[] }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Мои адреса
      </Typography>
      {addresses.map((address) => (
        <Card key={address.id} className={s.addressCard}>
          <CardContent>
            <Box className={s.addressHeader}>
              <LocationEditIcon color="primary" />
              <Typography variant="subtitle1" className={s.addressTitle}>
                Основной адрес
              </Typography>
              {address && (
                <Chip label="По умолчанию" color="primary" size="small" />
              )}
            </Box>
            <Typography variant="body2" className={s.addressText}>
              {address.street}, {address.city}, {address.postalCode}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Button variant="outlined" className={s.addButton}>
        + Добавить новый адрес
      </Button>
    </Box>
  )
}

export default AddressSection
