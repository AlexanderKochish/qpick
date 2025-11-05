import Card from '@/features/products/components/card/card'
import Title from '@/widgets/title/title'
import s from './page.module.css'
import { getAllByCategory } from '@/features/products/actions/actions'

export default async function Home() {
  const products = await getAllByCategory()
  return (
    <div className="container">
      <Title />
      <div>
        {products &&
          products.map(({ id, name, products }) => (
            <div key={id}>
              <h3>{name}</h3>
              <div className={s.grid}>
                {products.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
