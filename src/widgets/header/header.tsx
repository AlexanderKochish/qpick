'use client'
import { useState, useRef, useEffect } from 'react'
import s from './header.module.css'
import Link from 'next/link'
import { Badge, Button, IconButton } from '@mui/material'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import {
  ShoppingCart,
  Heart,
  Tablet,
  ChevronUp,
  ChevronDown,
  Menu,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getAllProductModel } from '@/features/products/actions/actions'
import { useCounters } from '@/shared/hooks/useCounters'

interface Props {
  initialCounters: {
    favoritesCount: number
    cartItemsCount: number
  }
}

const Header = ({ initialCounters }: Props) => {
  const [isTreeOpen, setIsTreeOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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

  const { data: counters } = useCounters(initialCounters)

  const { data: models } = useQuery({
    queryKey: ['product-models'],
    queryFn: getAllProductModel,
  })

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
                  {models?.length &&
                    models?.map((model) => (
                      <TreeItem
                        key={model.id}
                        itemId="apple"
                        label={model.name}
                      >
                        {model.products.map((item) => (
                          <TreeItem
                            key={item.id}
                            itemId={item.id}
                            label={item.name}
                          />
                        ))}
                      </TreeItem>
                    ))}
                </SimpleTreeView>
              </div>
            )}
          </div>
        </div>

        <div className={s.actions}>
          <Badge
            badgeContent={counters?.favoritesCount ?? 0}
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
            <Link href={'/favorites'}>
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
            </Link>
          </Badge>

          <Badge
            badgeContent={counters?.cartItemsCount ?? 0}
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
            <Link href={'/cart'}>
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
            </Link>
          </Badge>
          <IconButton
            sx={{
              display: { xs: 'flex', sm: 'none' },
            }}
            className={s.mobMenu}
          >
            <Menu size={22} />
          </IconButton>
        </div>
      </div>
    </header>
  )
}

export default Header
