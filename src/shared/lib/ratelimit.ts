import redis from './redis'

export const paymentRateLimit = {
  limit: async (identifier: string) => {
    const key = `ratelimit:payment:${identifier}`
    const limit = 5
    const windowSeconds = 10

    const [count] = (await redis
      .multi()
      .incr(key)
      .expire(key, windowSeconds)
      .exec()) as [[null, number], [null, number]]

    const currentUsage = count[1]

    return {
      success: currentUsage <= limit,
      limit,
      remaining: Math.max(0, limit - currentUsage),
      reset: windowSeconds,
    }
  },
}
