import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'

import { BaseButton } from '@/app/(components)/_base/button'

// WARNING: This component is not hydration-safe
// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
export default function ToggleThemeButton() {
  const { setTheme, resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'
  const ButtonIcon = isDark ? SunIcon : MoonIcon
  return (
    <BaseButton onClick={() => setTheme(isDark ? 'light' : 'dark')} color="dark/white">
      <ButtonIcon className="h-5 w-5" />
    </BaseButton>
  )
}
