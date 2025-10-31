import React from 'react'
import s from './title.module.css'
import Image from 'next/image'
import titlePreview from '../../../public/iPhone-13-Pro-Max-silver-1000x1000 1.png'

const Title = () => {
  return (
    <div className={s.title}>
      <h1>
        Аксессуары для <br />
        Iphone 13 Pro Max
      </h1>
      <Image
        src={titlePreview}
        alt="preview iPhone-13-Pro-max"
        width={321}
        height={226}
      />
    </div>
  )
}

export default Title
