import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
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
import { AccentThemes, ColorThemes } from '..';

const Modes = ['All', 'Dark', 'Light'] as const;
type Mode = (typeof Modes)[number];

// WARNING: This component is not hydration-safe
// https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
export function ThemeSelectButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('All');

  const { theme, setTheme } = useTheme();
  const useBetaThemes = useReadLocalStorage<boolean>('r2tk-themes-beta');

  const [accent, setAccent] = useState<string | undefined>(theme?.includes('-accent-') ? theme.split('-accent-').at(-1) : undefined);

  const availableThemes = ColorThemes.filter(
    ({ isLive }) => isLive || useBetaThemes,
  ).filter(
    ({ baseTheme }) => baseTheme === mode.toLowerCase() || mode === 'All',
  ).map((baseTheme) => {return {...baseTheme, key: accent ? `${baseTheme.key}-accent-${accent}` : baseTheme.key}});

  // There is surely a better way to do this...
  useEffect(() => { 
    let currTheme = theme?.split('-accent-')[0] ?? 'dark';
    if (accent) {
      currTheme += `-accent-${accent}`;
    }
    setTheme(currTheme);
  }, [accent, theme, setTheme]);

  return (
    <>
      <BaseButton
        color="dark/white"
        onClick={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
      >
        <ThemeIcon className="ui-h-5 ui-w-5" />
      </BaseButton>
      <BaseDialog
        onClose={() => {
          setIsDialogOpen(false);
        }}
        open={isDialogOpen}
      >
        <BaseDialogTitle>Select Color Theme</BaseDialogTitle>
        <BaseDialogBody className="ui-flex ui-flex-col ui-gap-y-4">
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
            <BaseLabel>Accents</BaseLabel>
            <BaseListbox name="colorAccent" onChange={setAccent} value={accent}>
              {AccentThemes.map(({accentKey, accentTheme, accentName}) => (
                <BaseListboxOption key={accentKey} value={accentTheme}>
                  <BaseListboxLabel>{accentName}</BaseListboxLabel>
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
