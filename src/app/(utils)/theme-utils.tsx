'use client'

import { ThemeProvider } from 'next-themes'
import { useLocalStorage } from 'usehooks-ts'

export function ThemeSelection({ children }: { children: React.ReactNode }) {
  const [localValue] = useLocalStorage<boolean>('r2tk-theme-toggle', false)
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // This is a feature gate
      // If you wish to opt in, you must manually add this to your localstorage
      // Note that you will need to refresh the page afterwards
      forcedTheme={localValue ? undefined : 'dark'}
    >
      {children}
    </ThemeProvider>
  )
}
