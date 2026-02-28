import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { type Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import { showNotificationsFlag } from '@/app/_constants/feature-flag';
import { Navbar } from '@/app/navbar';
import { Footer } from '@/components/footer';
import { auth } from '@/lib/auth';
import { GlobalActionButtons } from '@/ui/common/global-action-buttons';
import { PreloadResources } from '@/ui/common/preload-resources';
import ThemeSelection from '@/ui/common/theme-select/theme-selection';
import { cn } from '@/utils/classnames';

export { metadata } from './metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const showNotifications = await showNotificationsFlag();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-fit flex-col items-center justify-start',
          inter.className
        )}
      >
        <PreloadResources />
        <SessionProvider session={session}>
          <ThemeSelection>
            <ToastContainer pauseOnFocusLoss={false} theme="dark" />
            <div className="flex h-full w-full max-w-[1500px] grow flex-col items-start justify-start">
              <header className="w-full">
                <Navbar showNotifications={showNotifications} />
              </header>

              <main className="mt-[80px] flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
                <GlobalActionButtons
                  username={session?.user?.name || 'Unknown User'}
                />
                {children}
              </main>
            </div>

            <Footer />
          </ThemeSelection>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
