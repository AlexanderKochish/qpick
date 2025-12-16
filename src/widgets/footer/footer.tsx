import s from './footer.module.css'
import Link from 'next/link'
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <h4>TechDevices</h4>
      <ul className={s.footerContacts}>
        <li>
          <Link href={'/favorites'}>Favorites</Link>
        </li>
        <li>
          <Link href={'/cart'}>Cart</Link>
        </li>
        <li>
          <Link href={'/contacts'}>Contacts</Link>
        </li>
      </ul>

      <div className={s.footerLang}>
        <span className={s.terms}>
          {' '}
          <Link href={'/terms-of-service'}>Terms of Service</Link>
        </span>
      </div>

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
