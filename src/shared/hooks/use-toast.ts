'use client'

import { useToastContext } from '@/providers/toast-provider'
import { ToastOptions, ToastType } from '../types/types'

export function useToast() {
  const { addToast, removeToast, toasts } = useToastContext()

  const toast = (type: ToastType, message: string, options?: ToastOptions) => {
    const { title, description, duration, icon, action } = options || {}

    addToast({
      title: title || message,
      description,
      type,
      duration,
      icon,
      action,
    })
  }

  const success = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    toast('success', message, options)
  }

  const error = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    toast('error', message, options)
  }

  const warning = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    toast('warning', message, options)
  }

  const info = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    toast('info', message, options)
  }

  const loading = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    toast('loading', message, { ...options, duration: 0 })
  }

  const promise = async <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    },
    options?: Omit<ToastOptions, 'type' | 'title' | 'description'>
  ) => {
    const loadingId = Date.now().toString()

    addToast({
      title: messages.loading,
      type: 'loading',
      duration: 0,
    })

    try {
      const data = await promise
      removeToast(loadingId)

      const successMessage =
        typeof messages.success === 'function'
          ? messages.success(data)
          : messages.success

      success(successMessage, options)
      return data
    } catch (err) {
      removeToast(loadingId)

      const errorMessage =
        typeof messages.error === 'function'
          ? messages.error(err)
          : messages.error

      error(errorMessage, options)
      throw err
    }
  }

  return {
    toast,
    success,
    error,
    warning,
    info,
    loading,
    promise,
    dismiss: removeToast,
    dismissAll: () => toasts.forEach((t) => removeToast(t.id)),
  }
}
