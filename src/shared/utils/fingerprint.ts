import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs'
import { cookies } from 'next/headers'

let fpPromise: Promise<Agent> | null = null

function getFingerprint() {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load()
  }
  return fpPromise
}

export function generateVisitorId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return `visitor_${timestamp}_${random}`.substring(0, 32)
}

export async function getStableVisitorId(): Promise<string> {
  if (typeof window === 'undefined') {
    return await getServerVisitorId()
  }

  try {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('visitor_id='))
      ?.split('=')[1]

    if (cookieValue) {
      return decodeURIComponent(cookieValue)
    }

    const fp = await getFingerprint()
    const result = await fp.get()
    const visitorId = `visitor_${result.visitorId}`

    document.cookie = `visitor_id=${encodeURIComponent(visitorId)}; max-age=${60 * 60 * 24 * 365}; path=/; sameSite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''}`

    if (process.env.NODE_ENV === 'development') {
      console.log('New stable visitor ID created:', visitorId)
    }

    return visitorId
  } catch (error) {
    console.warn('FingerprintJS failed, using fallback ID:', error)

    const fallbackId = generateVisitorId()
    document.cookie = `visitor_id=${encodeURIComponent(fallbackId)}; max-age=${60 * 60 * 24 * 365}; path=/; sameSite=lax`

    return fallbackId
  }
}

export async function getServerVisitorId(): Promise<string> {
  const cookieStore = await cookies()

  let visitorId = cookieStore.get('visitor_id')?.value

  if (!visitorId) {
    visitorId = generateVisitorId()
    cookieStore.set('visitor_id', visitorId, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
    })
  }

  return visitorId
}

export async function getOrCreateVisitorId(): Promise<string> {
  return await getServerVisitorId()
}
