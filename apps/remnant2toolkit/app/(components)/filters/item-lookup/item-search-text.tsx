'use client';

import { Combobox } from '@headlessui/react';
import {
  BaseInput,
  CheckIcon,
  ChevronUpDownIcon,
  cn,
  Skeleton,
} from '@repo/ui';
import React, { useEffect, useState } from 'react';
import { useIsClient, useMediaQuery } from 'usehooks-ts';

type Item = {
  id: string;
  name: string;
};

interface Props {
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: () => void;
  items: Array<{ id: string; name: string }>;
  value: string;
  showLabel?: boolean;
}

export function ItemSearchText({
  autoFocus = false,
  onChange,
  onKeyDown,
  items,
  showLabel = true,
  value,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(
    value === ''
      ? null
      : {
          id: '',
          name: value,
        },
  );

  useEffect(() => {
    if (!selectedItem) return;
    if (selectedItem.name === value && onKeyDown) onKeyDown();
  }, [selectedItem, onKeyDown, value]);

  const filteredItems =
    value === ''
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase()),
        );

  const isClient = useIsClient();
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  if (!isClient) return <Skeleton className="h-[45px] w-[400px]" />;

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(item) => {
        if (item) {
          setSelectedItem(item);
          onChange(item.name);
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
          if (onKeyDown) onKeyDown();
        }
      }}
      className={cn('w-full')}
      nullable
    >
      <Combobox.Label
        className={cn(
          'text-primary-500 block text-sm font-bold leading-6',
          showLabel && 'sr-only',
        )}
      >
        Search Text
      </Combobox.Label>

      <div className="relative mt-2">
        <Combobox.Input
          onChange={(event) => onChange(event.target.value)}
          displayValue={(item: Item) => item?.name}
          placeholder="Search for an item or tag"
          autoFocus={autoFocus && isLargeScreen}
          as={BaseInput}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Combobox.Options className="ring-background-solid absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
          {value.length > 0 && (
            <Combobox.Option
              value={{ id: null, name: value }}
              className={({ active }) =>
                cn(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active
                    ? 'bg-secondary-600 text-surface-solid'
                    : 'text-gray-300',
                )
              }
            >
              {value}
            </Combobox.Option>
          )}

          {filteredItems.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                cn(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active
                    ? 'bg-secondary-600 text-surface-solid'
                    : 'text-gray-300',
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={cn(
                      'block truncate',
                      selected && 'font-semibold',
                    )}
                  >
                    {item.name}
                  </span>

                  {selected && (
                    <span
                      className={cn(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-surface-solid' : 'text-secondary-600',
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
