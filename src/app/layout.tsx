import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { type Viewport } from 'next';

import { showNotificationsFlag } from '@/app/_constants/feature-flag';
import { Navbar } from '@/app/navbar';
import { Footer } from '@/components/footer';
import { auth } from '@/lib/auth';
import { GlobalActionButtons } from '@/ui/common/global-action-buttons';
import { RootLayout } from '@/ui/common/root-layout';

export const viewport: Viewport = {};
export { metadata } from './metadata';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
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
