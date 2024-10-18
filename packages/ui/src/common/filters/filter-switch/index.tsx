'use client';

import { CheckIcon } from '../icons/check';
import { SlashIcon } from '../icons/slash';
import { XIcon } from '../icons/x';
import { cn } from '../../utils/classnames';

type Value = 'check' | 'x' | 'slash';

interface FilterSwitchProps {
  value: Value;
  onChange: (value: Value) => void;
}

export function FilterSwitch({ value, onChange }: FilterSwitchProps) {
  return (
    <span className="ui-isolate ui-inline-flex ui-rounded-md ui-shadow-sm">
      <button
        className={cn(
          'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-rounded-l-md ui-bg-[--btn-bg] ui-border-surface-solid/15 ui-px-3 ui-py-2 ui-text-sm ui-font-semibold ui-text-green-500 ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
          value === 'check' && 'ui-bg-surface-solid/15',
        )}
        onClick={() => {
          onChange('check');
        }}
        type="button"
      >
        <CheckIcon className="ui-h-3 ui-w-3" />
      </button>
      <button
        className={cn(
          'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-bg-[--btn-bg] ui-border-surface-solid/15 ui-px-3 ui-py-2 ui-text-sm ui-font-semibold ui-text-surface-solid ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
          value === 'slash' && 'ui-bg-surface-solid/15',
        )}
        onClick={() => {
          onChange('slash');
        }}
        type="button"
      >
        <SlashIcon className="ui-h-3 ui-w-3" />
      </button>
      <button
        className={cn(
          'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-rounded-r-md ui-border-surface-solid/15 ui-bg-[--btn-bg] ui-px-3 ui-py-2 ui-text-sm ui-font-semibold ui-text-red-500 ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
          value === 'x' && 'ui-bg-surface-solid/15',
        )}
        onClick={() => {
          onChange('x');
        }}
        type="button"
      >
        <XIcon className="ui-h-3 ui-w-3" />
      </button>
    </span>
  );
}
