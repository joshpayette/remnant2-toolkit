import './globals.css';

import { GlobalActionButtons, RootLayout } from '@repo/ui';
import { Analytics } from '@vercel/analytics/react';
import { type Viewport } from 'next';
import dynamic from 'next/dynamic';

import { Footer } from '@/app/_components/footer';
import { showNotificationsFlag } from '@/app/_constants/feature-flag';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { Navbar } from '@/app/navbar';
import { RemnantOverseerCTA } from '@/app/remnant-overseer-cta';

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
        null
        // <AlertBanner localStorageKey="one-year-anniversary">
        //   December 17th marks our one year anniversary! Want to win a DLC of
        //   choice?{' '}
        //   <BaseTextLink
        //     href="https://www.reddit.com/r/remnantgame/comments/1hgb5dv/remnant_2_toolkit_one_year_anniversary_giveaway/"
        //     target="_blank"
        //   >
        //     Check out this Reddit thread for a chance to win!
        //   </BaseTextLink>
        // </AlertBanner>
      }
      footer={<Footer />}
      navbar={<Navbar showNotifications={showNotifications} />}
      trackers={<Analytics />}
    >
      <GlobalActionButtons username={session?.user?.name || 'Unknown User'} />
      {/* <RemnantOverseerCTA /> */}
      {children}
    </RootLayout>
  );
}
