'use client';

import Select from 'react-select';
import { cn } from '../../../utils/classnames';
import { MultiValueLabel } from './multi-value-label';
import { Option } from './option';
import type { FilterOption } from './types';

interface FilterListboxProps {
  label: string;
  options: FilterOption[];
  // onChange: (newState: FilterListboxState) => void;
}

export function FilterListbox({ label, options }: FilterListboxProps) {
  return (
    <Select
      className={cn(
        'ui-w-full ui-px-2 ui-text-sm ui-flex-gap-1 ui-bg-surface-solid/5 ui-text-surface-solid ui-rounded-[calc(theme(borderRadius.lg)-1px)] ui-border ui-border-surface-solid/10 focus:ui-outline-none ui-shadow',
      )}
      closeMenuOnSelect={false}
      components={{ Option, MultiValueLabel }}
      isOptionDisabled={() => true}
      options={options}
      placeholder={`${label}...`}
      unstyled
    />
  );
}
