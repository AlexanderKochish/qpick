import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // --- CATEGORIES ---
  const smartphones = await prisma.category.upsert({
    where: { name: 'smartphones' },
    update: {},
    create: {
      name: 'smartphones',
    },
  })

  const laptops = await prisma.category.upsert({
    where: { name: 'laptops' },
    update: {},
    create: {
      name: 'laptops',
    },
  })

  // --- BRANDS ---
  const apple = await prisma.brand.upsert({
    where: { name: 'Apple' },
    update: {},
    create: {
      name: 'Apple',
    },
  })

  const samsung = await prisma.brand.upsert({
    where: { name: 'Samsung' },
    update: {},
    create: {
      name: 'Samsung',
    },
  })

  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'Latest Apple flagship smartphone.',
      price: 1999,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'iPhone 14',
      description: 'Affordable Apple smartphone.',
      price: 1499,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy S24',
      description: 'Samsung premium flagship.',
      price: 1899,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy A54',
      description: 'Mid-range Samsung smartphone.',
      price: 799,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'iPhone SE (3rd Gen)',
      description: 'Compact Apple smartphone.',
      price: 899,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'MacBook Air M2',
      description: 'Lightweight Apple laptop with M2 chip.',
      price: 1899,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'MacBook Pro 14 M3',
      description: 'Professional laptop for creators.',
      price: 1999,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book 3',
      description: 'Samsung lightweight Windows laptop.',
      price: 999,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book Pro',
      description: 'Premium Samsung ultrabook.',
      price: 1299,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'MacBook Pro 16 M3 Max',
      description: 'Top-tier Apple workstation.',
      price: 1999,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'iPhone 13',
      description: 'Classic reliable Apple phone.',
      price: 1299,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy S23 FE',
      description: 'Fan Edition flagship.',
      price: 1199,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'MacBook Air M1',
      description: 'Legendary Apple ultrabook.',
      price: 1599,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book Flex',
      description: '2-in-1 convertible laptop.',
      price: 1399,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'iPhone 12 Mini',
      description: 'Small powerful smartphone.',
      price: 799,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'iPhone XR',
      description: 'Affordable Apple smartphone.',
      price: 699,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy S21',
      description: 'Versatile Samsung flagship.',
      price: 899,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy S22 Ultra',
      description: 'Flagship with S-Pen support.',
      price: 1299,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy A34',
      description: 'Affordable Samsung smartphone.',
      price: 599,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy A74',
      description: 'Upper mid-range Samsung device.',
      price: 799,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Z Flip 5',
      description: 'Compact foldable smartphone.',
      price: 1799,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Z Fold 5',
      description: 'Premium foldable smartphone.',
      price: 1899,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Note 20',
      description: 'Large display, S-Pen support.',
      price: 999,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy A14',
      description: 'Budget Samsung phone.',
      price: 499,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'iPhone 13 Pro',
      description: 'Pro version with 120Hz screen.',
      price: 1699,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'iPhone 13 Pro Max',
      description: 'Large Pro model with long battery life.',
      price: 1799,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy S20 FE',
      description: 'Earlier Fan Edition Samsung.',
      price: 899,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Note 10+',
      description: 'Legacy Samsung large phone.',
      price: 799,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: [''],
    },

    // LAPTOPS REAL MODELS
    {
      name: 'MacBook Pro 13 M2',
      description: 'Apple M2 Pro level machine.',
      price: 1799,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'MacBook Air 15 M2',
      description: 'Larger Apple Air with M2.',
      price: 1599,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book3 Ultra',
      description: 'Samsung flagship laptop.',
      price: 1899,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book Go2',
      description: 'Successor to Book Go.',
      price: 699,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book2 360',
      description: 'Convertible with touchscreen.',
      price: 1399,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'MacBook Pro 14 M1 Pro',
      description: 'Apple professional laptop.',
      price: 1899,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'MacBook Pro 16 M1 Max',
      description: 'High power Apple laptop.',
      price: 1999,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Chromebook 4+',
      description: 'Budget ChromeOS laptop.',
      price: 399,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book Pro 360',
      description: 'Convertible ultrabook.',
      price: 1499,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: [''],
    },
    {
      name: 'MacBook Air 13 M3',
      description: 'Latest Apple Air with M3.',
      price: 1699,
      categoryId: laptops.id,
      brandId: apple.id,
      images: [''],
    },
    {
      name: 'Samsung Galaxy Book 2 Pro 360',
      description: 'Top convertible Samsung.',
      price: 1799,
      categoryId: laptops.id,
      brandId: samsung.id,
      images: ['36'],
    },
  ]

  for (const product of products) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        brandId: product.brandId,
        images: {
          create: product.images
            .filter((url) => url.trim())
            .map((url) => ({ url })),
        },
      },
    })
    console.log(`✔ Created product: ${created.name}`)
  }

  console.log('🌱 Seed completed!')

  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
