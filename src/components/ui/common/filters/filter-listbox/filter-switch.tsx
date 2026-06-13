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
    <div className="justify-start items-start flex flex-col">
      <div className="isolate inline-flex rounded-md shadow-sm">
        {disabledStates?.includes('included') ? null : (
          <button
            className={cn(
              'border [--btn-bg:transparent] [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.400)] data-[hover]:[--btn-icon:theme(colors.zinc.400)] data-[active]:bg-surface-solid/5 relative inline-flex items-center rounded-l-md bg-[--btn-bg] border-surface-solid/15 p-2 text-sm font-semibold text-accent2-500 focus:z-10 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
              state === 'included' && 'bg-accent2-800 text-surface-solid',
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
              'border [--btn-bg:transparent] [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.400)] data-[hover]:[--btn-icon:theme(colors.zinc.400)] data-[active]:bg-surface-solid/5 relative inline-flex items-center bg-[--btn-bg] border-surface-solid/15 p-2 text-sm font-semibold text-surface-solid focus:z-10 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
              state === 'default' && 'bg-surface-solid/15',
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
              'border [--btn-bg:transparent] [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.400)] data-[hover]:[--btn-icon:theme(colors.zinc.400)] data-[active]:bg-surface-solid/5 relative inline-flex items-center rounded-r-md border-surface-solid/15 bg-[--btn-bg] p-2 text-sm font-semibold text-accent3-500 focus:z-10 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
              state === 'excluded' && 'bg-accent3-800 text-surface-solid',
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
