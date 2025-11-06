'use server'

import { Counter } from '../repository/counter.repository'

const repo = new Counter()

export async function getCounters() {
  return await repo.getAllCounters()
}
