import '@repo/ui/styles.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { cn } from '@repo/ui/classnames'
import { PreloadResources } from '@repo/ui/preload-resources'
import { SessionProvider } from '@repo/ui/session-provider'
import { Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {}

const ThemeSelection = dynamic(() => import('@repo/ui/theme/theme-selection'), {
  ssr: false,
})

export async function RootLayout({
  children,
  alertBanner,
  footer,
  navbar,
  trackers,
}: {
  children: React.ReactNode
  alertBanner: React.ReactNode
  footer: React.ReactNode
  navbar: React.ReactNode
  trackers: React.ReactNode
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
            <ToastContainer theme="dark" pauseOnFocusLoss={false} />
            {alertBanner}

            <div className="flex h-full w-full max-w-7xl grow flex-col items-start justify-start">
              <header className="w-full">{navbar}</header>

              <main className="mt-[80px] flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
                {children}
              </main>
            </div>

            {footer}
          </ThemeSelection>
        </SessionProvider>
        {trackers}
      </body>
    </html>
  )
}
