import {
  createCategory,
  createModel,
} from '@/features/category/actions/actions'
import Link from 'next/link'
import React from 'react'

const AdminCategory = () => {
  return (
    <div>
      <Link href={'/admin'}>Admin</Link>
      <form action={createCategory}>
        <label htmlFor="category">create category</label>
        <input type="text" name="name" id="category" />
        <button>Submit</button>
      </form>
      <form action={createModel}>
        <label htmlFor="model">create model</label>
        <input type="text" name="name" id="model" />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AdminCategory
