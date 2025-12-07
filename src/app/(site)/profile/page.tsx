import ProfileClient from '@/features/profile/components/profile-client/profile-client'
import { Suspense } from 'react'
import Loading from './loading'
import { getProfile } from '@/features/profile/actions/actions'

const ProfilePage = async () => {
  const profile = await getProfile()

  if (profile) {
    return (
      <Suspense fallback={<Loading />}>
        <ProfileClient profileData={profile} />
      </Suspense>
    )
  }
}

export default ProfilePage
