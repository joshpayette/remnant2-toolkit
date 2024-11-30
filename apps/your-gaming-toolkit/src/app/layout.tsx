import './globals.css';

import { RootLayout } from '@ygt/ui/root-layout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
