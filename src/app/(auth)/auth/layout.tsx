import React from 'react'
import '../../(site)/globals.css'

export default async function AuthMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <main> {children} </main>
      </body>
    </html>
  )
}
