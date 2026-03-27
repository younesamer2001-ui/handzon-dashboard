import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Handz On Dashboard',
  description: 'AI-telefonsvarer dashboard for Handz On Bilvask',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
