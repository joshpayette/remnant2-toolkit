import './globals.css';

import { type Viewport } from 'next';
import { Inter } from 'next/font/google';

export const viewport: Viewport = {};
export { metadata } from './metadata';
import { cn, PreloadResources } from '@repo/ui';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-fit flex-col items-center justify-start bg-gradient-to-br from-purple-500 to-purple-700 text-white',
          inter.className,
        )}
      >
        <PreloadResources />
        <div className="flex h-full w-full max-w-[1500px] grow flex-col items-start justify-start">
          <header className="w-full"></header>

          <main className="mt-[80px] flex h-full min-h-screen w-full grow flex-col items-center justify-start p-4 pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
