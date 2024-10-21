import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  FilterIcon,
  FilterSwitch,
  type FilterSwitchState,
} from '@repo/ui';

import type { FilterField } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

interface Props {
  onChange: (values: FilterField) => void;
  values: FilterField;
}

export function ArchetypeFilter({ values, onChange }: Props) {
  const archetypes = archetypeItems.map((item) => {
    let state: FilterSwitchState = 'default';
    if (values.included.includes(item.id)) {
      state = 'included';
    } else if (values.excluded.includes(item.id)) {
      state = 'excluded';
    }

    return {
      name: item.name,
      id: item.id,
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
            <div className="flex flex-wrap gap-4">
              {archetypes.map((archetype) => (
                <FilterSwitch
                  key={archetype.id}
                  state={archetype.state}
                  label={archetype.name}
                  onChange={(newState) => {
                    const newValues = { ...values };
                    if (newState === 'included') {
                      newValues.included.push(archetype.id);
                      newValues.excluded = newValues.excluded.filter(
                        (id) => id !== archetype.id,
                      );
                      newValues.default = newValues.default.filter(
                        (id) => id !== archetype.id,
                      );
                    } else if (newState === 'excluded') {
                      newValues.excluded.push(archetype.id);
                      newValues.included = newValues.included.filter(
                        (id) => id !== archetype.id,
                      );
                      newValues.default = newValues.default.filter(
                        (id) => id !== archetype.id,
                      );
                    } else {
                      newValues.default.push(archetype.id);
                      newValues.included = newValues.included.filter(
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
