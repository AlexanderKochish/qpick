import Redis from 'ioredis'

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6380'

const globalForRedis = global as unknown as { redis: Redis }

export const redis =
  globalForRedis.redis ||
  new Redis(REDIS_URL, {
    tls: REDIS_URL.startsWith('rediss://')
      ? { rejectUnauthorized: false }
      : undefined,
    connectTimeout: 10000,
    maxRetriesPerRequest: null,
  })

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

export default redis
