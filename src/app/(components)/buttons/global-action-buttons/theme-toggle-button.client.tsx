import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'

import { BaseButton } from '@/app/(components)/_base/button'

// WARNING: This component is not hydration-safe
// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
export default function ToggleThemeButton() {
  const { setTheme, forcedTheme, resolvedTheme } = useTheme()

  // Temporary feature gate
  if (forcedTheme) {
    // If a theme is being forced, there is no alternate theme to toggle to
    // Disable the toggle option in this case
    return
  }

  const isDark = resolvedTheme === 'dark'
  const ButtonIcon = isDark ? SunIcon : MoonIcon
  return (
    <BaseButton onClick={() => setTheme(isDark ? 'light' : 'dark')} color="dark/white">
      <ButtonIcon className="h-5 w-5" />
    </BaseButton>
  )
}
