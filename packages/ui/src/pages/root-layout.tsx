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
          'ui-relative ui-flex ui-min-h-fit ui-flex-col ui-items-center ui-justify-start',
          inter.className,
        )}
      >
        <PreloadResources />
        <SessionProvider>
          <ThemeSelection>
            <ToastContainer theme="dark" pauseOnFocusLoss={false} />
            {alertBanner}

            <div className="ui-h-full ui-w-full ui-justify-start ui-items-start ui-flex-col ui-flex ui-max-w-[1500px] ui-grow">
              <header className="ui-w-full">{navbar}</header>

              <main className="ui-mt-[80px] ui-flex ui-h-full ui-min-h-screen ui-w-full ui-grow ui-flex-col ui-items-center ui-justify-start ui-p-4 ui-pt-0">
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
