import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

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
          <nav className="flex flex-wrap items-center justify-between p-6">
            <div className="mr-12 flex items-center text-white">
              <Image
                src="/logo-sm.png"
                width={48}
                height={48}
                alt="Remnant II Toolkit logo"
                className="mr-4"
              />
              <span className="text-xl font-semibold tracking-tight">
                Remnant II Toolkit
              </span>
            </div>
            <div className="mt-4 flex grow items-center justify-start md:mt-0">
              {[
                { href: '/tracker', label: 'Tracker' },
                { href: '/builds', label: 'Builds' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="mr-4 text-lg text-purple-400 underline hover:text-green-400"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
