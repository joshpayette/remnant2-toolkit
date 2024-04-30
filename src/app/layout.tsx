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

import { BaseCode, BaseText } from '@/app/(components)/_base/text'
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
