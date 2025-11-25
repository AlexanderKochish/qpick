'use client'
import { Dispatch, SetStateAction } from 'react'
import s from './filter-panel.module.css'
import {
  AppBar,
  Box,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { SortBy } from '@/shared/types/types'

interface Props {
  itemsLength?: number
  sortBy: string
  setSortBy: (value: SortBy) => void
}

const FilterPanel = ({ itemsLength, setSortBy, sortBy }: Props) => {
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
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className={s.sortSelect}
            size="small"
            slotProps={{
              select: {
                MenuProps: {
                  disableScrollLock: true,
                },
              },
            }}
          >
            <MenuItem value="newest">Сначала новинки</MenuItem>
            <MenuItem value="price-low">Сначала дешевые</MenuItem>
            <MenuItem value="price-high">Сначала дорогие</MenuItem>
            <MenuItem value="ratings">По рейтингу</MenuItem>
          </TextField>

          {/* <Button startIcon={<FilterList />} className={s.filterButton}>
            Фильтры
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default FilterPanel
