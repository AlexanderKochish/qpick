import { Grid, TextField } from '@mui/material'
import s from './profile-info.module.css'
import { UserProfile } from '../../types/types'

function ProfileInfo({
  user,
  isEditing,
}: {
  user: UserProfile
  isEditing: boolean
}) {
  return (
    <Grid container spacing={3}>
      <Grid size={6}>
        <TextField
          label="Имя"
          defaultValue={user.name}
          fullWidth
          disabled={!isEditing}
          className={s.field}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          label="Email"
          defaultValue={user.email}
          fullWidth
          disabled
          className={s.field}
        />
      </Grid>
      <Grid size={3}>
        <TextField
          label="О себе"
          placeholder="Расскажите о себе..."
          multiline
          rows={3}
          fullWidth
          disabled={!isEditing}
          className={s.field}
        />
      </Grid>
    </Grid>
  )
}

export default ProfileInfo
