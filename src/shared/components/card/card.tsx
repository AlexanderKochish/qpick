import s from './card.module.css'
import Image from 'next/image'
import { Heart } from 'lucide-react'

interface Props {
  item: {
    images: {
      id: string
      url: string
    }[]
    name: string
    price: number
  }
}

const Card = ({ item }: Props) => {
  return (
    <div className={s.card}>
      <div>
        <Heart color="#1C1C27" />
      </div>
      <div className={s.img}>
        <Image
          src={item?.images[0].url}
          width={250}
          height={250}
          alt="airpods"
        />
      </div>
      <div className={s.info}>
        <div className={s.name}>{item?.name}</div>
        <div className={s.price}>{item?.price} $</div>
      </div>
    </div>
  )
}

export default Card
