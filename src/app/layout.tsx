import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Footer } from '@/features/ui/Footer'
import { cn } from '@/lib/classnames'
export { metadata } from './metadata'
import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'
import { ToastContainer } from 'react-toastify'

import { GlobalActionButtons } from '@/app/(components)/buttons/global-action-buttons/global-action-buttons'
import { NavBar } from '@/app/(components)/nav-bar'
import { PreloadResources } from '@/features/ui/PreloadResources'

import { SessionProvider } from '../features/auth/components/SessionProvider'
import { ThemeSelection } from './(utils)/theme-utils'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-fit flex-col items-center justify-start',
          inter.className,
        )}
      >
        <PreloadResources />
        <SessionProvider>
          <ThemeSelection>
            <GlobalActionButtons />
            {/* <div className="w-full bg-blue-950 p-1 text-center text-sm">
              <BaseText>
                Use the <BaseCode>Include Patch Affected Builds</BaseCode> filter
                to see all patch affected builds! Update your pre-patch builds
                now!
              </BaseText>
            </div> */}
            <div className="flex h-full w-full max-w-7xl grow flex-col items-start justify-start">
              <header className="w-full">
                <NavBar />
              </header>
              <main className="flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
                <ToastContainer pauseOnFocusLoss={false} />
                {children}
              </main>
            </div>
            <Footer />
          </ThemeSelection>
        </SessionProvider>
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}
