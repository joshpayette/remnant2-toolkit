import "@mantine/core/styles.css";
import * as React from "react";
import { Inter } from "next/font/google";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "@repo/ygt-ui/providers";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={clsx(`antialiased`, inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
