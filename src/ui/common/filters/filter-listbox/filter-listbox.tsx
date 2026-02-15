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
  disabledStates?: FilterListboxState[];
  options: FilterOption[];
  onChange: (newOptions: FilterOption[]) => void;
}

export function FilterListbox({
  label,
  disabledStates,
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
        <BaseLabel className="mb-1 text-sm font-medium text-surface-solid">
          {label}
        </BaseLabel>
      ) : null}
      <Select
        className={cn(
          'w-full px-2 text-sm bg-surface-solid/5 text-surface-solid rounded-[calc(theme(borderRadius.lg)-1px)] border border-surface-solid/10 focus:outline-none shadow',
        )}
        closeMenuOnSelect={false}
        components={{
          ClearIndicator,
          Option,
          MultiValueLabel,
          MultiValueRemove,
        }}
        // @ts-expect-error Need to pass a custom prop to the option component
        disabledStates={disabledStates}
        isMulti
        onOptionChange={handleOptionChange}
        onResetOptions={handleResetOptions}
        options={options}
        unstyled
        value={options.filter((option) => option.state !== 'default')}
      />
    </div>
  );
}
