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

import {
  DiscoveredFilter,
  VALID_DISCOVERED_FILTERS,
} from '@/app/_components/discovered-filter';
import { InputWithClear } from '@/app/_components/input-with-clear';
import {
  ReleasesFilter,
  VALID_RELEASE_KEYS,
} from '@/app/_components/releases-filter';
import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import {
  ITEM_TRACKER_KEYS,
  type ItemTrackerFilters,
} from '@/app/(items)/_components/filters/item-tracker/types';
import { WorldFilter } from '@/app/(items)/_components/filters/world-filter';
import { CategoriesFilter } from '@/app/(items)/item-tracker/_components/categories-filter';
import { VALID_ITEM_CATEGORIES } from '@/app/(items)/item-tracker/_constants/valid-item-categories';
import { parseUrlFilters } from '@/app/(items)/item-tracker/_utils/parse-url-filters';

export const DEFAULT_ITEM_TRACKER_FILTERS = {
  categories: VALID_ITEM_CATEGORIES,
  collections: VALID_DISCOVERED_FILTERS,
  releases: VALID_RELEASE_KEYS,
  searchText: '',
  world: DEFAULT_FILTER,
  dungeon: DEFAULT_FILTER,
} as const satisfies ItemTrackerFilters;

// #region Component

export function ItemTrackerFilters() {
  const searchParams = useSearchParams();
  const filters = parseUrlFilters(searchParams);

  const [unappliedFilters, setUnappliedFilters] = useState(filters);

  function clearFilters() {
    setUnappliedFilters(DEFAULT_ITEM_TRACKER_FILTERS);
    applyUrlFilters(DEFAULT_ITEM_TRACKER_FILTERS);
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, DEFAULT_ITEM_TRACKER_FILTERS)) return false;
    return true;
  }, [filters]);

  // #region Apply Filters Handler
  const pathname = usePathname();
  const router = useRouter();
  function applyUrlFilters(filtersToApply: ItemTrackerFilters) {
    let url = `${pathname}?`;

    // Add the categories filter
    if (
      filtersToApply.categories.length !== VALID_ITEM_CATEGORIES.length &&
      filtersToApply.categories.length > 0
    ) {
      url += `${ITEM_TRACKER_KEYS.CATEGORIES}=${filtersToApply.categories.join(
        ',',
      )}&`;
    }

    // Add the collections filter
    if (filtersToApply.collections.length !== VALID_DISCOVERED_FILTERS.length) {
      url += `${
        ITEM_TRACKER_KEYS.COLLECTIONS
      }=${filtersToApply.collections.join(',')}&`;
    }

    // Add the releases filter
    if (filtersToApply.releases.length !== VALID_RELEASE_KEYS.length) {
      url += `${ITEM_TRACKER_KEYS.RELEASES}=${filtersToApply.releases.join(
        ',',
      )}&`;
    }

    // Add the world filter
    if (filtersToApply.world !== DEFAULT_FILTER) {
      url += `${ITEM_TRACKER_KEYS.WORLD}=${filtersToApply.world}&`;
    }

    // Add the dungeon filter
    if (filtersToApply.dungeon !== DEFAULT_FILTER) {
      url += `${ITEM_TRACKER_KEYS.DUNGEON}=${filtersToApply.dungeon}&`;
    }

    // Add the search text filter
    if (filtersToApply.searchText.length > 0) {
      url += `${ITEM_TRACKER_KEYS.SEARCHTEXT}=${filtersToApply.searchText}&`;
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

  function handleCategoriesChange(category: string, checked: boolean) {
    // if the category is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        categories: unappliedFilters.categories.filter((i) => i !== category),
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the category is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      categories: [...unappliedFilters.categories, category],
    };
    setUnappliedFilters(newFilters);
    applyUrlFilters(newFilters);
  }

  function handleCollectionsChange(value: string, checked: boolean) {
    // if the collection is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        collections: unappliedFilters.collections.filter((i) => i !== value),
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the collection is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      collections: [...unappliedFilters.collections, value],
    };
    setUnappliedFilters(newFilters);
    applyUrlFilters(newFilters);
  }

  function handleReleasesChange(newReleases: string, checked: boolean) {
    // if the release is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        releases: unappliedFilters.releases.filter((i) => i !== newReleases),
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the release is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      releases: [...unappliedFilters.releases, newReleases],
    };
    setUnappliedFilters(newFilters);
    applyUrlFilters(newFilters);
  }

  function handleWorldChange(newWorld: string) {
    if (newWorld === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        world: DEFAULT_FILTER,
        dungeon: DEFAULT_FILTER,
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the world is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      world: newWorld,
      dungeon: DEFAULT_FILTER,
    };
    setUnappliedFilters(newFilters);
    applyUrlFilters(newFilters);
  }

  function handleDungeonChange(newDungeon: string) {
    if (newDungeon === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        dungeon: DEFAULT_FILTER,
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the dungeon is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      dungeon: newDungeon,
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
              <BaseField className="col-span-full sm:col-span-2">
                <div className="w-full max-w-[600px]">
                  <InputWithClear
                    type="text"
                    value={unappliedFilters.searchText}
                    placeholder="Item name..."
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
                  <div className="col-span-full sm:col-span-1 md:col-span-2">
                    <ReleasesFilter
                      values={unappliedFilters.releases}
                      onChange={handleReleasesChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: VALID_RELEASE_KEYS,
                        };
                        setUnappliedFilters(newFilters);
                        applyUrlFilters(newFilters);
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: [],
                        };
                        setUnappliedFilters(newFilters);
                        applyUrlFilters(newFilters);
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1 md:col-span-2">
                    <DiscoveredFilter
                      values={unappliedFilters.collections}
                      onChange={handleCollectionsChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          collections: VALID_DISCOVERED_FILTERS,
                        };
                        setUnappliedFilters(newFilters);
                        applyUrlFilters(newFilters);
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          collections: [],
                        };
                        setUnappliedFilters(newFilters);
                        applyUrlFilters(newFilters);
                      }}
                    />
                  </div>
                  <div className="col-span-full">
                    <CategoriesFilter
                      values={unappliedFilters.categories}
                      onChange={handleCategoriesChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          categories: VALID_ITEM_CATEGORIES,
                        };
                        setUnappliedFilters(newFilters);
                        applyUrlFilters(newFilters);
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          categories: [],
                        };
                        setUnappliedFilters(newFilters);
                        applyUrlFilters(newFilters);
                      }}
                    />
                  </div>
                  <div className="col-span-full md:col-span-2">
                    <WorldFilter
                      worldValue={unappliedFilters.world}
                      dungeonValue={unappliedFilters.dungeon}
                      onChangeWorld={handleWorldChange}
                      onChangeDungeon={handleDungeonChange}
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
