import { ReactNode } from 'react'

export type SortBy = 'newest' | 'price-low' | 'price-high' | 'ratings'

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'
  | 'loading'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface Toast {
  id: string
  title?: string
  description?: string
  type: ToastType
  duration?: number
  icon?: ReactNode
  action?: ToastAction
}

export interface ToastOptions {
  title?: string
  description?: string
  duration?: number
  icon?: ReactNode
  action?: ToastAction
}

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

export interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

export interface CountersData {
  favoritesCount: number
  cartItemsCount: number
}
