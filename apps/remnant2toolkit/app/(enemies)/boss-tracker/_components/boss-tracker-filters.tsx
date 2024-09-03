'use client';
import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  BaseField,
  BaseFieldGroup,
  BaseFieldset,
  cn,
  FilterIcon,
} from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { InputWithClear } from '@/app/_components/input-with-clear';
import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { CategoriesFilter } from '@/app/(enemies)/boss-tracker/_components/categories-filter';
import {
  BOSS_TRACKER_KEYS,
  type BossTrackerFilters as Filters,
} from '@/app/(enemies)/boss-tracker/_types';
import { parseUrlFilters } from '@/app/(enemies)/boss-tracker/_utils/parse-url-filters';

export const DEFAULT_BOSS_TRACKER_FILTERS = {
  categories: [DEFAULT_FILTER],
  searchText: '',
} as const satisfies Filters;

// #region Component

export function BossTrackerFilters() {
  const searchParams = useSearchParams();
  const filters = parseUrlFilters(searchParams);

  const [unappliedFilters, setUnappliedFilters] = useState(filters);

  function clearFilters() {
    setUnappliedFilters(DEFAULT_BOSS_TRACKER_FILTERS);
    applyUrlFilters(DEFAULT_BOSS_TRACKER_FILTERS);
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, DEFAULT_BOSS_TRACKER_FILTERS)) return false;
    return true;
  }, [filters]);

  // #region Apply Filters Handler
  const pathname = usePathname();
  const router = useRouter();
  function applyUrlFilters(filtersToApply: Filters) {
    let url = `${pathname}?`;

    // Add the categories filter
    if (!filtersToApply.categories.some((i) => i === DEFAULT_FILTER)) {
      url += `${BOSS_TRACKER_KEYS.CATEGORIES}=${filtersToApply.categories.join(
        ',',
      )}&`;
    }

    // Add the search text filter
    if (filtersToApply.searchText.length > 0) {
      url += `${BOSS_TRACKER_KEYS.SEARCHTEXT}=${filtersToApply.searchText}&`;
    }

    // trim the final &
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    router.push(url, { scroll: false });
  }

  // #region Filter Change Handlers

  function handleSearchTextChange(newSearchText: string) {
    setUnappliedFilters((prev) => ({ ...prev, searchText: newSearchText }));
  }

  function handleCategoriesChange(newCategories: string[]) {
    // if the newCategories length is 0, set to default
    if (newCategories.length === 0) {
      const newFilters = { ...unappliedFilters, categories: [DEFAULT_FILTER] };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the first item is the default value ("All"), apply the filters after removing the default value
    if (newCategories[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        categories: newCategories.filter((i) => i !== DEFAULT_FILTER),
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if any of the filters contain the default value of "All", just apply the filters
    if (newCategories.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, categories: [DEFAULT_FILTER] };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      categories: newCategories.filter((i) => i !== DEFAULT_FILTER),
    };
    setUnappliedFilters(newFilters);
    applyUrlFilters(newFilters);
  }

  // #region Render

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="w-full">
          <div className="border-b-primary-500 flex w-full flex-row items-end justify-end border-b py-2">
            <div className="w-full pr-4">
              <BaseField className="col-span-full sm:col-span-2 md:col-span-3">
                <div className="mt-3">
                  <InputWithClear
                    type="text"
                    value={unappliedFilters.searchText}
                    placeholder="Search boss names..."
                    onClear={() => {
                      const newFilters = {
                        ...unappliedFilters,
                        searchText: '',
                      };
                      setUnappliedFilters(newFilters);
                      applyUrlFilters(newFilters);
                    }}
                    onChange={(e) => handleSearchTextChange(e.target.value)}
                    onKeyDown={(e) => {
                      // If the user presses enter, apply the filters
                      if (e.key === 'Enter') {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                  />
                </div>
              </BaseField>
            </div>
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
            <BaseFieldset>
              <BaseFieldGroup>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
                  <div className="col-span-full">
                    <CategoriesFilter
                      value={unappliedFilters.categories}
                      onChange={handleCategoriesChange}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-end gap-x-4">
                  <BaseButton color="red" onClick={clearFilters}>
                    Clear Filters
                  </BaseButton>
                </div>
              </BaseFieldGroup>
            </BaseFieldset>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
