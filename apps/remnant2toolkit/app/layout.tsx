import { Inter } from 'next/font/google'

import { cn } from '@/app/(utils)/classnames'
export { metadata } from './metadata'
import './globals.css'
import '@repo/ui/styles.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'

import { BaseTextLink } from '@/app/(components)/_base/text'
import { GlobalActionButtons } from '@/app/(components)/buttons/global-action-buttons/global-action-buttons'
import { Footer } from '@/app/(components)/footer'
import { NavBar } from '@/app/(components)/nav-bar'
import { PreloadResources } from '@/app/(components)/preload-resources'

import { SessionProvider } from './(components)/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {}

const AlertBanner = dynamic(
  () => import('@/app/(components)/alerts/alert-banner.client'),
  {
    ssr: false,
  },
)

const ThemeSelection = dynamic(
  () => import('@/app/(components)/theme-selection.client'),
  {
    ssr: false,
  },
)

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
            <AlertBanner localStorageKey="support-r2tk-alert">
              If you enjoy using R2TK, please consider supporting the site{' '}
              <BaseTextLink href="/support-r2tk">here</BaseTextLink>. The
              majority of monthly costs are paid out of pocket.
            </AlertBanner>
            <div className="flex h-full w-full max-w-7xl grow flex-col items-start justify-start">
              <header className="w-full">
                <NavBar />
              </header>

              <main className="mt-[80px] flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
                <ToastContainer theme="dark" pauseOnFocusLoss={false} />
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
