import {
  BaseButton,
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
  cn,
  SortIcon,
} from '@repo/ui';
import { capitalize } from '@repo/utils';
import { useCallback, useEffect, useState } from 'react';
import { useDebounceValue, useLocalStorage } from 'usehooks-ts';

import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { ItemSearchText } from '@/app/(items)/_components/filters/item-lookup/item-search-text';
import { ItemButton } from '@/app/(items)/_components/item-button';
import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { type Item } from '@/app/(items)/_types/item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';
import { itemMatchesSearchText } from '@/app/(items)/_utils/item-matches-search-text';
import { type SortingPreference } from '@/app/(types)/localstorage';
import { ITEM_TOKENS } from '@/app/(types)/tokens';

function buildSearchTextOptions(): Array<{ id: string; name: string }> {
  let items = ITEM_TOKENS.map((tag) => ({
    id: tag as string,
    name: tag as string,
  }));

  items = items.sort((a, b) => a.name.localeCompare(b.name));

  // remove duplicates
  items = items.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.name === item.name),
  );

  return items;
}

function sortByPreference({
  items,
  buildSlot,
  sortingPreference,
}: {
  items: Item[];
  buildSlot: ItemCategory | null;
  sortingPreference: SortingPreference;
}) {
  if (buildSlot !== 'trait') return items;

  if (sortingPreference === 'alphabetical') {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return ([...items] as TraitItem[]).sort(
      (a, b) => a.inGameOrder - b.inGameOrder,
    );
  }
}

interface Props {
  open: boolean;
  itemList: Item[];
  buildSlot: ItemCategory | null;
  onClose: () => void;
  onSelectItem: (item: Item | null) => void;
}

export function ItemSelectDialog({
  open,
  itemList,
  buildSlot,
  onClose,
  onSelectItem,
}: Props) {
  const searchTextOptions = buildSearchTextOptions();

  const [infoItem, setInfoItem] = useState<Item | null>(null);
  const isItemInfoOpen = Boolean(infoItem);

  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounceValue(filter, 500);

  const [sortingPreference, setSortingPreference] =
    useLocalStorage<SortingPreference>('sorting-preference', 'alphabetical', {
      initializeWithValue: false,
    });

  const getNewSortedItems = useCallback(() => {
    const filteredItems = itemList
      .filter((item) =>
        itemMatchesSearchText({ item, searchText: debouncedFilter }),
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    const sortedItems =
      buildSlot === 'trait'
        ? sortByPreference({
            items: filteredItems,
            buildSlot,
            sortingPreference,
          })
        : filteredItems;

    return sortedItems;
  }, [buildSlot, debouncedFilter, itemList, sortingPreference]);

  const [filteredItemList, setFilteredItemList] = useState(getNewSortedItems());

  // * useEffect appropriate here to react to changes
  useEffect(() => {
    setFilteredItemList(getNewSortedItems());
  }, [debouncedFilter, sortingPreference, getNewSortedItems]);

  function handleSortingPreferenceToggle() {
    if (buildSlot !== 'trait') return;

    const newSortingPreference =
      sortingPreference === 'alphabetical' ? 'in-game' : 'alphabetical';
    setSortingPreference(newSortingPreference);
  }

  if (!buildSlot) return null;

  return (
    <BaseDialog open={open} title="Select an Item" onClose={onClose} size="5xl">
      <ItemInfoDialog
        item={infoItem}
        open={isItemInfoOpen}
        onClose={() => setInfoItem(null)}
      />
      <BaseDialogTitle>{`Select ${
        buildSlot === 'relicfragment' ? 'Relic Fragment' : capitalize(buildSlot)
      }`}</BaseDialogTitle>
      <BaseDialogBody>
        <div className="flex w-full items-center justify-center">
          <div className="mb-4 grid w-full max-w-lg grid-cols-3 gap-x-4">
            <div
              className={cn(
                'text-left',
                buildSlot === 'trait' ? 'col-span-2' : 'col-span-full',
              )}
            >
              <ItemSearchText
                items={searchTextOptions}
                onChange={(newValue: string) => setFilter(newValue)}
                value={filter}
              />
            </div>
            {buildSlot === 'trait' && (
              <div className="col-span-1 flex items-end justify-start">
                <BaseButton
                  plain
                  className="flex items-center justify-center"
                  aria-label="Toggle sorting preference"
                  onClick={handleSortingPreferenceToggle}
                >
                  <SortIcon className="mr-2 h-6 w-6" />
                  {capitalize(sortingPreference)}
                </BaseButton>
              </div>
            )}
          </div>
        </div>

        <hr className="border-primary-500 mb-8 mt-4" />

        <ul
          role="list"
          className="flex flex-wrap items-start justify-center gap-4"
        >
          {buildSlot !== 'trait' && (
            <li id="clear-item" className="min-h-[70px] w-[100px]">
              <ItemButton
                item={
                  {
                    name: 'Clear',
                    category: buildSlot,
                    imagePath: '/misc/cancel-icon.png',
                    id: '',
                  } as Item
                }
                onClick={() => onSelectItem(null)}
                tooltipDisabled={isItemInfoOpen}
                variant="large"
              />
            </li>
          )}
          {filteredItemList.map((item) => (
            <li key={item.name} className="min-h-[70px] w-[100px]">
              <ItemButton
                item={item}
                onClick={() => onSelectItem(item)}
                onItemInfoClick={() => setInfoItem(item)}
                tooltipDisabled={isItemInfoOpen}
                variant="large"
              />
            </li>
          ))}
        </ul>
      </BaseDialogBody>
    </BaseDialog>
  );
}
