'use client';

import { ThemeProvider } from 'next-themes';

export interface ColorThemeProps {
  displayName: string;
  key: string;
  baseTheme: 'system' | 'light' | 'dark';
  customThemes: string[];
  isLive: boolean;
}

/**
 * NOTE: The order of these definitions will correspond to
 * the order in which they are listed in the selection dialog
 */
export const ColorThemes: ColorThemeProps[] = [
  {
    displayName: 'Follow System Preference',
    key: 'system',
    baseTheme: 'system',
    customThemes: [],
    isLive: true,
  },
  {
    displayName: 'Default Dark',
    key: 'dark',
    baseTheme: 'dark',
    customThemes: [],
    isLive: true,
  },
  {
    displayName: 'Default Light',
    key: 'light',
    baseTheme: 'light',
    customThemes: [],
    isLive: true,
  },
  {
    displayName: 'Nord Polar',
    key: 'nord-polar',
    baseTheme: 'dark',
    customThemes: ['nord-polar'],
    isLive: false,
  },
  {
    displayName: 'Nord Snow',
    key: 'nord-snow',
    baseTheme: 'light',
    customThemes: ['nord-snow'],
    isLive: false,
  },
  {
    displayName: 'Solarized Dark',
    key: 'solarized-dark',
    baseTheme: 'dark',
    customThemes: ['solarized-dark'],
    isLive: false,
  },
  {
    displayName: 'Solarized Light',
    key: 'solarized-light',
    baseTheme: 'light',
    customThemes: ['solarized-light'],
    isLive: false,
  },
] as const;
export type ColorTheme = (typeof ColorThemes)[number];

const colorThemes: Record<string, string> = {};

ColorThemes.forEach(
  ({ key, baseTheme, customThemes }) =>
    (colorThemes[key] = [baseTheme, ...customThemes].join(' ')),
);

export default function ThemeSelection({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultTheme = 'dark';

  // By default: enableSystem is true and is the default theme
  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      themes={Object.keys(colorThemes)}
      value={colorThemes}
    >
      {children}
    </ThemeProvider>
  );
}
