'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Typography,
  Chip,
} from '@mui/material'
import { Close, CloudUpload } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { Uploader } from '@/shared/components/uploader/uploader'
import { createProduct } from '@/features/products/actions/actions'
import Image from 'next/image'
import { Brand, Category, Product } from '@prisma/client'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}))

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}))

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 80,
  height: 80,
  borderRadius: 8,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}))

const RemoveImageButton = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 2,
  right: 2,
  backgroundColor: theme.palette.error.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}))

interface CreateProductModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => void
  categories?: Category[]
  brands?: Brand[]
}

export default function CreateProductModal({
  open,
  onClose,
  categories,
  brands,
}: CreateProductModalProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleUpload = (url: string) => {
    setImageUrls((prev) => [...prev, url])
  }

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClose = () => {
    setImageUrls([])
    onClose()
  }

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Typography variant="h6" component="span" fontWeight="600">
          Создать новый продукт
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <form id="createProduct" action={createProduct}>
          <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid size={6}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Основная информация
              </Typography>
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Название продукта"
                name="name"
                placeholder="Введите название продукта"
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Цена"
                type="number"
                name="price"
                placeholder="0.00"
                required
              />
            </Grid>

            <Grid size={6}>
              <FormControl fullWidth required>
                <InputLabel>Категория</InputLabel>
                <Select name="categoryId" label="Категория">
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6}>
              <FormControl fullWidth required>
                <InputLabel>Модель продукта</InputLabel>
                <Select label="Бренд продукта" name="brandId">
                  {brands?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Скидка (%)"
                type="number"
                name="discount"
                placeholder="0"
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Описание"
                name="description"
                placeholder="Подробное описание продукта..."
                required
              />
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Изображения продукта
              </Typography>

              <Uploader onUploadSuccess={handleUpload}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Загрузить изображения
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Uploader>

              {imageUrls.length > 0 && (
                <ImagePreviewContainer>
                  {imageUrls.map((url, index) => (
                    <ImagePreview key={index}>
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        width={200}
                        height={250}
                      />
                      <RemoveImageButton
                        label="×"
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                      />
                    </ImagePreview>
                  ))}
                </ImagePreviewContainer>
              )}

              <input
                type="hidden"
                name="imageUrls"
                value={JSON.stringify(imageUrls)}
              />

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Поддерживаемые форматы: JPG, PNG, WebP. Максимальный размер: 5MB
              </Typography>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined">
          Отмена
        </Button>
        <Button
          form="createProduct"
          type="submit"
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Создать продукт
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}
