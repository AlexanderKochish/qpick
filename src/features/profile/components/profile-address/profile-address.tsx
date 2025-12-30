import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material'
import s from './profile-address.module.css'
import { Address } from '@prisma/client'
import { LocationCity } from '@mui/icons-material'

function AddressSection({ addresses }: { addresses: Address[] }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My addresses
      </Typography>
      {addresses.map((address) => (
        <Card key={address.id} className={s.addressCard}>
          <CardContent>
            <Box className={s.addressHeader}>
              <LocationCity color="primary" />
              <Typography variant="subtitle1" className={s.addressTitle}>
                Main address
              </Typography>
              {address && (
                <Chip label="By default" color="primary" size="small" />
              )}
            </Box>
            <Typography variant="body2" className={s.addressText}>
              {address.street}, {address.city}, {address.postalCode}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Button variant="outlined" className={s.addButton}>
        + Add a new address
      </Button>
    </Box>
  )
}

export default AddressSection
