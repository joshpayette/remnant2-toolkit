import './globals.css';

import { GlobalActionButtons } from '@repo/ui/global-action-buttons';
import { RootLayout } from '@repo/ui/pages/root-layout';
import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';
import dynamic from 'next/dynamic';

import { Footer } from '@/app/(components)/footer';
import { getSession } from '@/app/(features)/auth/services/sessionService';
import { showNotificationsFlag } from '@/app/(features)/notifications/feature-flag';
import { Navbar } from '@/app/navbar';

export const viewport: Viewport = {};
export { metadata } from './metadata';

const AlertBanner = dynamic(() => import('@repo/ui/alert-banner'), {
  ssr: false,
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const showNotifications = await showNotificationsFlag();

  return (
    <RootLayout
      alertBanner={
        <AlertBanner localStorageKey="builds-by-collection">
          You can now filter builds by items you own! Use the "include" filter
          and select "Only Owned Items".
        </AlertBanner>
      }
      footer={<Footer />}
      navbar={<Navbar showNotifications={showNotifications} />}
      trackers={<Analytics />}
    >
      <GlobalActionButtons username={session?.user?.name || 'Unknown User'} />
      {children}
    </RootLayout>
  );
}
