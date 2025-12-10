'use server'

import { getCurrentSession } from '@/features/auth/actions/actions'
import { signOut } from '../../../../auth'
import { ProfileRepository } from '../repository/profile.repository'

const repo = new ProfileRepository()

export async function getProfile(): Promise<
  string | Awaited<ReturnType<ProfileRepository['getProfile']>>
> {
  try {
    const session = await getCurrentSession()

    if (!session?.user) {
      throw new Error('Session is invalid')
    }
    return await repo.getProfile(session.user.id)
  } catch (error) {
    return error instanceof Error ? error.message : 'Unknown error'
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' })
}
