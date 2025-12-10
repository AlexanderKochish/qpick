import { getCurrentSession } from '@/features/auth/actions/actions'
import SignUp from '@/features/auth/components/sign-up/sign-up'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const session = await getCurrentSession()
  if (session?.user) {
    redirect('/')
  }
  return <SignUp />
}
