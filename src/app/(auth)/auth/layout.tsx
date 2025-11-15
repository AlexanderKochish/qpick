import '../../(site)/globals.css'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
