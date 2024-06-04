import { PaintBrushIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { BaseDivider } from '@/app/(components)/_base/divider'
import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { ColorThemes } from '@/app/(components)/theme-selection.client'

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
        <PaintBrushIcon className="h-5 w-5" />
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
