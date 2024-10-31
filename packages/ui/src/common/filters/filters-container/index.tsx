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
        <div className="ui-w-full">
          <div className="ui-border-b-primary-500 ui-flex ui-w-full ui-flex-row ui-items-end ui-justify-end ui-border-b ui-py-2">
            <div className="ui-w-full ui-pr-4">{searchInput}</div>
            <Disclosure.Button as={BaseButton}>
              <FilterIcon className="ui-h-4 ui-w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel
            className={cn(
              'ui-border-primary-500 ui-mt-2 ui-w-full ui-border ui-bg-gray-950 ui-p-4',
              areAnyFiltersActive &&
                'ui-border-accent1-300 ui-shadow-accent1-600 ui-shadow-xl',
              !areFiltersApplied &&
                'ui-border-secondary-300 ui-shadow-secondary-600 ui-shadow-xl',
            )}
          >
            {children}
            <div className="ui-mt-4 ui-flex ui-justify-end">
              <BaseButton
                className="ui-mr-2"
                color="red"
                onClick={onClearFilters}
              >
                Clear
              </BaseButton>
              <BaseButton
                className={cn(!areFiltersApplied && 'ui-animate-pulse')}
                color="green"
                disabled={areFiltersApplied}
                onClick={onApplyFilters}
              >
                Apply Filters
              </BaseButton>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
