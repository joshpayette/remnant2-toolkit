'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { type NotificationType } from '@repo/db';
import {
  BaseButton,
  BaseCheckbox,
  BaseCheckboxField,
  BaseCheckboxGroup,
  BaseFieldGroup,
  BaseFieldset,
  BaseLabel,
  BaseLegend,
  FilterIcon,
} from '@repo/ui';
import { type Dispatch, type SetStateAction } from 'react';

import { STATUS_FILTERS, type StatusFilters, TYPE_FILTERS } from './filter-types';

interface Props {
    statusFilters: Array<StatusFilters>;
    setStatusFilters: Dispatch<SetStateAction<Array<StatusFilters>>>;
    typeFilters: Array<NotificationType>;
    setTypeFilters: Dispatch<SetStateAction<Array<NotificationType>>>;
}

function getNewFilters<T>(checked: boolean, value: T, values: Array<T>) {
    return checked ? values.concat(value) : values.filter((val) => val !== value);
}

export function NotificationFilters(props: Props) {
    const { statusFilters, setStatusFilters, typeFilters, setTypeFilters } = props;

  return (
    <div className="w-full max-w-4xl mb-2">
      <Disclosure defaultOpen={false}>
        {({ open }) => (
          <div className="w-full">
            <div className="border-b-primary-500 flex w-full flex-row items-center justify-center border-b py-2">
              <DisclosureButton as={BaseButton}>
                <FilterIcon className="h-4 w-4" />
                {open ? 'Hide Notification Filters' : 'Show Notification Filters'}
              </DisclosureButton>
            </div>
            <DisclosurePanel>
              <BaseFieldset>
                <BaseFieldGroup>
                  <div className="grid grid-cols-2 gap-8 sm:gap-4">
                    <div className="col-span-full sm:col-span-1">
                        <BaseFieldset>
                            <BaseLegend>Status?</BaseLegend>
                            <BaseCheckboxGroup className="grid grid-cols-1">
                                {STATUS_FILTERS.map((value) => (
                                <BaseCheckboxField key={value}>
                                    <BaseCheckbox
                                        name="status"
                                        value={value}
                                        onChange={(checked) => setStatusFilters(getNewFilters(checked, value, statusFilters))}
                                        checked={statusFilters.includes(value)}
                                    />
                                    <BaseLabel>{value}</BaseLabel>
                                </BaseCheckboxField>
                                ))}
                            </BaseCheckboxGroup>
                        </BaseFieldset>
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <BaseFieldset>
                            <BaseLegend>Type?</BaseLegend>
                            <BaseCheckboxGroup className="grid grid-cols-1">
                                {TYPE_FILTERS.map((value) => (
                                <BaseCheckboxField key={value}>
                                    <BaseCheckbox
                                        name="type"
                                        value={value}
                                        onChange={(checked) => setTypeFilters(getNewFilters(checked, value, typeFilters))}
                                        checked={typeFilters.includes(value)}
                                    />
                                    <BaseLabel>{value}</BaseLabel>
                                </BaseCheckboxField>
                                ))}
                            </BaseCheckboxGroup>
                        </BaseFieldset>
                    </div>
                  </div>
                </BaseFieldGroup>
              </BaseFieldset>
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
