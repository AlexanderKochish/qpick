import s from './card.module.css'
import Image from 'next/image'
import airpods from '../../../../public/airpods.png'
import { Heart } from 'lucide-react'

const Card = () => {
  return (
    <div className={s.card}>
      <div>
        <Heart color="#1C1C27" />
      </div>
      <div className={s.img}>
        <Image src={airpods} width={250} height={250} alt="airpods" />
      </div>
      <div className={s.info}>
        <div className={s.name}>Apple BYZ S852I</div>
        <div className={s.price}>2200 $</div>
      </div>
    </div>
  )
}

export default Card
