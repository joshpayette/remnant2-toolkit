import { Inter } from 'next/font/google'

import { NavBar } from '@/features/navigation/NavBar'
import { Footer } from '@/features/ui/Footer'
import { cn } from '@/lib/classnames'
export { metadata } from './metadata'
import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'
import { ToastContainer } from 'react-toastify'

import { Link } from '@/app/(components)/base/link'
import { GlobalActionButtons } from '@/app/(components)/buttons/global-action-buttons/global-action-buttons'
import { PreloadResources } from '@/features/ui/PreloadResources'

import { SessionProvider } from '../features/auth/components/SessionProvider'

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
    <html lang="en">
      <body
        className={cn(
          'relative flex min-h-fit flex-col items-center justify-start',
          inter.className,
        )}
      >
        <PreloadResources />
        <SessionProvider>
          <GlobalActionButtons />
          <div className="w-full bg-secondary-900 p-1 text-center text-sm">
            When the DLC launches, all builds will be marked as patch affected.{' '}
            <Link
              href="https://www.reddit.com/r/remnantgame/comments/1c1miwt/all_r2tk_builds_will_be_marked_patch_affected/"
              target="_blank"
              className="underline"
            >
              Find out more here!
            </Link>
            <br />
            We will be working to update the Toolkit after the DLC as quickly as
            we can!
            <br />
            We encourage users to report issues on our{' '}
            <Link
              href="https://discord.gg/kgVaU3zAQ7"
              target="_blank"
              className="underline"
            >
              Discord
            </Link>
            , and contributors on{' '}
            <Link
              href="https://github.com/joshpayette/remnant2-toolkit"
              target="_blank"
              className="underline"
            >
              Github
            </Link>
          </div>
          <div className="flex h-full w-full max-w-7xl grow flex-col items-start justify-start">
            <header className="w-full">
              <NavBar />
            </header>

            <main className="flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
              <ToastContainer theme="dark" />
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
