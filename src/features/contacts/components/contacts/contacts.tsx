import React from 'react'
import s from './contacts.module.css'
import BaseCard from '@/shared/components/base-card/base-card'
import Image from 'next/image'
import contactMap from '../../../../../public/contact-map.jpg'
import { Facebook, Instagram, Linkedin, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'

const Contacts = () => {
  return (
    <div className={s.contacts}>
      <div className={s.contact}>
        <BaseCard>
          <div className={s.contactMap}>
            <h4>Наш офис</h4>
            <Image
              src={contactMap}
              alt="contact map"
              width={720}
              height={425}
            />
            <div>
              <address>
                <strong>Аксай-3а, 62ф, Алматы, Казахстан</strong>
              </address>
              <span>3 этаж 35 кабинет</span>
            </div>
          </div>
        </BaseCard>
        <div className={s.phone}>
          <Phone />
          <a href="#">
            <strong>+380980000000</strong>
          </a>
        </div>
      </div>
      <ul className={s.contactsSocial}>
        <li>
          <Link href={'/'}>
            <BaseCard>
              <Instagram size={40} />
            </BaseCard>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <BaseCard>
              <Facebook size={40} />
            </BaseCard>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <BaseCard>
              <Twitter size={40} />
            </BaseCard>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <BaseCard>
              <Linkedin size={40} />
            </BaseCard>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Contacts
