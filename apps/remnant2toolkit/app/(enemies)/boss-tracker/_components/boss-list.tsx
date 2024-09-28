'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, cn } from '@repo/ui';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';

import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import {
  type BossTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/_types/localstorage';
import {
  aberrationEnemies,
  bossEnemies,
  worldBossEnemies,
} from '@/app/(enemies)/_constants/remnant-enemies';
import { type BossCategory, type Enemy } from '@/app/(enemies)/_types';
import { BossTrackerCard } from '@/app/(enemies)/boss-tracker/_components/boss-tracker-card';
import {
  type BossTrackerCategory,
  type BossTrackerFilters,
} from '@/app/(enemies)/boss-tracker/_types';
import { getTrackerProgress } from '@/app/(enemies)/boss-tracker/_utils/get-tracker-progress';
import { parseUrlFilters } from '@/app/(enemies)/boss-tracker/_utils/parse-url-filters';

const TRACKABLE_BOSSES = [
  ...bossEnemies,
  ...worldBossEnemies,
  ...aberrationEnemies,
];

function getFilteredBossList(
  filters: BossTrackerFilters,
  discoveredBossIds: string[],
): Array<Enemy & { discovered: boolean }> {
  let filteredBosses = TRACKABLE_BOSSES.map((b) => {
    return {
      ...b,
      discovered: discoveredBossIds.includes(b.id),
    };
  });

  // If category is not default, filter by category
  if (
    filters.categories.length > 0 &&
    !filters.categories.some((c) => c === DEFAULT_FILTER)
  ) {
    filteredBosses = filteredBosses.filter((b) =>
      filters.categories
        .map((c) => c.toLowerCase())
        .filter((i) => i !== DEFAULT_FILTER)
        .includes(b.category.toLowerCase()),
    );
  }

  // If search text is not empty, filter by search text
  if (filters.searchText.length > 0) {
    filteredBosses = filteredBosses.filter((b) =>
      b.name.toLowerCase().includes(filters.searchText.toLowerCase()),
    );
  }

  return filteredBosses;
}

export function BossList() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(parseUrlFilters(searchParams));

  useEffect(() => {
    setFilters(parseUrlFilters(searchParams));
  }, [searchParams]);

  const [tracker, setTracker] = useLocalStorage<BossTrackerLocalStorage>(
    LOCALSTORAGE_KEY.BOSS_TRACKER,
    {
      discoveredBossIds: [],
      collapsedBossCategories: [],
    },
    { initializeWithValue: false },
  );
  const { discoveredBossIds, collapsedBossCategories } = tracker;

  const filteredBosses = getFilteredBossList(filters, discoveredBossIds);

  const bossCategories: BossTrackerCategory[] = [
    { category: 'world boss' as BossCategory, label: 'World Boss' },
    { category: 'boss' as BossCategory, label: 'Boss' },
    { category: 'aberration' as BossCategory, label: 'Aberration' },
  ].filter((bossCategory) => {
    const visibleBossCategories = Array.from(
      new Set(TRACKABLE_BOSSES.map((boss) => boss.category)),
    ).filter(
      (category) =>
        filters.categories
          .map((category) => category.toLowerCase())
          .includes(category) || filters.categories.includes(DEFAULT_FILTER),
    );

    return visibleBossCategories.includes(bossCategory.category);
  });

  function handleCategoryToggle(bossCategory: BossCategory) {
    const newCollapsedBossCategories = collapsedBossCategories.includes(
      bossCategory,
    )
      ? collapsedBossCategories.filter((type) => type !== bossCategory)
      : [...collapsedBossCategories, bossCategory];

    setTracker({
      ...tracker,
      collapsedBossCategories: newCollapsedBossCategories,
    });
  }

  function handleListItemClicked(bossId: string) {
    // If the boss is already discovered, undiscover it
    if (discoveredBossIds.includes(bossId)) {
      const newDiscoveredBossIds = discoveredBossIds.filter(
        (id) => id !== bossId,
      );
      setTracker({ ...tracker, discoveredBossIds: newDiscoveredBossIds });
      // We need to set the user item insert needed flag
      // so that the next time they filter builds by collection,
      // their items will be updated
      return;
    }

    const newDiscoveredBossIds = [...discoveredBossIds, bossId];
    setTracker({ ...tracker, discoveredBossIds: newDiscoveredBossIds });
  }

  const isClient = useIsClient();
  if (!isClient) return null;

  // #region Render
  return (
    <div className="w-full">
      {bossCategories.map((bossCategory) => (
        <Disclosure
          key={`${bossCategory.label}-${bossCategory.category}`}
          defaultOpen={!collapsedBossCategories.includes(bossCategory.category)}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                onClick={() => handleCategoryToggle(bossCategory.category)}
                className="border-secondary-700 hover:border-primary-400 hover:bg-background-solid focus-visible:ring-primary-500/75 flex w-full justify-start border-b p-4 text-left focus:outline-none focus-visible:ring"
              >
                <div className="w-full">
                  <h2 className="text-lg font-semibold">
                    {bossCategory.label}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {isClient
                      ? getTrackerProgress(
                          filteredBosses.filter((boss) => {
                            return boss.category === bossCategory.category;
                          }),
                          bossCategory,
                        )
                      : 'Calculating...'}
                  </span>
                </div>
                <ChevronDownIcon
                  className={cn(
                    'text-surface-solid h-5 w-5',
                    open ? 'rotate-180 transform' : '',
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredBosses
                  .filter((boss) => {
                    return boss.category === bossCategory.category;
                  }) // Filter by category
                  .map((boss) => (
                    <BossTrackerCard
                      key={boss.id}
                      boss={boss}
                      onClick={handleListItemClicked}
                    />
                  ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
