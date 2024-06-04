import { PaintBrushIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'

import { BaseButton } from '@/app/(components)/_base/button'
import { useState } from 'react'
import { BaseDialog } from '../../_base/dialog'
import { BaseListbox, BaseListboxOption, BaseListboxLabel } from '../../_base/listbox'
import { ColorThemes } from '../../theme-selection.client'
import { useReadLocalStorage } from 'usehooks-ts'

const Modes = ["All", "Dark", "Light"] as const
type Mode = typeof Modes[number]

// WARNING: This component is not hydration-safe
// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
export default function ThemeSelectButton() {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [mode, setMode] = useState<Mode>("All")
  const { theme, setTheme } = useTheme()
  const useBetaThemes = useReadLocalStorage<boolean>("r2tk-themes-beta")
  const availableThemes = ColorThemes
    .filter(({ isLive }) => isLive || useBetaThemes)
    .filter(({ baseTheme }) => baseTheme === mode.toLowerCase() || mode === "All")
  const onlyIfAvailable = (value?: string) => availableThemes.find((option) => option.key === value)?.key

  return (
    <>
      <BaseButton onClick={() => setDialogOpen(!isDialogOpen)} color="dark/white">
        <PaintBrushIcon className="h-5 w-5" />
      </BaseButton>
      <BaseDialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <BaseListbox name="colorMode" value={mode} onChange={setMode}>
          {Modes.map((selectedMode) => (
            <BaseListboxOption key={selectedMode} value={selectedMode}>
              <BaseListboxLabel>{selectedMode}</BaseListboxLabel>
            </BaseListboxOption>
          ))}
        </BaseListbox>
        <BaseListbox name="colorTheme" value={onlyIfAvailable(theme)} onChange={setTheme} placeholder={"Select a new theme"}>
            {availableThemes.map((selectedTheme) => (
              <BaseListboxOption key={selectedTheme.key} value={selectedTheme.key}>
                  <BaseListboxLabel>{selectedTheme.displayName}</BaseListboxLabel>
              </BaseListboxOption>
            ))}
        </BaseListbox>
      </BaseDialog>
    </>
  )
}