import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import { cn } from '@/lib/utils'
import Footer from '@/components/Footer'
export { metadata } from './metadata'
import { Analytics } from '@vercel/analytics/react'
import { ToastContainer } from 'react-toastify'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import SessionProvider from '../features/auth/components/SessionProvider'
import BackToTopButton from '../components/BackToTopButton'
import ReportBugButton from '../components/ReportBugButton'

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
          'relative flex min-h-screen flex-col items-center justify-start',
          inter.className,
        )}
      >
        <div className="fixed bottom-[8px] right-[8px] z-20">
          <BackToTopButton />
        </div>
        <div className="fixed bottom-[8px] right-[52px] z-20">
          <ReportBugButton />
        </div>
        <div className="w-full bg-purple-900 p-1 text-center text-sm">
          Community member DangItsBatman unexpectedly passed away. Please
          consider donating{' '}
          <a
            href="https://www.gofundme.com/f/memorial-of-christopher-austin-dangitsbatman"
            target="_blank"
            className="text-green-300 underline"
          >
            to the GoFundMe for his service.
          </a>{' '}
          Thank you!
        </div>

        <SessionProvider>
          <div className="flex w-full max-w-7xl grow flex-col items-start justify-start">
            <header className="w-full">
              <NavBar />
            </header>
            <main className="flex h-full w-full grow flex-col items-center justify-start p-4">
              <ToastContainer theme="dark" />
              {children}
            </main>
          </div>
          <footer className="mt-8 flex w-full items-center justify-center border-t border-purple-900 bg-black p-4 text-left text-sm text-gray-400">
            <Footer />
          </footer>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
