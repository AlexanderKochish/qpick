'use server'

import { ProfileRepository } from '../repository/profile.repository'

const repo = new ProfileRepository()

export async function getProfile() {
  return await repo.getProfile()
}
