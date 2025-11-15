import ProductDetails from '@/features/admin/components/product-details/product-details'
import { getProductById } from '@/features/products/actions/actions'
import { serializeDecimals } from '@/shared/utils/serializeDecimals'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  const serializableProduct = serializeDecimals(product)
  return <ProductDetails product={serializableProduct} />
}

//  specifications: [
//       { name: 'Экран', value: '6.7" Super Retina XDR' },
//       { name: 'Процессор', value: 'A17 Pro' },
//       { name: 'Память', value: '256 ГБ' },
//       { name: 'Основная камера', value: '48 МП + 12 МП + 12 МП' },
//       { name: 'Фронтальная камера', value: '12 МП' },
//       { name: 'Аккумулятор', value: '4441 мАч' },
//       { name: 'Защита', value: 'Ceramic Shield' },
//       { name: 'Материал корпуса', value: 'Титан' },
//       { name: 'Вес', value: '221 г' },
//       { name: 'Цвет', value: 'Титановый синий' },
//     ],
