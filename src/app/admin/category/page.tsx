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
        <input type="text" name="name" />
        <button>Submit</button>
      </form>
      <form action={createModel}>
        <input type="text" name="name" />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AdminCategory
