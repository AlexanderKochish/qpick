import ProfileClient from '@/features/profile/components/profile-client/profile-client'
import { Suspense } from 'react'
import Loading from './loading'
import { getProfile } from '@/features/profile/actions/actions'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
  const profile = await getProfile()

  if (typeof profile === 'string' || !profile) {
    redirect('/auth/sign-in')
  }
  return (
    <Suspense fallback={<Loading />}>
      <ProfileClient profileData={profile} />
    </Suspense>
  )
}

export default ProfilePage
