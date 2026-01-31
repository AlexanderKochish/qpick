import redis from './redis'

/**
 * @param key — unique key for cache
 * @param fetchFn — function that fetches data from Prisma if cache is empty
 * @param ttl — time to live for cache in seconds (default 1 hour)
 */

export async function getCachedData<T>(key: string, fetchFn: () => Promise<T>) {
  const cached = await redis.get(key)

  if (cached && cached !== 'null' && cached !== 'undefined') {
    return JSON.parse(cached)
  }

  const data = await fetchFn()

  if (data) {
    await redis.set(key, JSON.stringify(data), 'EX', 3600)
  }

  return data
}
