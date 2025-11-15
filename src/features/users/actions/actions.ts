'use server'

import { UserRepository } from '../repository/user.repository'

const repo = new UserRepository()

export async function getAllUsers() {
  return await repo.getAll()
}
