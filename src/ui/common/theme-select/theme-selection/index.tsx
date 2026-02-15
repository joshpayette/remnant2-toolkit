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

export interface AccentThemeProps {
  accentName: string;
  accentKey: string;
  accentTheme: string | undefined;
}
export const AccentThemes: AccentThemeProps[] = [
  {
    accentName: 'Default',
    accentKey: 'accent-default',
    accentTheme: undefined
  },
  {
    accentName: 'Deuteranopic',
    accentKey: 'accent-deuteranopic',
    accentTheme: 'deuteranopic',
  },
] as const;
export type AccentTheme = (typeof AccentThemes)[number];

const colorThemes: Record<string, string> = {};

ColorThemes.forEach(
  ({ key, baseTheme, customThemes }) => { AccentThemes.forEach(({accentKey, accentTheme}) => {
    let mapKey = key;
    const mapValues = [baseTheme, ...customThemes];

    if (accentTheme) {
      mapKey += `-${accentKey}`;
      mapValues.push(accentTheme);
    }

    colorThemes[mapKey] = mapValues.join(' ');
  }); }
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
      enableColorScheme={false} // This helper isn't playing nice with the extra themes
      themes={Object.keys(colorThemes)}
      value={colorThemes}
    >
      {children}
    </ThemeProvider>
  );
}
