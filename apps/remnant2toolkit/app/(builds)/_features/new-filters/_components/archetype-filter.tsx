import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  FilterIcon,
  FilterSwitch,
  type FilterSwitchValue,
} from '@repo/ui';

import type { FilterField } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

interface Props {
  onChange: (values: FilterField) => void;
  values: FilterField;
}

export function ArchetypeFilter({ values, onChange }: Props) {
  const archetypes = archetypeItems.map((item) => {
    let value: FilterSwitchValue = 'unchecked';
    if (values.checked.includes(item.id)) {
      value = 'checked';
    } else if (values.excluded.includes(item.id)) {
      value = 'excluded';
    }

    return {
      name: item.name,
      id: item.id,
      value,
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
            <div className="flex flex-wrap gap-4">
              {archetypes.map((archetype) => (
                <FilterSwitch
                  key={archetype.id}
                  value={archetype.value}
                  label={archetype.name}
                  onChange={(newValue) => {
                    const newValues = { ...values };
                    if (newValue === 'checked') {
                      newValues.checked.push(archetype.id);
                      newValues.excluded = newValues.excluded.filter(
                        (id) => id !== archetype.id,
                      );
                      newValues.unchecked = newValues.unchecked.filter(
                        (id) => id !== archetype.id,
                      );
                    } else if (newValue === 'excluded') {
                      newValues.excluded.push(archetype.id);
                      newValues.checked = newValues.checked.filter(
                        (id) => id !== archetype.id,
                      );
                      newValues.unchecked = newValues.unchecked.filter(
                        (id) => id !== archetype.id,
                      );
                    } else {
                      newValues.unchecked.push(archetype.id);
                      newValues.checked = newValues.checked.filter(
                        (id) => id !== archetype.id,
                      );
                      newValues.excluded = newValues.excluded.filter(
                        (id) => id !== archetype.id,
                      );
                    }
                    onChange(newValues);
                  }}
                />
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
