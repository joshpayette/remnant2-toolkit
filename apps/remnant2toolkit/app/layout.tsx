import './globals.css';

import { BaseTextLink, GlobalActionButtons, RootLayout } from '@repo/ui';
import { Analytics } from '@vercel/analytics/react';
import { type Viewport } from 'next';
import dynamic from 'next/dynamic';

import { Footer } from '@/app/_components/footer';
import { showNotificationsFlag } from '@/app/_constants/feature-flag';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
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
        <AlertBanner localStorageKey="dlc-submission-cta">
          DLC drops today! Please submit your discovery screenshots and details{' '}
          <BaseTextLink href="https://discord.com/invite/BEan7bgvuF">
            to the Remnant.wiki
          </BaseTextLink>{' '}
          in order to get it into the Toolkit for community use!{' '}
          <BaseTextLink href="https://discord.com/invite/BEan7bgvuF">
            Join now!
          </BaseTextLink>
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
