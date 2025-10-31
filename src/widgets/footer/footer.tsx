import React from 'react'
import s from './footer.module.css'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <h4>Qpick</h4>
      <ul className={s.footerContacts}>
        <li>
          <Link href={'/'}>Избранное</Link>
        </li>
        <li>
          <Link href={'/'}>Корзина</Link>
        </li>
        <li>
          <Link href={'/'}>Контакты</Link>
        </li>
      </ul>

      <ul className={s.footerLang}>
        <li>Условия сервиса</li>
        <li>
          <div>Каз</div>
          <div>Укр</div>
          <div>Eng</div>
        </li>
      </ul>

      <ul className={s.footerSocial}>
        <li>
          <Link href={'/'}>
            <Instagram />
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            {' '}
            <Facebook />
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            {' '}
            <Twitter />
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            {' '}
            <Linkedin />
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
