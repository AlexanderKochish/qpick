import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token')
  const secureSessionToken = request.cookies.get(
    '__Secure-authjs.session-token'
  )

  const isAuthenticated = !!(sessionToken || secureSessionToken)

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/checkout')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/checkout/:path*', '/admin/:path*'],
}
