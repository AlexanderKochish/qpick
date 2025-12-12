'use client'

import { Key, useState } from 'react'
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
  Avatar as MuiAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Rating as MuiRating,
} from '@mui/material'
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import styles from './page.module.css'
import AdminLayout from '../layout'
import CreateProductModal from '@/features/admin/components/create-product/create-product'
import { useCategory } from '@/features/category/hooks/useCategory'
import { useProductModel } from '@/features/products/hooks/use-product-model'
import { useProducts } from '@/features/products/hooks/use-products'
import { ProductWithRelations } from '@/features/products/types/types'
import { Product, Rating } from '@prisma/client'

export default function ProductsPage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithRelations | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: categories } = useCategory()
  const { data: products } = useProducts()
  const { data: brands } = useProductModel()

  const handleCreateProduct = (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    console.log('Создание продукта:', productData)
  }

  if (!products) {
    return null
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    product: ProductWithRelations
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedProduct(product)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewProduct = () => {
    setViewDialogOpen(true)
    handleMenuClose()
  }

  const handleEditProduct = () => {
    setEditDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteConfirm = () => {
    console.log('Удалить товар:', selectedProduct?.id)
    setDeleteDialogOpen(false)
    setSelectedProduct(null)
  }

  const calculateAverageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((acc, rating) => acc + Number(rating.rating), 0)
    return sum / ratings.length
  }

  const calculateFinalPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price * (1 - discount / 100)
  }

  return (
    <AdminLayout>
      <Box className={styles.productsContainer}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Управление товарами
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить товар
          </Button>
        </Box>

        <Grid container spacing={2} className={styles.statsGrid}>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <InventoryIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {products.length}
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
                <CategoryIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {new Set(products.map((p) => p.category.id)).size}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Категорий
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <StarIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {products.filter((p) => p.ratings.length > 0).length}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Товаров с оценками
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={3}>
            <Card className={styles.statCard}>
              <CardContent className={styles.statContent}>
                <ImageIcon className={styles.statIcon} />
                <Typography variant="h4" className={styles.statNumber}>
                  {products.filter((p) => p.discount && p.discount > 0).length}
                </Typography>
                <Typography variant="body2" className={styles.statLabel}>
                  Со скидкой
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper className={styles.content}>
          <Box className={styles.toolbar}>
            <TextField
              placeholder="Поиск по названию, описанию или категории..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchField}
            />
          </Box>

          <TableContainer>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Товар</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Рейтинг</TableCell>
                  <TableCell>Отзывы</TableCell>
                  <TableCell>Продажи</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell width="100">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => {
                    const avgRating = calculateAverageRating(product.ratings)
                    const finalPrice = calculateFinalPrice(
                      Number(product.price),
                      Number(product.discount)
                    )

                    return (
                      <TableRow key={product.id} className={styles.tableRow}>
                        <TableCell>
                          <Box className={styles.productCell}>
                            <MuiAvatar
                              src={product.images[0]?.url}
                              variant="rounded"
                              sx={{ width: 50, height: 50 }}
                              className={styles.productImage}
                            >
                              <ImageIcon />
                            </MuiAvatar>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                className={styles.productName}
                              >
                                {product.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                className={styles.productDescription}
                              >
                                {product.description.slice(0, 60)}...
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.category.name}
                            size="small"
                            className={styles.categoryChip}
                          />
                        </TableCell>
                        <TableCell>
                          <Box className={styles.priceCell}>
                            {product.discount && product.discount > 0 ? (
                              <>
                                <Typography
                                  variant="subtitle2"
                                  className={styles.finalPrice}
                                >
                                  {finalPrice.toLocaleString()} ₽
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className={styles.originalPrice}
                                >
                                  {product.price.toLocaleString()} ₽
                                </Typography>
                                <Chip
                                  label={`-${product.discount}%`}
                                  color="error"
                                  size="small"
                                  className={styles.discountChip}
                                />
                              </>
                            ) : (
                              <Typography variant="subtitle2">
                                {product.price.toLocaleString()} ₽
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className={styles.ratingCell}>
                            <MuiRating
                              value={avgRating}
                              readOnly
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({product.ratings.length})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {product.reviews.length}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {product._count?.orderItems || 0}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label="В наличии"
                            color="success"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(e) =>
                              handleMenuOpen(e, product as ProductWithRelations)
                            }
                            className={styles.menuButton}
                          >
                            <MoreIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Товаров на странице:"
          />
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.actionMenu}
        >
          <MenuItem onClick={handleViewProduct} className={styles.menuItem}>
            <ViewIcon sx={{ mr: 2 }} fontSize="small" />
            Просмотреть
          </MenuItem>
          <MenuItem onClick={handleEditProduct} className={styles.menuItem}>
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
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
          className={styles.dialog}
        >
          {selectedProduct && (
            <>
              <DialogTitle className={styles.dialogTitle}>
                <Typography variant="h5">{selectedProduct.name}</Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3} sx={{ pt: 2 }}>
                  <Grid size={5}>
                    <Box className={styles.imageGallery}>
                      <MuiAvatar
                        src={selectedProduct.images[0]?.url}
                        variant="rounded"
                        sx={{ width: '100%', height: 350 }}
                        className={styles.mainImage}
                      >
                        <ImageIcon sx={{ fontSize: 64 }} />
                      </MuiAvatar>
                      <Box className={styles.thumbnailContainer}>
                        {selectedProduct.images.map(
                          (image: {
                            id: Key | null | undefined
                            url: string | undefined
                          }) => (
                            <MuiAvatar
                              key={image.id}
                              src={image.url}
                              variant="rounded"
                              sx={{ width: 60, height: 60 }}
                              className={styles.thumbnail}
                            />
                          )
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={6}>
                    <Box className={styles.productInfo}>
                      <Typography variant="h6" gutterBottom>
                        Основная информация
                      </Typography>

                      <Box className={styles.infoItem}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Категория:
                        </Typography>
                        <Chip
                          label={selectedProduct.category.name}
                          size="small"
                        />
                      </Box>

                      <Box className={styles.infoItem}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Модель:
                        </Typography>
                        <Typography variant="body2">
                          {selectedProduct.brand.name}
                        </Typography>
                      </Box>

                      <Box className={styles.infoItem}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Цена:
                        </Typography>
                        <Box className={styles.priceInfo}>
                          {selectedProduct.discount &&
                          selectedProduct.discount > 0 ? (
                            <>
                              <Typography
                                variant="h6"
                                className={styles.finalPrice}
                              >
                                {calculateFinalPrice(
                                  Number(selectedProduct.price),
                                  selectedProduct.discount
                                ).toLocaleString()}{' '}
                                €
                              </Typography>
                              <Typography
                                variant="body2"
                                className={styles.originalPrice}
                              >
                                {selectedProduct.price.toLocaleString()} €
                              </Typography>
                              <Chip
                                label={`Скидка ${selectedProduct.discount}%`}
                                color="error"
                                size="small"
                              />
                            </>
                          ) : (
                            <Typography variant="h6">
                              {selectedProduct.price.toLocaleString()} €
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Box className={styles.infoItem}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Рейтинг:
                        </Typography>
                        <Box className={styles.ratingInfo}>
                          <MuiRating
                            value={calculateAverageRating(
                              selectedProduct.ratings
                            )}
                            readOnly
                          />
                          <Typography variant="body2">
                            ({selectedProduct.ratings.length} оценок)
                          </Typography>
                        </Box>
                      </Box>

                      <Box className={styles.stats}>
                        <Box className={styles.stat}>
                          <Typography variant="h6">
                            {selectedProduct.reviews.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Отзывов
                          </Typography>
                        </Box>
                        <Box className={styles.stat}>
                          <Typography variant="h6">
                            {selectedProduct._count?.orderItems || 0}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Продаж
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={10}>
                    <Typography variant="h6" gutterBottom>
                      Описание
                    </Typography>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="body1">
                          {selectedProduct.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setViewDialogOpen(false)}>
                  Закрыть
                </Button>
                <Button variant="contained">Редактировать товар</Button>
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
              Вы уверены, что хотите удалить товар &quot;{selectedProduct?.name}
              &quot;? Это действие нельзя отменить.
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
      <CreateProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProduct}
        categories={categories}
        brands={brands}
      />
    </AdminLayout>
  )
}
