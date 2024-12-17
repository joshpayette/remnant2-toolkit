'use client';

import { cn } from '../../../utils/classnames';
import { CheckIcon } from '../../icons/check';
import { SquareIcon } from '../../icons/square';
import { XIcon } from '../../icons/x';
import type { FilterListboxState } from './types';

interface FilterSwitchProps {
  disabledStates?: FilterListboxState[];
  state: FilterListboxState;
  onChange: (newState: FilterListboxState) => void;
}

export function FilterSwitch({
  disabledStates,
  state,
  onChange,
}: FilterSwitchProps) {
  return (
    <div className="ui-justify-start ui-items-start ui-flex ui-flex-col">
      <div className="ui-isolate ui-inline-flex ui-rounded-md ui-shadow-sm">
        {disabledStates?.includes('included') ? null : (
          <button
            className={cn(
              'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-rounded-l-md ui-bg-[--btn-bg] ui-border-surface-solid/15 ui-p-2 ui-text-sm ui-font-semibold ui-text-accent2-500 ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
              state === 'included' && 'ui-bg-accent2-800 ui-text-surface-solid',
            )}
            onClick={() => {
              onChange('included');
            }}
            type="button"
          >
            <CheckIcon className="ui-h-2 ui-w-2" />
          </button>
        )}

        {disabledStates?.includes('default') ? null : (
          <button
            className={cn(
              'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-bg-[--btn-bg] ui-border-surface-solid/15 ui-p-2 ui-text-sm ui-font-semibold ui-text-surface-solid ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
              state === 'default' && 'ui-bg-surface-solid/15',
            )}
            onClick={() => {
              onChange('default');
            }}
            type="button"
          >
            <SquareIcon className="ui-h-2 ui-w-2" />
          </button>
        )}

        {disabledStates?.includes('excluded') ? null : (
          <button
            className={cn(
              'ui-border ui-[--btn-bg:transparent] ui-[--btn-icon:theme(colors.zinc.500)] data-[active]:ui-[--btn-icon:theme(colors.zinc.400)] data-[hover]:ui-[--btn-icon:theme(colors.zinc.400)] data-[active]:ui-bg-surface-solid/5 ui-relative ui-inline-flex ui-items-center ui-rounded-r-md ui-border-surface-solid/15 ui-bg-[--btn-bg] ui-p-2 ui-text-sm ui-font-semibold ui-text-accent3-500 ui-focus:z-10 focus:ui-outline-none data-[focus]:ui-outline data-[focus]:ui-outline-2 data-[focus]:ui-outline-offset-2 data-[focus]:ui-outline-blue-500',
              state === 'excluded' && 'ui-bg-accent3-800 ui-text-surface-solid',
            )}
            onClick={() => {
              onChange('excluded');
            }}
            type="button"
          >
            <XIcon className="ui-h-2 ui-w-2" />
          </button>
        )}
      </div>
    </div>
  );
}
