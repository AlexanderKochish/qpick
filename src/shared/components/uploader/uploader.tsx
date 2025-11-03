'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import s from './uploader.module.css'

interface AvatarUploaderProps {
  onUploadSuccess: (url: string) => void
  title?: string
}

export function Uploader({ onUploadSuccess, title }: AvatarUploaderProps) {
  const [error, setError] = useState<string>('')

  return (
    <div className={s.container}>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result) => {
          setError('')
          if (typeof result.info === 'object' && 'secure_url' in result.info) {
            onUploadSuccess(result.info.secure_url)
          }
        }}
        onError={(error) => {
          console.error('Upload error:', error)
          setError('Upload failed. Please try again.')
        }}
        options={{
          singleUploadAutoClose: true,
        }}
      >
        {({ open }) => {
          return (
            <div>
              <button type="button" onClick={() => open()} className={s.btn}>
                {title || 'Upload Image'}
              </button>
              {error && <p className={s.error}>{error}</p>}
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
