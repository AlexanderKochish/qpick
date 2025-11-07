import React from 'react'
import s from './title.module.css'
import Image from 'next/image'
import titlePreview from '../../../public/iPhone-13-Pro-Max-silver-1000x1000 1.png'

const Title = () => {
  return (
    <div className={s.title}>
      <div className={s.titleContent}>
        <h1 className={s.titleText}>
          Аксессуары для <br className={s.mobileBr} />
          Iphone 13 Pro Max
        </h1>
        <div className={s.imageWrapper}>
          <Image
            src={titlePreview}
            alt="preview iPhone-13-Pro-max"
            width={321}
            height={226}
            className={s.titleImage}
            sizes="(max-width: 480px) 150px, (max-width: 768px) 200px, 321px"
            quality={85}
          />
        </div>
      </div>
    </div>
  )
}

export default Title
