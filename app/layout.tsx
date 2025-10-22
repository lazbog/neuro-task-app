import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Neuro Task App',
  description: 'A modern task management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}