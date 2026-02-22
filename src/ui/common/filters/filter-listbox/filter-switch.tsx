'use client';

import { cn } from '../../../../utils/classnames';
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
    <div className="flex flex-col items-start justify-start">
      <div className="isolate inline-flex rounded-md shadow-sm">
        {disabledStates?.includes('included') ? null : (
          <button
            className={cn(
              'data-[active]:bg-surface-solid/5 border-surface-solid/15 text-accent2-500 relative inline-flex items-center rounded-l-md border bg-[--btn-bg] p-2 text-sm font-semibold [--btn-bg:transparent] [--btn-icon:theme(colors.zinc.500)] focus:z-10 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[active]:[--btn-icon:theme(colors.zinc.400)] data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
              state === 'included' && 'bg-accent2-800 text-surface-solid'
            )}
            onClick={() => {
              onChange('included');
            }}
            type="button"
          >
            <CheckIcon className="h-2 w-2" />
          </button>
        )}

        {disabledStates?.includes('default') ? null : (
          <button
            className={cn(
              'data-[active]:bg-surface-solid/5 border-surface-solid/15 text-surface-solid relative inline-flex items-center border bg-[--btn-bg] p-2 text-sm font-semibold [--btn-bg:transparent] [--btn-icon:theme(colors.zinc.500)] focus:z-10 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[active]:[--btn-icon:theme(colors.zinc.400)] data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
              state === 'default' && 'bg-surface-solid/15'
            )}
            onClick={() => {
              onChange('default');
            }}
            type="button"
          >
            <SquareIcon className="h-2 w-2" />
          </button>
        )}

        {disabledStates?.includes('excluded') ? null : (
          <button
            className={cn(
              'data-[active]:bg-surface-solid/5 border-surface-solid/15 text-accent3-500 relative inline-flex items-center rounded-r-md border bg-[--btn-bg] p-2 text-sm font-semibold [--btn-bg:transparent] [--btn-icon:theme(colors.zinc.500)] focus:z-10 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[active]:[--btn-icon:theme(colors.zinc.400)] data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
              state === 'excluded' && 'bg-accent3-800 text-surface-solid'
            )}
            onClick={() => {
              onChange('excluded');
            }}
            type="button"
          >
            <XIcon className="h-2 w-2" />
          </button>
        )}
      </div>
    </div>
  );
}
