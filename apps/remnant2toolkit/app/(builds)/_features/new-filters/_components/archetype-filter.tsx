import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  BaseListbox,
  BaseListboxOption,
  FilterIcon,
  FilterListbox,
  type FilterOption,
} from '@repo/ui';

interface Props {
  onChange: (values: FilterOption[]) => void;
  values: FilterOption[];
}

export function ArchetypeFilter({ values, onChange }: Props) {
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
                options={values}
                label="Archetypes"
                onChange={onChange}
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
