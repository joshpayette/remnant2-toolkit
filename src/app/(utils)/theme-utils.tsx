'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { ThemeProvider, useTheme } from 'next-themes'
import { BaseButton } from '../(components)/_base/button'
import { useLocalStorage } from './local-storage-utils'

export function ThemeSelection({ children }: { children: React.ReactNode }) {
    const { localValue } = useLocalStorage<boolean>('r2tk-theme-toggle', false);
    return <ThemeProvider 
        attribute="class" defaultTheme='system' enableSystem
        // This is a feature gate
        // If you wish to opt in, you must manually add this to your localstorage
        // Note that you will need to refresh the page afterwards
        forcedTheme={localValue ? undefined : 'dark'}
    >
        {children}
    </ThemeProvider>
}

export function ToggleThemeButton() {
    const { setTheme, forcedTheme, resolvedTheme } = useTheme()

    // Temporary feature gate
    if (forcedTheme) {
        // If a theme is being forced, there is no alternate theme to toggle to
        // Disable the toggle option in this case
        return;
    }

    if (resolvedTheme === 'dark') {
        return (
            <BaseButton onClick={() => setTheme('light')} color="white">
                <SunIcon className="h-5 w-5" />
            </BaseButton>
        )
    } else {
        return (
            <BaseButton onClick={() => setTheme('dark')} color="dark">
                <MoonIcon className="h-5 w-5" />
            </BaseButton>
        )
    }
}