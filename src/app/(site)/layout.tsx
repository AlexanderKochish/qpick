import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import QueryProviders from '@/providers/query-provider'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Header from '@/widgets/header/header'
import Footer from '@/widgets/footer/footer'
import { getCurrentSession } from '@/features/auth/actions/actions'
import NextTopLoader from 'nextjs-toploader'
import { ToastProvider } from '@/providers/toast-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Qpick',
  description: 'Online devices shop',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  const session = await getCurrentSession()

  return (
    <QueryProviders>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <NextTopLoader />
            <div className="container">
              <div className="layout">
                <Header isLogged={!!session?.user.id} />
                <ToastProvider position="top-right" maxToasts={3}>
                  <div className="main">{children}</div>
                </ToastProvider>
                <Footer />
              </div>
            </div>
          </body>
        </html>
      </HydrationBoundary>
    </QueryProviders>
  )
}
