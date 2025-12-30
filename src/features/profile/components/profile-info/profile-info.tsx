import { Grid, TextField } from '@mui/material'
import s from './profile-info.module.css'
import { EditProfile } from '../../types/types'

function ProfileInfo({
  user,
  isEditing,
}: {
  user: EditProfile
  isEditing: boolean
}) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ md: 6, xs: 12 }}>
        <TextField
          label="Name"
          defaultValue={user.name}
          fullWidth
          disabled={!isEditing}
          className={s.field}
        />
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <TextField
          label="Email"
          defaultValue={user.email}
          fullWidth
          disabled
          className={s.field}
        />
      </Grid>
    </Grid>
  )
}

export default ProfileInfo
