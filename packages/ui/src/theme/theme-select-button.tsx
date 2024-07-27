import { BaseButton } from '@repo/ui/base/button'
import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '@repo/ui/base/dialog'
import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'
import { ThemeIcon } from '@repo/ui/icons/theme'
import { ColorThemes } from '@repo/ui/theme/theme-selection'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'

const Modes = ['All', 'Dark', 'Light'] as const
type Mode = (typeof Modes)[number]

// WARNING: This component is not hydration-safe
// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
export default function ThemeSelectButton() {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('All')

  const { theme, setTheme } = useTheme()
  const useBetaThemes = useReadLocalStorage<boolean>('r2tk-themes-beta')

  const availableThemes = ColorThemes.filter(
    ({ isLive }) => isLive || useBetaThemes,
  ).filter(
    ({ baseTheme }) => baseTheme === mode.toLowerCase() || mode === 'All',
  )

  return (
    <>
      <BaseButton
        onClick={() => setDialogOpen(!isDialogOpen)}
        color="dark/white"
      >
        <ThemeIcon className="h-5 w-5" />
      </BaseButton>
      <BaseDialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <BaseDialogTitle>Select Color Theme</BaseDialogTitle>
        <BaseDialogBody className="flex flex-col gap-y-4">
          <BaseField>
            <BaseLabel>Category</BaseLabel>
            <BaseListbox name="colorMode" value={mode} onChange={setMode}>
              {Modes.map((selectedMode) => (
                <BaseListboxOption key={selectedMode} value={selectedMode}>
                  <BaseListboxLabel>{selectedMode}</BaseListboxLabel>
                </BaseListboxOption>
              ))}
            </BaseListbox>
          </BaseField>

          <BaseField>
            <BaseLabel>Theme</BaseLabel>
            <BaseListbox
              name="colorTheme"
              value={theme}
              onChange={setTheme}
              placeholder={'Select a new theme'}
            >
              {availableThemes.map((selectedTheme) => (
                <BaseListboxOption
                  key={selectedTheme.key}
                  value={selectedTheme.key}
                >
                  <BaseListboxLabel>
                    {selectedTheme.displayName}
                  </BaseListboxLabel>
                </BaseListboxOption>
              ))}
            </BaseListbox>
          </BaseField>
        </BaseDialogBody>
      </BaseDialog>
    </>
  )
}
