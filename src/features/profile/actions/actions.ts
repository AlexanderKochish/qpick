'use server'

import { signOut } from '../../../../auth'
import { ProfileRepository } from '../repository/profile.repository'

const repo = new ProfileRepository()

export async function getProfile() {
  return await repo.getProfile()
}

export async function logout() {
  await signOut({ redirectTo: '/' })
}
