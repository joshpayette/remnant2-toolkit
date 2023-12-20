import { Inter } from 'next/font/google'
import NavBar from '@/app/(components)/NavBar'
import { cn } from '@/app/(lib)/utils'
import Footer from '@/app/(components)/Footer'
export { metadata } from './metadata'
import { Analytics } from '@vercel/analytics/react'
import { ToastContainer } from 'react-toastify'
import SessionProvider from './(components)/SessionProvider'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import SessionStatus from './(components)/SessionStatus'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col items-center justify-start',
          inter.className,
        )}
      >
        <div className="flex w-full max-w-7xl grow flex-col items-start justify-start">
          <header className="w-full">
            <NavBar />
          </header>
          <main className="flex h-full w-full grow flex-col items-center justify-start p-4">
            <SessionProvider>
              <div className="my-4 flex w-full max-w-7xl flex-grow flex-col items-center justify-start bg-green-900 p-2 text-sm">
                {`I'm happy to announce that community build submissions and voting is in development. Stay tuned!`}
              </div>
              <ToastContainer theme="dark" />
              {children}
            </SessionProvider>
          </main>
        </div>
        <footer className="mt-8 flex w-full items-center justify-center border-t border-purple-900 bg-black p-4 text-left text-sm text-gray-400">
          <Footer />
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
