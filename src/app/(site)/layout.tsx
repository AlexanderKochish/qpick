import type { Metadata } from 'next'
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
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
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
          <body className={`${inter.className} ${inter.variable}`}>
            <ToastProvider position="top-right" maxToasts={3}>
              <NextTopLoader />
              <div className="container">
                <div className="layout">
                  <Header isLogged={!!session?.user.id} />
                  <div className="main">{children}</div>
                  <Footer />
                </div>
              </div>
            </ToastProvider>
          </body>
        </html>
      </HydrationBoundary>
    </QueryProviders>
  )
}
