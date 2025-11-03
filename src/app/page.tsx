import Card from '@/shared/components/card/card'
import Title from '@/widgets/title/title'
import s from './page.module.css'
import { getAllProducts } from '@/features/products/actions/actions'
import Link from 'next/link'

export default async function Home() {
  const products = await getAllProducts()
  return (
    <div className="container">
      <Title />
      <div>
        <h3>Чехлы</h3>
        <div className={s.grid}>
          {/* {Array.from({ length: 3 }, (_, i) => i + 1).map((item) => (
            <Card key={item} />
          ))} */}
        </div>
        <h3>Наушники</h3>
        <div className={s.grid}>
          {products.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <Card item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
