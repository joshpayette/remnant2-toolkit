'use client';

import { Disclosure } from '@headlessui/react';
import { BaseButton, ChevronDownIcon, cn, InfoCircleIcon } from '@repo/ui';
import { capitalize } from '@repo/utils';
import isEqual from 'lodash.isequal';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';

import { DEFAULT_ITEM_TRACKER_FILTERS } from '@/app/(items)/_components/filters/item-tracker/item-tracker-filters';
import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { ItemLocationsDialog } from '@/app/(items)/_components/item-locations-dialog';
import { ItemTrackerCard } from '@/app/(items)/_components/item-tracker-card';
import { type Item } from '@/app/(items)/_types/item';
import { ALL_TRACKABLE_ITEMS } from '@/app/(items)/item-tracker/_constants';
import { type ItemTrackerCategory } from '@/app/(items)/item-tracker/_types';
import { getCategoryProgressLabel } from '@/app/(items)/item-tracker/_utils/get-category-progress-label';
import { getFilteredItemCategories } from '@/app/(items)/item-tracker/_utils/get-filtered-item-categories';
import { getFilteredItemList } from '@/app/(items)/item-tracker/_utils/get-filtered-item-list';
import { getFilteredItemsForCategory } from '@/app/(items)/item-tracker/_utils/get-filtered-items-for-category';
import { parseUrlFilters } from '@/app/(items)/item-tracker/_utils/parse-url-filters';
import {
  type ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage';

interface Props {
  discoveredItemIds: string[];
  handleSetDiscoveredItems: (discoveredItemIds: string[]) => void;
}

// #region Component

export function ItemList({
  discoveredItemIds,
  handleSetDiscoveredItems,
}: Props) {
  // #region Data

  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  );
  const { collapsedCategories } = tracker;

  // #region Filters
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(parseUrlFilters(searchParams));

  const [areFiltersApplied, setAreFiltersApplied] = useState(
    !isEqual(filters, DEFAULT_ITEM_TRACKER_FILTERS),
  );

  useEffect(() => {
    setFilters(parseUrlFilters(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (!isEqual(filters, DEFAULT_ITEM_TRACKER_FILTERS)) {
      setAreFiltersApplied(true);
    }
  }, [filters]);

  const filteredItems = getFilteredItemList(filters, discoveredItemIds);
  // Remove the categories not found in the filtered items
  const visibleItemCategories = getFilteredItemCategories(filteredItems);

  const [itemLocationsDialogOpen, setItemLocationsDialogOpen] = useState(false);
  const [currentFilteredItems, setCurrentFilteredItems] = useState<Item[]>([]);

  // #region Handlers

  function handleCategoryToggle(itemCategory: ItemTrackerCategory) {
    const newCollapsedItemCategories = collapsedCategories.includes(
      itemCategory,
    )
      ? collapsedCategories.filter((type) => type !== itemCategory)
      : [...collapsedCategories, itemCategory];

    setTracker({
      ...tracker,
      collapsedCategories: newCollapsedItemCategories,
    });
  }

  async function handleListItemClicked(itemId: string) {
    let newDiscoveredItemIds: string[] = [];

    // If the item is already discovered, undiscover it
    if (discoveredItemIds.includes(itemId)) {
      newDiscoveredItemIds = discoveredItemIds.filter((id) => id !== itemId);
    } else {
      newDiscoveredItemIds = [...discoveredItemIds, itemId];
    }

    handleSetDiscoveredItems(newDiscoveredItemIds);
  }

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null);
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo);

  const handleShowItemInfo = (itemId: string) => {
    const item = ALL_TRACKABLE_ITEMS.find((item) => item.id === itemId);
    if (item) setItemInfo(item);
  };

  // #region Render
  const isClient = useIsClient();
  if (!isClient) return null;

  return (
    <>
      <ItemInfoDialog
        item={itemInfo}
        open={isShowItemInfoOpen}
        onClose={() => setItemInfo(null)}
      />
      <ItemLocationsDialog
        open={itemLocationsDialogOpen}
        onClose={() => setItemLocationsDialogOpen(false)}
        filteredItems={currentFilteredItems}
        discoveredItemIds={discoveredItemIds}
      />
      <div className="w-full">
        {!areFiltersApplied && (
          <div className="flex flex-col items-center justify-center gap-y-2">
            <h2 className="text-primary-400 mt-4 text-center text-2xl font-bold">
              Apply a filter, or...
            </h2>
            <BaseButton onClick={() => setAreFiltersApplied(true)}>
              Show All Items
            </BaseButton>
          </div>
        )}
        {filteredItems.length > 0 && areFiltersApplied && (
          <h2 className="text-primary-400 my-4 w-full text-center text-2xl font-bold">
            Filtered Items ({filteredItems.length} Results)
          </h2>
        )}
        {areFiltersApplied &&
          visibleItemCategories.map((itemCategory) => (
            <Disclosure
              key={itemCategory as string}
              defaultOpen={!collapsedCategories.includes(itemCategory)}
            >
              {({ open }) => (
                <>
                  <div className="flex w-full">
                    <button
                      className={cn(
                        'text-md bg-background hover:bg-background-solid border-secondary-700 hover:border-primary-400 flex items-center justify-center border-b text-center font-bold sm:text-lg',
                      )}
                      onClick={() => {
                        setCurrentFilteredItems(
                          getFilteredItemsForCategory(
                            ALL_TRACKABLE_ITEMS,
                            itemCategory,
                          ),
                        );
                        setItemLocationsDialogOpen(true);
                      }}
                    >
                      <InfoCircleIcon className="text-accent1-500 h-4 w-4" />
                    </button>
                    <Disclosure.Button
                      onClick={() => handleCategoryToggle(itemCategory)}
                      className="border-secondary-700 hover:border-primary-400 hover:bg-background-solid focus-visible:ring-primary-500/75 flex w-full justify-start border-b p-4 text-left focus:outline-none focus-visible:ring"
                    >
                      <div className="w-full">
                        <h2 className="text-lg font-semibold">
                          {capitalize(itemCategory as string)} -{' '}
                          {getCategoryProgressLabel({
                            filteredItems: getFilteredItemsForCategory(
                              ALL_TRACKABLE_ITEMS,
                              itemCategory,
                            ),
                            discoveredItemIds,
                          })}
                        </h2>
                      </div>
                      <ChevronDownIcon
                        className={cn(
                          'text-surface-solid h-5 w-5',
                          open ? 'rotate-180 transform' : '',
                        )}
                      />
                    </Disclosure.Button>
                  </div>
                  <Disclosure.Panel className="grid w-full grid-cols-3 gap-4 py-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10">
                    {getFilteredItemsForCategory(
                      filteredItems,
                      itemCategory,
                    ).map((item) => (
                      <ItemTrackerCard
                        key={item.id}
                        item={item}
                        onClick={handleListItemClicked}
                        onShowItemInfo={handleShowItemInfo}
                        tooltipDisabled={isShowItemInfoOpen}
                      />
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
      </div>
    </>
  );
}
