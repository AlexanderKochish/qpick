import { useState } from 'react'

export const useCopy = (url: string) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return {
    handleCopy,
    copied,
  }
}
