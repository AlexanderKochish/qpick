import Card from '@/features/products/components/card/card'
import Title from '@/widgets/title/title'
import s from './page.module.css'
import { getAllByCategory } from '@/features/products/actions/actions'

export default async function Home() {
  const products = await getAllByCategory()
  return (
    <section className={s.home}>
      <Title />
      <div>
        {products &&
          products.map(({ id, name, products }) => (
            <div key={id} className={s.product}>
              <h3>{name}</h3>
              <div className={s.grid}>
                {products.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
