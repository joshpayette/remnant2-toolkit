'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { ThemeProvider, useTheme } from 'next-themes'
import { BaseButton } from '../(components)/_base/button'

export function ThemeSelection({ children }: { children: React.ReactNode }) {
    return <ThemeProvider attribute="class" defaultTheme='system' enableSystem>{children}</ThemeProvider>
}

export function ToggleThemeButton() {
    const { setTheme, resolvedTheme } = useTheme()

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