import 'react-toastify/dist/ReactToastify.min.css';
import '@ygt/ui/styles.css';

import { type Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { cn } from '../../cn';
import { PreloadResources } from './preload-resources';
import { Providers } from './providers';
import { Container } from './container';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {};

// const ThemeSelection = dynamic(
//   () => import('../theme-select/theme-selection'),
//   {
//     ssr: false,
//   },
// );

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="ui-h-full" lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(`ui-h-full ui-antialiased`, inter.className)}>
        <PreloadResources />
        <Providers>
          <ToastContainer pauseOnFocusLoss={false} theme="dark" />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
