import { Decimal } from '@prisma/client/runtime/library'
export function serializeDecimals<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (obj instanceof Decimal) return obj.toNumber() as any
  if (Array.isArray(obj)) return obj.map(serializeDecimals)
  if (typeof obj === 'object') {
    const result: any = {}
    for (const key in obj) {
      result[key] = serializeDecimals((obj as any)[key])
    }
    return result
  }
  return obj
}
