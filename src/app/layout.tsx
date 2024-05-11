import { Inter } from 'next/font/google'

import { cn } from '@/app/(utils)/classnames'
export { metadata } from './metadata'
import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'
import { ToastContainer } from 'react-toastify'

import { BaseText, BaseTextLink } from '@/app/(components)/_base/text'
import { GlobalActionButtons } from '@/app/(components)/buttons/global-action-buttons/global-action-buttons'
import { Footer } from '@/app/(components)/footer'
import { NavBar } from '@/app/(components)/nav-bar'
import { PreloadResources } from '@/app/(components)/preload-resources'
import { DISCORD_INVITE_URL } from '@/app/(types)/navigation'

import { SessionProvider } from './(components)/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#581c87',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'relative flex min-h-fit flex-col items-center justify-start',
          inter.className,
        )}
      >
        <PreloadResources />
        <SessionProvider>
          <GlobalActionButtons />
          <div className="w-full bg-red-950 p-1 text-center text-sm">
            <BaseText>
              Item Tracker data now saves to the database if you are logged in.
              Visit the Item Tracker page to trigger the migration of data to
              the database.
              <br />
              <strong>IMPORTANT!!!</strong> If you have been tracking items
              across multiple devices, the <strong>FIRST</strong> device you
              visit the Item Tracker page on is the data that will be written to
              the database. Be sure to visit the Item Tracker page for the first
              time on the device with the most up-to-date data. If you have
              issues, join the{' '}
              <BaseTextLink href={DISCORD_INVITE_URL} target="_blank">
                Toolkit Discord
              </BaseTextLink>{' '}
              for assistance.
            </BaseText>
          </div>
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
        </SessionProvider>
        <Analytics />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}
