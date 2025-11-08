'use client'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import s from './address-form.module.css'

const AddressForm = () => {
  return (
    <div className={s.form}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={'London'}
        label="City"
        size="small"
        name="city"
      >
        <MenuItem value={'London'}>London</MenuItem>
        <MenuItem value={'New York'}>New York</MenuItem>
        <MenuItem value={'Kiev'}>Kiev</MenuItem>
      </Select>
      <TextField
        id="outlined-basic"
        label="Улица / Район"
        variant="outlined"
        size="small"
        name="street"
        fullWidth
      />
      <div className={s.formBottom}>
        <TextField
          id="outlined-basic"
          label="Дом"
          variant="outlined"
          fullWidth
          name="building"
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="Подъезд"
          variant="outlined"
          fullWidth
          name="postalCode"
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="Квартира"
          variant="outlined"
          name="apartment"
          fullWidth
          size="small"
        />
      </div>
    </div>
  )
}

export default AddressForm
