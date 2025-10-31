import s from './empty-state.module.css'
import Image, { StaticImageData } from 'next/image'

interface Props {
  img?: StaticImageData
  title?: string
  description?: string
  width?: number
  height?: number
}

const EmptyState = ({
  img,
  title,
  description,
  width = 400,
  height = 315,
}: Props) => {
  return (
    <div className={s.emptyState}>
      <div className={s.content}>
        {img && (
          <Image src={img} width={width} height={height} alt="empty state" />
        )}
        {title && <div className={s.title}>{title}</div>}
        {description && <p className={s.desc}>{description}</p>}
      </div>
    </div>
  )
}

export default EmptyState
