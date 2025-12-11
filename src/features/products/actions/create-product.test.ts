import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockCreate = vi.hoisted(() => vi.fn())

vi.mock('../repository/product.repository', () => {
  class MockProductRepository {
    create = mockCreate
  }

  return {
    ProductRepository: MockProductRepository,
  }
})

import { createProduct } from './actions'

describe('createProduct action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCreate.mockReset()
  })

  it('should create product with valid data', async () => {
    mockCreate.mockResolvedValue({ id: 'prod_123' })

    const formData = new FormData()
    formData.append('name', 'Test Product')
    formData.append('description', 'Test Description')
    formData.append('price', '99.99')
    formData.append('discount', '10')
    formData.append('categoryId', 'cat_123')
    formData.append('brandId', 'brand_456')
    formData.append('imageUrls', JSON.stringify(['/img1.jpg']))

    await createProduct(formData)

    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith(
      {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        discount: 10,
        category: { connect: { id: 'cat_123' } },
        brand: { connect: { id: 'brand_456' } },
      },
      ['/img1.jpg']
    )
  })
})
