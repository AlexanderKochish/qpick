import Card from '@/shared/components/card/card'
import Title from '@/widgets/title/title'
import s from './page.module.css'

export default function Home() {
  return (
    <div className="container">
      <Title />
      <div>
        <h3>Чехлы</h3>
        <div className={s.grid}>
          {Array.from({ length: 3 }, (_, i) => i + 1).map((item) => (
            <Card key={item} />
          ))}
        </div>
        <h3>Наушники</h3>
        <div className={s.grid}>
          {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
            <Card key={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
