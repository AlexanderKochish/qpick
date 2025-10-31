'use client'
import React, { useState, useRef, useEffect } from 'react'
import s from './header.module.css'
import Link from 'next/link'
import { Badge, Button } from '@mui/material'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import {
  ShoppingCart,
  Heart,
  Tablet,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

const Header = () => {
  const [isTreeOpen, setIsTreeOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleTreeToggle = () => setIsTreeOpen((prev) => !prev)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsTreeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logoSide}>
          <Link href="/" className={s.logo}>
            <span className={s.logo}>Qpick</span>
          </Link>

          <div className={s.dropdownContainer}>
            <Button
              ref={buttonRef}
              variant="text"
              onClick={handleTreeToggle}
              sx={{
                color: 'black',
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              <Tablet />{' '}
              <span className={s.selectText}>Выбрать модель телефона</span>
              {isTreeOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>

            {isTreeOpen && (
              <div ref={dropdownRef} className={s.dropdown}>
                <SimpleTreeView>
                  <TreeItem itemId="apple" label="Apple iPhone">
                    <TreeItem itemId="iphone-16" label="iPhone 16 серия">
                      <TreeItem itemId="16-pro-max" label="iPhone 16 Pro Max" />
                      <TreeItem itemId="16-pro" label="iPhone 16 Pro" />
                      <TreeItem itemId="16-plus" label="iPhone 16 Plus" />
                      <TreeItem itemId="16" label="iPhone 16" />
                    </TreeItem>
                    <TreeItem itemId="iphone-15" label="iPhone 15 серия">
                      <TreeItem itemId="15-pro-max" label="iPhone 15 Pro Max" />
                      <TreeItem itemId="15-pro" label="iPhone 15 Pro" />
                      <TreeItem itemId="15-plus" label="iPhone 15 Plus" />
                      <TreeItem itemId="15" label="iPhone 15" />
                    </TreeItem>
                  </TreeItem>

                  <TreeItem itemId="samsung" label="Samsung">
                    <TreeItem itemId="galaxy-s" label="Galaxy S серия" />
                    <TreeItem itemId="galaxy-a" label="Galaxy A серия" />
                    <TreeItem itemId="galaxy-z" label="Galaxy Z серия" />
                  </TreeItem>

                  <TreeItem itemId="xiaomi" label="Xiaomi" />
                  <TreeItem itemId="oppo" label="Oppo" />
                  <TreeItem itemId="vivo" label="Vivo" />
                  <TreeItem itemId="realme" label="Realme" />
                  <TreeItem itemId="sony" label="Sony" />
                  <TreeItem itemId="nokia" label="Nokia" />
                  <TreeItem itemId="inoi" label="INOI" />
                </SimpleTreeView>
              </div>
            )}
          </div>
        </div>

        <div className={s.actions}>
          <Badge
            badgeContent={3}
            color="warning"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#FFA542',
                color: '#fff',
                top: 4,
                right: 4,
                fontSize: '0.65rem',
                height: 18,
                minWidth: 18,
                borderRadius: '50%',
              },
            }}
          >
            <Button
              variant="outlined"
              sx={{
                minWidth: 42,
                minHeight: 42,
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                color: 'white',
              }}
            >
              <Heart color="#838383" size={22} strokeWidth={1.8} />
            </Button>
          </Badge>

          <Badge
            badgeContent={5}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#FFA542',
                color: '#fff',
                top: 4,
                right: 4,
                fontSize: '0.65rem',
                height: 18,
                minWidth: 18,
                borderRadius: '50%',
              },
            }}
          >
            <Button
              variant="outlined"
              sx={{
                minWidth: 42,
                minHeight: 42,
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                color: 'white',
              }}
            >
              <ShoppingCart color="#838383" size={22} strokeWidth={1.8} />
            </Button>
          </Badge>
        </div>
      </div>
    </header>
  )
}

export default Header
