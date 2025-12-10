import { getCurrentSession } from '@/features/auth/actions/actions'
import SignIn from '@/features/auth/components/sign-in/sign-in'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getCurrentSession()
  if (session?.user) {
    redirect('/')
  }
  return <SignIn />
}
