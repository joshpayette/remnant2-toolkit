import { Disclosure } from '@headlessui/react';
import React from 'react';
import { FilterIcon } from '../../icons/filter';
import { BaseButton } from '../../../base/button';
import { cn } from '../../../utils/classnames';

interface FiltersContainerProps {
  children: React.ReactNode;
  areFiltersApplied: boolean;
  areAnyFiltersActive: boolean;
  searchInput?: React.ReactNode;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function FiltersContainer({
  children,
  areFiltersApplied,
  areAnyFiltersActive,
  searchInput,
  onApplyFilters,
  onClearFilters,
}: FiltersContainerProps) {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="w-full">
          <div className="border-b-primary-500 flex w-full flex-row items-end justify-end border-b py-2">
            <div className="w-full pr-4">{searchInput}</div>
            <Disclosure.Button as={BaseButton}>
              <FilterIcon className="h-4 w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel
            className={cn(
              'border-primary-500 mt-2 w-full border bg-gray-950 p-4',
              areAnyFiltersActive &&
                'border-accent1-300 shadow-accent1-600 shadow-xl',
            )}
          >
            {children}
            <div className="mt-4 flex justify-end">
              <BaseButton className="mr-2" color="red" onClick={onClearFilters}>
                Clear
              </BaseButton>
              <BaseButton
                className={cn(!areFiltersApplied && 'animate-pulse')}
                color="green"
                onClick={onApplyFilters}
              >
                Apply
              </BaseButton>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
