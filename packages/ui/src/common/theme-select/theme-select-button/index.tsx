import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import { BaseButton } from '../../../base/button';
import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '../../../base/dialog';
import { BaseField, BaseLabel } from '../../../base/fieldset';
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '../../../base/listbox';
import { ThemeIcon } from '../../icons/theme';
import { ColorThemes } from '..';

const Modes = ['All', 'Dark', 'Light'] as const;
type Mode = (typeof Modes)[number];

// WARNING: This component is not hydration-safe
// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
export function ThemeSelectButton() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('All');

  const { theme, setTheme } = useTheme();
  const useBetaThemes = useReadLocalStorage<boolean>('r2tk-themes-beta');

  const availableThemes = ColorThemes.filter(
    ({ isLive }) => isLive || useBetaThemes,
  ).filter(
    ({ baseTheme }) => baseTheme === mode.toLowerCase() || mode === 'All',
  );

  return (
    <>
      <BaseButton
        color="dark/white"
        onClick={() => {
          setDialogOpen(!isDialogOpen);
        }}
      >
        <ThemeIcon className="h-5 w-5" />
      </BaseButton>
      <BaseDialog
        onClose={() => {
          setDialogOpen(false);
        }}
        open={isDialogOpen}
      >
        <BaseDialogTitle>Select Color Theme</BaseDialogTitle>
        <BaseDialogBody className="flex flex-col gap-y-4">
          <BaseField>
            <BaseLabel>Category</BaseLabel>
            <BaseListbox name="colorMode" onChange={setMode} value={mode}>
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
              onChange={setTheme}
              placeholder="Select a new theme"
              value={theme}
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
  );
}

export default ThemeSelectButton;
