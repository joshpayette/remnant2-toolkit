import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  BaseListbox,
  BaseListboxOption,
  FilterIcon,
  FilterListbox,
  type FilterListboxState,
  type FilterOption,
} from '@repo/ui';

import type { FilterField } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

interface Props {
  onChange: (values: FilterField) => void;
  values: FilterField;
}

export function ArchetypeFilter({ values, onChange }: Props) {
  const options: FilterOption[] = archetypeItems.map((item) => {
    let state: FilterListboxState = 'default';
    if (values.included?.includes(item.id)) {
      state = 'included';
    } else if (values.excluded?.includes(item.id)) {
      state = 'excluded';
    }

    return {
      label: item.name,
      value: item.id,
      state,
    };
  });

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="w-full">
          <div className="border-b-primary-500 mb-2 flex w-full flex-row items-end justify-end border-b py-2">
            <div className="w-full pr-4">
              <h3 className="ui-text-md ui-font-semibold ui-text-surface-solid">
                Archetypes
              </h3>
            </div>
            <Disclosure.Button as={BaseButton}>
              <FilterIcon className="h-4 w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <div className="flex w-full flex-wrap gap-2">
              <FilterListbox
                options={options}
                label="Archetypes"
                // onChange={(newState) => {
                //   console.info('newState', newState);
                //   //onChange(newValues);
                // }}
              />
            </div>
          </Disclosure.Panel>
          <BaseListbox>
            <BaseListboxOption value="test">Test</BaseListboxOption>
          </BaseListbox>
        </div>
      )}
    </Disclosure>
  );
}
