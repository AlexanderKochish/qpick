'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Avatar as MuiAvatar,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  TrendingUp as TrendingIcon,
  DateRange as DateIcon,
} from '@mui/icons-material'
import styles from './page.module.css'
import AdminLayout from '../layout'
import { useCategory } from '@/features/category/hooks/useCategory'
import { Category } from '@/features/category/types/types'
import {
  createCategory,
  createBrand,
} from '@/features/category/actions/actions'

export default function CategoriesPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addBrand, setAddBrand] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'products' | 'date'>('name')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: categories } = useCategory()

  if (!categories) {
    return null
  }

  const sortedCategories = categories.toSorted((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'products':
        return (b._count?.products || 0) - (a._count?.products || 0)
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    category: Category
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedCategory(category)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEditCategory = () => {
    setEditDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = () => {
    console.log('Удалить категорию:', selectedCategory?.id)
    setDeleteDialogOpen(false)
    setSelectedCategory(null)
  }

  const handleAddCategory = () => {
    setAddDialogOpen(true)
  }

  const handleAddBrand = () => {
    setAddBrand(true)
  }

  const totalProducts = categories.reduce(
    (sum, category) => sum + (category._count?.products || 0),
    0
  )
  const averageProductsPerCategory = isNaN(totalProducts / categories.length)
    ? 0
    : Math.round(totalProducts / categories.length)

  return (
    <AdminLayout>
      <Box className={styles.categoriesContainer}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Управление категориями
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className={styles.addButton}
              onClick={handleAddCategory}
            >
              Добавить категорию
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className={styles.addButton}
              onClick={handleAddBrand}
            >
              Добавить бренд
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2} className={styles.statsGrid}>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <CategoryIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {categories.length}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Всего категорий
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <InventoryIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {totalProducts}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Всего товаров
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <TrendingIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {averageProductsPerCategory}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Среднее на категорию
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <DateIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {new Date().getFullYear()}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Активные категории
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper className={styles.content}>
          <Box className={styles.toolbar}>
            <TextField
              placeholder="Поиск по названию категории..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchField}
            />

            <FormControl className={styles.sortField}>
              <InputLabel>Сортировка</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                input={<OutlinedInput label="Сортировка" />}
              >
                <MenuItem value="name">По названию</MenuItem>
                <MenuItem value="products">По количеству товаров</MenuItem>
                <MenuItem value="date">По дате создания</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Название категории</TableCell>
                  <TableCell>Количество товаров</TableCell>
                  <TableCell>Примеры товаров</TableCell>
                  <TableCell>Дата создания</TableCell>
                  <TableCell>Дата обновления</TableCell>
                  <TableCell width="100">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => (
                    <TableRow key={category.id} className={styles.tableRow}>
                      <TableCell>
                        <Box className={styles.categoryCell}>
                          <MuiAvatar
                            className={styles.categoryAvatar}
                            sx={{ bgcolor: getCategoryColor(category.name) }}
                          >
                            <CategoryIcon />
                          </MuiAvatar>
                          <Typography
                            variant="subtitle2"
                            className={styles.categoryName}
                          >
                            {category.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className={styles.productsCount}>
                          <Chip
                            label={`${category._count?.products || 0} товаров`}
                            color={getProductsCountColor(
                              category._count?.products || 0
                            )}
                            size="small"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className={styles.productsPreview}>
                          {category.products.slice(0, 3).map((product) => (
                            <Chip
                              key={product.id}
                              label={product.name}
                              variant="outlined"
                              size="small"
                              className={styles.productChip}
                            />
                          ))}
                          {category.products.length > 3 && (
                            <Chip
                              label={`+${category.products.length - 3}`}
                              size="small"
                              className={styles.moreChip}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {category.createdAt.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.createdAt.toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {category.updatedAt.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.updatedAt.toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, category)}
                          className={styles.menuButton}
                        >
                          <MoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCategories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Категорий на странице:"
          />
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.actionMenu}
        >
          <MenuItem onClick={handleEditCategory} className={styles.menuItem}>
            <EditIcon sx={{ mr: 2 }} fontSize="small" />
            Редактировать
          </MenuItem>
          <MenuItem
            onClick={handleDeleteClick}
            className={styles.menuItemDelete}
          >
            <DeleteIcon sx={{ mr: 2 }} fontSize="small" />
            Удалить
          </MenuItem>
        </Menu>

        <Dialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          className={styles.dialog}
        >
          <DialogTitle>Добавить новую категорию</DialogTitle>
          <DialogContent>
            <form
              id="category"
              action={createCategory}
              className={styles.dialogContent}
            >
              <TextField
                label="Название категории"
                fullWidth
                name="name"
                margin="normal"
                placeholder="Введите название категории..."
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialogOpen(false)}>Отмена</Button>
            <Button form="category" type="submit" variant="contained">
              Создать категорию
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={addBrand}
          onClose={() => setAddBrand(false)}
          maxWidth="sm"
          fullWidth
          className={styles.dialog}
        >
          <DialogTitle>Добавить новый бренд</DialogTitle>
          <DialogContent>
            <form
              id="brand"
              action={createBrand}
              className={styles.dialogContent}
            >
              <TextField
                label="Название бренда"
                fullWidth
                name="name"
                margin="normal"
                placeholder="Введите название бренда..."
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddBrand(false)}>Отмена</Button>
            <Button form="brand" type="submit" variant="contained">
              Создать бренд
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          className={styles.dialog}
        >
          {selectedCategory && (
            <>
              <DialogTitle>Редактировать категорию</DialogTitle>
              <DialogContent>
                <Box className={styles.dialogContent}>
                  <TextField
                    label="Название категории"
                    defaultValue={selectedCategory.name}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Описание категории"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    placeholder="Введите описание категории..."
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>Отмена</Button>
                <Button variant="contained">Сохранить изменения</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          className={styles.dialog}
        >
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogContent>
            <Typography>
              Вы уверены, что хотите удалить категорию &quot;
              {selectedCategory?.name}
              &quot;?
              {selectedCategory &&
                selectedCategory._count &&
                selectedCategory._count.products > 0 && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    Внимание: В этой категории находится{' '}
                    {selectedCategory._count.products} товаров. Они будут
                    перемещены в категорию &quot;Без категории&quot;.
                  </Typography>
                )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  )
}

function getCategoryColor(categoryName: string): string {
  const colors = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#4facfe',
    '#43e97b',
    '#38f9d7',
    '#fa709a',
    '#fee140',
    '#a8edea',
    '#fed6e3',
  ]
  const index = categoryName.charCodeAt(0) % colors.length
  return colors[index]
}

function getProductsCountColor(
  count: number
): 'default' | 'primary' | 'secondary' | 'success' {
  if (count === 0) return 'default'
  if (count < 5) return 'secondary'
  if (count < 15) return 'primary'
  return 'success'
}
