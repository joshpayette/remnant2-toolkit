import 'react-toastify/dist/ReactToastify.min.css';

import { type Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { cn } from '@/components/ui';
import { PreloadResources } from '../preload-resources';
import { SessionProvider } from '../session-provider';
import ThemeSelection from '@/components/ui/common/theme-select/theme-selection';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {};

export function RootLayout({
  children,
  alertBanner,
  footer,
  navbar,
  trackers,
}: {
  children: React.ReactNode;
  alertBanner: React.ReactNode;
  footer: React.ReactNode;
  navbar: React.ReactNode;
  trackers: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'relative flex min-h-fit flex-col items-center justify-start',
          inter.className,
        )}
      >
        <PreloadResources />
        <SessionProvider>
          <ThemeSelection>
            <ToastContainer pauseOnFocusLoss={false} theme="dark" />
            {alertBanner}

            <div className="h-full w-full justify-start items-start flex-col flex max-w-[1500px] grow">
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
  );
}
