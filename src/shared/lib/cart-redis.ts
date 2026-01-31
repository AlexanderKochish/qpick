import redis from './redis'

export const cartRedis = {
  addItem: async (userId: string, productId: string, quantity: number) => {
    const key = `cart:${userId}`
    return await redis.hincrby(key, productId, quantity)
  },

  getCart: async (userId: string) => {
    const key = `cart:${userId}`
    const items = await redis.hgetall(key)
    return items
  },

  removeItem: async (userId: string, productId: string) => {
    const key = `cart:${userId}`
    return await redis.hdel(key, productId)
  },
}
