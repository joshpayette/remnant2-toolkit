import './globals.css';

import { DISCORD_INVITE_URL } from '@repo/constants';
import { BaseTextLink, GlobalActionButtons, RootLayout } from '@repo/ui';
import { Analytics } from '@vercel/analytics/react';
import { type Viewport } from 'next';
import dynamic from 'next/dynamic';

import { Footer } from '@/app/_components/footer';
import { showNotificationsFlag } from '@/app/_constants/feature-flag';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { Navbar } from '@/app/navbar';

import { hasUnreadNotifications } from './(user)/profile/[profileId]/notifications/_actions/has-unread-notifications';

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
  const userId = session?.user?.id;
  const hasUnread = userId ? await hasUnreadNotifications(userId) : false;

  return (
    <RootLayout
      alertBanner={
        <AlertBanner localStorageKey="chat-in-the-discord">
          Participate in in-depth build discussions{' '}
          <BaseTextLink href={DISCORD_INVITE_URL}>on our Discord</BaseTextLink>!
        </AlertBanner>
      }
      footer={<Footer />}
      navbar={<Navbar showNotifications={showNotifications} hasUnread={hasUnread} userId={userId} />}
      trackers={<Analytics />}
    >
      <GlobalActionButtons username={session?.user?.name || 'Unknown User'} />
      {children}
    </RootLayout>
  );
}
