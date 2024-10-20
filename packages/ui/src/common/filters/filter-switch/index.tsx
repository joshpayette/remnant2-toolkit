'use client';

import { cn } from '../../../utils/classnames';
import { CheckIcon } from '../../icons/check';
import { SquareIcon } from '../../icons/square';
import { XIcon } from '../../icons/x';
import { Tooltip } from '../../tooltip';

export type FilterSwitchValue = 'checked' | 'unchecked' | 'excluded';

interface FilterSwitchProps {
  label: string;
  value: FilterSwitchValue;
  onChange: (newValue: FilterSwitchValue) => void;
}

export function FilterSwitch({ label, value, onChange }: FilterSwitchProps) {
  return (
    <div className="ui-justify-start ui-items-start flex flex-col">
      <h3 className="ui-text-sm ui-font-semibold ui-text-surface-solid mb-2">
        {label}
      </h3>
      <div className="ui-isolate ui-inline-flex ui-rounded-md ui-shadow-sm">
        <Tooltip content="Include item in results">
          <button
            className={cn(
              'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-rounded-l-md ui-bg-[--btn-bg] ui-border-surface-solid/15 ui-p-2 ui-text-sm ui-font-semibold ui-text-green-500 ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
              value === 'checked' &&
                'ui-bg-surface-solid/15 ui-bg-green-800 ui-text-surface-solid',
            )}
            onClick={() => {
              onChange('checked');
            }}
            type="button"
          >
            <CheckIcon className="ui-h-3 ui-w-3" />
          </button>
        </Tooltip>

        <Tooltip content="No preference">
          <button
            className={cn(
              'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-bg-[--btn-bg] ui-border-surface-solid/15 ui-p-2 ui-text-sm ui-font-semibold ui-text-surface-solid ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
              value === 'unchecked' && 'ui-bg-surface-solid/15',
            )}
            onClick={() => {
              onChange('unchecked');
            }}
            type="button"
          >
            <SquareIcon className="ui-h-3 ui-w-3" />
          </button>
        </Tooltip>

        <Tooltip content="Exclude item from results">
          <button
            className={cn(
              'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-rounded-r-md ui-border-surface-solid/15 ui-bg-[--btn-bg] ui-p-2 ui-text-sm ui-font-semibold ui-text-red-500 ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
              value === 'excluded' &&
                'ui-bg-surface-solid/15 ui-bg-red-800 ui-text-surface-solid',
            )}
            onClick={() => {
              onChange('excluded');
            }}
            type="button"
          >
            <XIcon className="ui-h-3 ui-w-3" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
