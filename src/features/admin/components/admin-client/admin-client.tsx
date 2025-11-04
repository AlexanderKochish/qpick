'use client'
import React, { useState } from 'react'
import s from './admin-client.module.css'
import { Uploader } from '@/shared/components/uploader/uploader'
import { createProduct } from '@/features/products/actions/actions'
import Link from 'next/link'

interface AdminClientProps {
  usersCount: number
  productsCount: number
  ordersCount: number
}

const AdminClient = ({
  usersCount,
  productsCount,
  ordersCount,
}: AdminClientProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleUpload = (url: string) => {
    setImageUrls((prev) => [...prev, url])
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Admin Dashboard</h1>

      <div className={s.stats}>
        <div className={s.statCard}>
          <h3 className={s.statTitle}>Users</h3>
          <p className={s.statNumber}>{usersCount}</p>
        </div>
        <div className={s.statCard}>
          <h3 className={s.statTitle}>Products</h3>
          <p className={s.statNumber}>{productsCount}</p>
        </div>
        <div className={s.statCard}>
          <h3 className={s.statTitle}>Orders</h3>
          <p className={s.statNumber}>{ordersCount}</p>
        </div>
      </div>

      <div className={s.wrapper}>
        <Link href={'/admin/category'} className={s.link}>
          Add Category Page
        </Link>

        <form action={createProduct} className={s.form}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className={s.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className={s.input}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className={s.input}
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount"
            className={s.input}
          />

          <Uploader onUploadSuccess={handleUpload} title="Upload Images" />

          <input
            type="hidden"
            name="imageUrls"
            value={JSON.stringify(imageUrls)}
          />

          <input
            type="text"
            name="categoryId"
            placeholder="Category ID"
            className={s.input}
          />
          <input
            type="text"
            name="productModelId"
            placeholder="Model ID"
            className={s.input}
          />

          <button type="submit" className={s.button}>
            Create Product
          </button>
        </form>
      </div>

      <div className={s.actions}>
        <h2 className={s.actionsTitle}>Quick Actions</h2>
        <div className={s.actionsGrid}>
          <a
            href="/admin/products"
            className={`${s.actionButton} ${s.primary}`}
          >
            Manage Products
          </a>
          <a href="/admin/users" className={`${s.actionButton} ${s.success}`}>
            Manage Users
          </a>
          <a href="/admin/orders" className={`${s.actionButton} ${s.warning}`}>
            View Orders
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminClient
