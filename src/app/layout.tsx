import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Remnant II Toolkit',
  description: 'Utilities for Remnant II',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <NavBar />
        </header>
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
