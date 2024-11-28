import './globals.css';

import { GlobalActionButtons, RootLayout } from '@repo/ui';
import { Analytics } from '@vercel/analytics/react';
import { type Viewport } from 'next';
import dynamic from 'next/dynamic';

import { Footer } from '@/app/_components/footer';
import { showNotificationsFlag } from '@/app/_constants/feature-flag';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { CONFIG } from '@/app/config';
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
        <AlertBanner localStorageKey="build-collections-added">
          Build collections are now live! Click "Add to Collection" button on
          any build to get started! Find collections on your profile!
        </AlertBanner>
      }
      footer={<Footer />}
      navbar={<Navbar showNotifications={showNotifications} />}
      trackers={<Analytics />}
    >
      <GlobalActionButtons
        username={session?.user?.name || 'Unknown User'}
        changeLogUrl={CONFIG.site.urls.changelog || ''}
      />
      {children}
    </RootLayout>
  );
}
