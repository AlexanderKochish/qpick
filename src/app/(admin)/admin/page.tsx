import AdminClient from '@/features/admin/components/admin-client/admin-client'
import prisma from '@/shared/lib/prisma'
import { redirect } from 'next/navigation'
import { auth } from '../../../auth'

export default async function AdminPage() {
  // const session = await auth()

  // if (!session) {
  //   redirect('/auth/sign-in')
  // }

  // if (session.user?.role !== 'ADMIN') {
  //   redirect('/')
  // }

  // const usersCount = await prisma.user.count()
  // const productsCount = await prisma.product.count()
  // const ordersCount = await prisma.order.count()

  return (
    <AdminClient
    // usersCount={usersCount}
    // productsCount={productsCount}
    // ordersCount={ordersCount}
    />
  )
}
