import React, { Dispatch, SetStateAction } from 'react'
import s from './filter-panel.module.css'
import {
  AppBar,
  Box,
  Button,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { FilterList } from '@mui/icons-material'

interface Props {
  itemsLength?: number
  sortBy: string
  setSortBy: (value: string) => Dispatch<SetStateAction<string>>
}

const FilterPanel = ({ itemsLength, sortBy, setSortBy }: Props) => {
  return (
    <AppBar position="sticky" className={s.filtersBar}>
      <Toolbar className={s.filtersToolbar}>
        <Box className={s.filtersLeft}>
          <Typography variant="h6" className={s.productsCount}>
            {itemsLength} товаров
          </Typography>
        </Box>

        <Box className={s.filtersRight}>
          <TextField
            select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={s.sortSelect}
            size="small"
          >
            <MenuItem value="newest">Сначала новинки</MenuItem>
            <MenuItem value="price-low">Сначала дешевые</MenuItem>
            <MenuItem value="price-high">Сначала дорогие</MenuItem>
            <MenuItem value="rating">По рейтингу</MenuItem>
          </TextField>

          <Button startIcon={<FilterList />} className={s.filterButton}>
            Фильтры
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default FilterPanel
