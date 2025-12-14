'use client'

import { motion } from 'framer-motion'
import styles from './toast.module.css'

import {
  CircleNotifications,
  Info,
  Warning,
  Error,
  CheckCircle,
  Close,
} from '@mui/icons-material'
import { ToastItemProps } from '@/shared/types/types'

const iconMap = {
  success: CheckCircle,
  error: Error,
  warning: Warning,
  info: Info,
  default: Info,
  loading: CircleNotifications,
}

const variantStyles = {
  success: styles.success,
  error: styles.error,
  warning: styles.warning,
  info: styles.info,
  default: styles.default,
  loading: styles.loading,
}

export default function ToastItem({ toast, onClose }: ToastItemProps) {
  const IconComponent = iconMap[toast.type]
  const isProgressBar =
    toast.duration && toast.duration > 0 && toast.type !== 'loading'
  const progressDuration = toast.duration ? toast.duration / 1000 : 5

  const getVariantColor = () => {
    switch (toast.type) {
      case 'success':
        return '#4caf50'
      case 'error':
        return '#f44336'
      case 'warning':
        return '#ff9800'
      case 'info':
        return '#2196f3'
      case 'loading':
        return '#2196f3'
      default:
        return '#757575'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.8,
      }}
      className={`${styles.toast} ${variantStyles[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      {/* Декоративная полоска */}
      <div
        className={styles.toastAccent}
        style={{ backgroundColor: getVariantColor() }}
      />

      <div className={styles.toastContent}>
        <div className={styles.toastIconWrapper}>
          {toast.icon || (
            <IconComponent
              className={`${styles.toastIcon} ${toast.type === 'loading' ? styles.spin : ''}`}
              sx={{
                fontSize: 22,
                ...(toast.type === 'success' && { color: '#4caf50' }),
                ...(toast.type === 'error' && { color: '#f44336' }),
                ...(toast.type === 'warning' && { color: '#ff9800' }),
                ...(toast.type === 'info' && { color: '#2196f3' }),
                ...(toast.type === 'loading' && { color: '#2196f3' }),
                ...(toast.type === 'default' && { color: '#757575' }),
              }}
            />
          )}
        </div>

        <div className={styles.toastText}>
          {toast.title && <h3 className={styles.toastTitle}>{toast.title}</h3>}
          {toast.description && (
            <p className={styles.toastDescription}>{toast.description}</p>
          )}

          {toast.action && (
            <div className={styles.toastActions}>
              <button
                onClick={toast.action.onClick}
                className={styles.toastActionButton}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        {toast.type !== 'loading' && (
          <button
            onClick={onClose}
            className={styles.toastCloseButton}
            aria-label="Закрыть уведомление"
          >
            <Close className={styles.closeIcon} sx={{ fontSize: 18 }} />
          </button>
        )}
      </div>

      {/* Прогресс бар для автозакрытия */}
      {isProgressBar && (
        <div className={styles.progressBarContainer}>
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: progressDuration, ease: 'linear' }}
            className={styles.progressBar}
            style={{ backgroundColor: getVariantColor() }}
          />
        </div>
      )}
    </motion.div>
  )
}
