import { Inter } from 'next/font/google'

import { cn } from '@/app/(utils)/classnames'
export { metadata } from './metadata'
import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'
import { ToastContainer } from 'react-toastify'

import { GlobalActionButtons } from '@/app/(components)/buttons/global-action-buttons/global-action-buttons'
import { Footer } from '@/app/(components)/footer'
import { NavBar } from '@/app/(components)/nav-bar'
import { PreloadResources } from '@/app/(components)/preload-resources'

import { SessionProvider } from './(components)/session-provider'
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
            {/* dark selector here is purely for blue vs. cyan/primary color matching - if blue is going to be used more, a palette will be added */}
            {/* <div className="flex w-full flex-wrap items-center justify-center bg-primary-950 dark:bg-blue-950 p-1 text-center text-sm">
              <BaseText className="max-w-[800px]">
                Item Tracker data now saves to the database if you are logged in.
                Visit the Item Tracker page to trigger the migration of data to
                the database. If you have issues, join the{' '}
                <BaseTextLink href={DISCORD_INVITE_URL} target="_blank">
                  Toolkit Discord
                </BaseTextLink>{' '}
                for assistance.
              </BaseText>
            </div> */}
            <div className="flex h-full w-full max-w-7xl grow flex-col items-start justify-start">
              <header className="w-full">
                <NavBar />
              </header>

              <main className="flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
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
