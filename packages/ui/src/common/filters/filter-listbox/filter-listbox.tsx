'use client';

import Select from 'react-select';
import { cn } from '../../../utils/classnames';
import { MultiValueLabel } from './multi-value-label';
import { Option } from './option';
import type { FilterListboxState, FilterOption } from './types';

interface FilterListboxProps {
  label: string;
  options: FilterOption[];
  onChange: (newOptions: FilterOption[]) => void;
}

export function FilterListbox({
  label,
  options,
  onChange,
}: FilterListboxProps) {
  function handleOptionChange(newState: FilterListboxState, itemId: string) {
    const newOptions = options.map((option) => {
      if (option.value === itemId) {
        return {
          ...option,
          state: newState,
        };
      }

      return option;
    });
    onChange(newOptions);
  }

  return (
    <Select
      className={cn(
        'ui-w-full ui-px-2 ui-text-sm ui-flex-gap-1 ui-bg-surface-solid/5 ui-text-surface-solid ui-rounded-[calc(theme(borderRadius.lg)-1px)] ui-border ui-border-surface-solid/10 focus:ui-outline-none ui-shadow',
      )}
      closeMenuOnSelect={false}
      components={{
        Option,
        MultiValueLabel,
      }}
      isMulti
      // @ts-expect-error Need to pass a custom prop to the option component
      onOptionChange={handleOptionChange}
      options={options}
      placeholder={`${label}...`}
      unstyled
      value={options.filter((option) => option.state !== 'default')}
    />
  );
}
