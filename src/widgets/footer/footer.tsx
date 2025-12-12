import s from './footer.module.css'
import Link from 'next/link'
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <h4>Qpick</h4>
      <ul className={s.footerContacts}>
        <li>
          <Link href={'/favorites'}>Избранное</Link>
        </li>
        <li>
          <Link href={'/cart'}>Корзина</Link>
        </li>
        <li>
          <Link href={'/contacts'}>Контакты</Link>
        </li>
      </ul>

      <ul className={s.footerLang}>
        <li>
          <Link href={'/terms-of-service'}>Условия сервиса</Link>
        </li>
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
            <LinkedIn />
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
