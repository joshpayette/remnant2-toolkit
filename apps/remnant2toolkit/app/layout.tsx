import './globals.css'

import { BaseTextLink } from '@repo/ui/base/text'
import { GlobalActionButtons } from '@repo/ui/global-action-buttons'
import { RootLayout } from '@repo/ui/pages/root-layout'
import { Analytics } from '@vercel/analytics/react'
import { Viewport } from 'next'
import dynamic from 'next/dynamic'

import { Footer } from '@/app/(components)/footer'
import { Navbar } from '@/app/(components)/navbar'
import { getServerSession } from '@/app/(features)/auth'

export const viewport: Viewport = {}
export { metadata } from './metadata'

const AlertBanner = dynamic(() => import('@repo/ui/alert-banner'), {
  ssr: false,
})

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <RootLayout
      alertBanner={
        <AlertBanner localStorageKey="support-r2tk-alert2">
          If you enjoy using Remnant2Toolkit, please consider{' '}
          <BaseTextLink href="/support-r2tk">
            supporting the site here
          </BaseTextLink>
          . The monthly costs are paid out of pocket by the developer.
        </AlertBanner>
      }
      footer={<Footer />}
      navbar={<Navbar />}
      trackers={<Analytics />}
    >
      <GlobalActionButtons username={session?.user?.name || 'Unknown User'} />
      {children}
    </RootLayout>
  )
}
