import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mekkern — AI Dashboard',
  description: 'AI-telefonsvarer dashboard for Mekkern Bilverksted',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
