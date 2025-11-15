import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      id: '1',
      name: 'Apple Watch Series 9',
      description:
        'Умные часы с расширенными функциями здоровья и фитнес-трекингом',
      price: 41990,
      discount: 8,
      images: [{ id: '1', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '1', name: 'Apple Watch Series 9' },
      ratings: [
        { id: '1', rating: 5 },
        { id: '2', rating: 4 },
      ],
      reviews: [{ id: '1' }],
      createdAt: new Date('2024-03-01'),
      _count: { ratings: 2, reviews: 1 },
    },
    {
      id: '2',
      name: 'Samsung Galaxy Watch 6',
      description:
        'Стильные умные часы с AMOLED-дисплеем и долгим временем работы',
      price: 36990,
      discount: 10,
      images: [{ id: '2', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '2', name: 'Galaxy Watch 6' },
      ratings: [
        { id: '3', rating: 4 },
        { id: '4', rating: 5 },
      ],
      reviews: [{ id: '2' }],
      createdAt: new Date('2024-03-05'),
      _count: { ratings: 2, reviews: 1 },
    },
    {
      id: '3',
      name: 'Xiaomi Smart Band 8',
      description: 'Фитнес-браслет с цветным дисплеем и мониторингом сна',
      price: 4990,
      discount: 5,
      images: [{ id: '3', url: '/api/placeholder/400/400' }],
      category: { id: '2', name: 'Фитнес-трекеры' },
      productModel: { id: '3', name: 'Smart Band 8' },
      ratings: [{ id: '5', rating: 5 }],
      reviews: [{ id: '3' }],
      createdAt: new Date('2024-03-08'),
      _count: { ratings: 1, reviews: 1 },
    },
    {
      id: '4',
      name: 'Garmin Fenix 7',
      description: 'Премиальные спортивные часы с GPS и защитой от воды',
      price: 69990,
      discount: 15,
      images: [{ id: '4', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '4', name: 'Fenix 7' },
      ratings: [
        { id: '6', rating: 5 },
        { id: '7', rating: 5 },
      ],
      reviews: [{ id: '4' }],
      createdAt: new Date('2024-03-10'),
      _count: { ratings: 2, reviews: 1 },
    },
    {
      id: '5',
      name: 'Huawei Watch GT 4',
      description:
        'Часы с длительным временем работы и поддержкой тренировки дыхания',
      price: 29990,
      discount: 12,
      images: [{ id: '5', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '5', name: 'Watch GT 4' },
      ratings: [{ id: '8', rating: 4 }],
      reviews: [{ id: '5' }],
      createdAt: new Date('2024-03-15'),
      _count: { ratings: 1, reviews: 1 },
    },
    {
      id: '6',
      name: 'Fitbit Versa 4',
      description: 'Фитнес-часы с мониторингом сна, тренировок и пульса',
      price: 25990,
      discount: 10,
      images: [{ id: '6', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '6', name: 'Versa 4' },
      ratings: [
        { id: '9', rating: 4 },
        { id: '10', rating: 3 },
      ],
      reviews: [{ id: '6' }],
      createdAt: new Date('2024-03-20'),
      _count: { ratings: 2, reviews: 1 },
    },
    {
      id: '7',
      name: 'Amazfit GTR 4',
      description:
        'Элегантные часы с GPS, AMOLED-дисплеем и водонепроницаемостью',
      price: 21990,
      discount: 7,
      images: [{ id: '7', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '7', name: 'GTR 4' },
      ratings: [{ id: '11', rating: 5 }],
      reviews: [{ id: '7' }],
      createdAt: new Date('2024-03-25'),
      _count: { ratings: 1, reviews: 1 },
    },
    {
      id: '8',
      name: 'Google Pixel Watch 2',
      description: 'Интеграция с Fitbit и Google Assistant, стильный дизайн',
      price: 34990,
      discount: 9,
      images: [{ id: '8', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '8', name: 'Pixel Watch 2' },
      ratings: [{ id: '12', rating: 4 }],
      reviews: [{ id: '8' }],
      createdAt: new Date('2024-04-01'),
      _count: { ratings: 1, reviews: 1 },
    },
    {
      id: '9',
      name: 'OnePlus Watch 2',
      description: 'Часы с поддержкой быстрой зарядки и прочным корпусом',
      price: 28990,
      discount: 6,
      images: [{ id: '9', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '9', name: 'OnePlus Watch 2' },
      ratings: [
        { id: '13', rating: 4 },
        { id: '14', rating: 5 },
      ],
      reviews: [{ id: '9' }],
      createdAt: new Date('2024-04-05'),
      _count: { ratings: 2, reviews: 1 },
    },
    {
      id: '10',
      name: 'Apple Watch SE (2nd Gen)',
      description: 'Доступная версия умных часов Apple с основными функциями',
      price: 29990,
      discount: 10,
      images: [{ id: '10', url: '/api/placeholder/400/400' }],
      category: { id: '1', name: 'Умные часы' },
      productModel: { id: '10', name: 'Apple Watch SE 2' },
      ratings: [
        { id: '15', rating: 5 },
        { id: '16', rating: 4 },
      ],
      reviews: [{ id: '10' }],
      createdAt: new Date('2024-04-10'),
      _count: { ratings: 2, reviews: 1 },
    },
    // ... добавь до 20 аналогично
  ]

  console.log(`Seeding ${products.length} products...`)

  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        discount: p.discount,
        createdAt: p.createdAt,
        category: {
          connectOrCreate: {
            where: { id: p.category.id },
            create: { id: p.category.id, name: p.category.name },
          },
        },
        productModel: {
          connectOrCreate: {
            where: { id: p.productModel.id },
            create: { id: p.productModel.id, name: p.productModel.name },
          },
        },
        images: {
          create: p.images.map((img) => ({
            id: img.id,
            url: img.url,
          })),
        },
        ratings: {
          create: p.ratings.map((r) => ({
            id: r.id,
            rating: r.rating,
          })),
        },
        reviews: {
          create: p.reviews.map((r) => ({ id: r.id })),
        },
      },
    })
  }

  console.log('✅ Seeding completed.')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
