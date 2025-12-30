import React from 'react'
import '../../(site)/globals.css'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import QueryProviders from '@/providers/query-provider'

export default async function AuthMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <QueryProviders>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <html lang="en">
          <body>
            <main> {children} </main>
          </body>
        </html>
      </HydrationBoundary>
    </QueryProviders>
  )
}
