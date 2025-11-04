'use server'

import { cookies } from 'next/headers'

export async function generateVisitorId(): Promise<string> {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return `visitor_${timestamp}_${random}`.substring(0, 32)
}

export async function getServerVisitorId(): Promise<string> {
  const cookieStore = await cookies()

  let visitorId = cookieStore.get('visitor_id')?.value

  if (!visitorId) {
    visitorId = await generateVisitorId()
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
