'use client'

import { ToastProvider, useToastContext } from '@/providers/toast-provider'
import ToastItem from './toast-item'

export { ToastProvider, ToastItem, useToastContext }

export function Toast() {
  const { toasts, removeToast } = useToastContext()

  if (toasts.length === 0) return null

  return (
    <div className="toast-global-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
