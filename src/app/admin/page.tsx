'use client'
import React, { useState } from 'react'
import s from './page.module.css'
import { Uploader } from '@/shared/components/uploader/uploader'
import { createProduct } from '@/features/products/actions/actions'
import Link from 'next/link'

const AdminPage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleUpload = (url: string) => {
    setImageUrls((prev) => [...prev, url])
  }
  return (
    <div className={s.wrapper}>
      <Link href={'/admin/category'}>add category page</Link>
      <form action={createProduct} className={s.form}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="description" placeholder="description" />
        <input type="text" name="price" placeholder="price" />
        <input type="text" name="discount" placeholder="discount" />
        <Uploader onUploadSuccess={handleUpload} title="Upload" />

        <input
          type="hidden"
          name="imageUrls"
          value={JSON.stringify(imageUrls)}
        />
        <input type="text" name="categoryId" placeholder="categoryId" />
        <input type="text" name="productModelId" placeholder="modelId" />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AdminPage
