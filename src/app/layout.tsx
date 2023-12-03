import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import './globals.css'
import FavIcon from './FavIcon'

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
          <FavIcon />
          <NavBar />
        </header>
        <main className="flex min-h-screen w-full flex-col items-center justify-start p-4 pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}
