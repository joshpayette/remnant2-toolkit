'use client';

import Select from 'react-select';
import { cn } from '../../../utils/classnames';
import { BaseLabel } from '../../../base/fieldset';
import { MultiValueLabel } from './multi-value-label';
import { MultiValueRemove } from './multi-value-remove';
import { Option } from './option';
import { ClearIndicator } from './clear-all-indicator';
import type { FilterListboxState, FilterOption } from './types';

interface FilterListboxProps {
  label: string;
  options: FilterOption[];
  onBlur: () => void;
  onChange: (newOptions: FilterOption[]) => void;
}

export function FilterListbox({
  label,
  options,
  onBlur,
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

  function handleResetOptions() {
    const newOptions: FilterOption[] = options.map((option) => ({
      ...option,
      state: 'default',
    }));
    onChange(newOptions);
  }

  return (
    <div className="flex flex-col">
      {label ? (
        <BaseLabel className="ui-mb-1 ui-text-sm ui-font-medium ui-text-surface-solid">
          {label}
        </BaseLabel>
      ) : null}
      <Select
        className={cn(
          'ui-w-full ui-px-2 ui-text-sm ui-bg-surface-solid/5 ui-text-surface-solid ui-rounded-[calc(theme(borderRadius.lg)-1px)] ui-border ui-border-surface-solid/10 focus:ui-outline-none ui-shadow',
        )}
        closeMenuOnSelect={false}
        components={{
          ClearIndicator,
          Option,
          MultiValueLabel,
          MultiValueRemove,
        }}
        isMulti
        onBlur={onBlur}
        // @ts-expect-error Need to pass a custom prop to the option component
        onOptionChange={handleOptionChange}
        onResetOptions={handleResetOptions}
        options={options}
        unstyled
        value={options.filter((option) => option.state !== 'default')}
      />
    </div>
  );
}
