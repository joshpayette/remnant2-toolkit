'use client';

import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  BaseFieldGroup,
  BaseFieldset,
  BaseText,
  BaseTextLink,
  cn,
  FilterIcon,
} from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  ReleasesFilter,
  VALID_RELEASE_KEYS,
} from '@/app/_components/releases-filter';
import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { BossAffixFilter } from '@/app/(enemies)/world-save-archive/_components/boss-affix-filter';
import { BossNameFilter } from '@/app/(enemies)/world-save-archive/_components/boss-name-filter';
import { WORLD_SAVE_FILTER_KEYS } from '@/app/(enemies)/world-save-archive/_constants/world-save-filter-keys';
import { type WorldSaveFilters } from '@/app/(enemies)/world-save-archive/_types';
import { parseUrlFilters } from '@/app/(enemies)/world-save-archive/_utils/parse-url-filters';

export const DEFAULT_WORLD_SAVE_FILTERS = {
  bossName: DEFAULT_FILTER,
  bossAffixes: [DEFAULT_FILTER],
  releases: VALID_RELEASE_KEYS,
} as const satisfies WorldSaveFilters;

// #region Component

export function WorldSaveFilters() {
  const searchParams = useSearchParams();
  const filters = parseUrlFilters(searchParams);

  const [unappliedFilters, setUnappliedFilters] = useState(filters);

  function clearFilters() {
    setUnappliedFilters(DEFAULT_WORLD_SAVE_FILTERS);
    applyUrlFilters(DEFAULT_WORLD_SAVE_FILTERS);
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, DEFAULT_WORLD_SAVE_FILTERS)) return false;
    return true;
  }, [filters]);

  // #region Apply Filters Handler
  const pathname = usePathname();
  const router = useRouter();

  function applyUrlFilters(filtersToApply: WorldSaveFilters) {
    let url = `${pathname}?t=${Date.now()}&`;

    // Add the boss name filter
    if (filtersToApply.bossName !== DEFAULT_FILTER) {
      url += `${WORLD_SAVE_FILTER_KEYS.BOSSNAME}=${filtersToApply.bossName}&`;
    }

    // Add the boss affixes filter
    if (!filtersToApply.bossAffixes.some((i) => i === DEFAULT_FILTER)) {
      url += `${
        WORLD_SAVE_FILTER_KEYS.BOSSAFFIXES
      }=${filtersToApply.bossAffixes.join(',')}&`;
    }

    // Add the releases filter
    if (!filtersToApply.releases.some((i) => i === DEFAULT_FILTER)) {
      url += `${WORLD_SAVE_FILTER_KEYS.RELEASES}=${filtersToApply.releases.join(
        ',',
      )}&`;
    }

    // trim the final &
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    router.push(url, { scroll: false });
  }

  // #region Filter Change Handlers

  function handleBossNameChange(newBossName: string) {
    const newFilters = { ...unappliedFilters, bossName: newBossName };
    setUnappliedFilters(newFilters);
    applyUrlFilters(newFilters);
  }

  function handleBossAffixesChange(newBossAffixes: string[]) {
    // if the newBossAffixes length is 0, set to the default value
    if (newBossAffixes.length === 0) {
      const newFilters = { ...unappliedFilters, bossAffixes: [DEFAULT_FILTER] };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if the first item is the default value ("All"), apply the filters after removing the default value
    if (newBossAffixes[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        bossAffixes: newBossAffixes.filter((i) => i !== DEFAULT_FILTER),
      };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // if any of the filters contain the default value of "All", just apply the filters
    if (newBossAffixes.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, bossAffixes: [DEFAULT_FILTER] };
      setUnappliedFilters(newFilters);
      applyUrlFilters(newFilters);
      return;
    }

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      bossAffixes: newBossAffixes.filter((i) => i !== DEFAULT_FILTER),
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

  // #region Render

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="w-full">
          <div className="border-b-primary-500 flex w-full flex-row items-end justify-end border-b py-2">
            <div className="w-full pr-4">
              <BossNameFilter
                value={unappliedFilters.bossName}
                onChange={handleBossNameChange}
              />
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
                    <BossAffixFilter
                      value={unappliedFilters.bossAffixes}
                      onChange={handleBossAffixesChange}
                    />
                    <BaseText className="mt-2 text-sm">
                      <BaseTextLink
                        href="https://remnant.wiki/Affix"
                        target="_blank"
                      >
                        For more detailed affix information, visit the Remnant
                        Wiki
                      </BaseTextLink>
                    </BaseText>
                  </div>
                  <div className="col-span-full">
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
                    <BaseText className="mt-2">
                      <span className="text-sm italic text-gray-400">
                        Releases refer to the game version the world save was
                        created in. It is not related to the bosses or affixes.
                      </span>
                    </BaseText>
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
