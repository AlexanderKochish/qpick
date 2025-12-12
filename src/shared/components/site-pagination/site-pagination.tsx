'use client'

import { Box, Pagination } from '@mui/material'
import s from './site-pagination.module.css'

interface Props {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number | undefined
}

const SitePagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  return (
    <div>
      {totalPages && totalPages > 1 && (
        <Box className={s.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </div>
  )
}

export default SitePagination
