import { BaseField, FiltersContainer } from '@repo/ui';
import isEqual from 'lodash.isequal';
import { useMemo, useState } from 'react';

import { InputWithClear } from '@/app/_components/input-with-clear';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/new-filters/_constants/default-build-fields';
import { type BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';

export function BuildFilters({
  defaultFilterOverrides,
  onFiltersChange,
}: {
  defaultFilterOverrides?: Partial<BuildFilterFields>;
  onFiltersChange: () => void;
}) {
  const defaultFilters = useMemo(() => {
    return {
      ...DEFAULT_BUILD_FIELDS,
      ...defaultFilterOverrides,
    };
  }, [defaultFilterOverrides]);

  // TODO
  const filters = DEFAULT_BUILD_FIELDS;

  const [unappliedFilters, setUnappliedFilters] =
    useState<BuildFilterFields>(filters);

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, defaultFilters)) return false;
    return true;
  }, [filters, defaultFilters]);

  // # Handlers
  function handleSearchTextChange(searchText: string) {
    const newFilters = {
      ...unappliedFilters,
      searchText,
    };
    setUnappliedFilters(newFilters);
  }

  function applyUrlFilters(newFilters: BuildFilterFields) {
    // TODO Create the url query string and route to the new url
  }

  // # Render
  return (
    <FiltersContainer
      areAnyFiltersActive={areAnyFiltersActive}
      searchInput={
        <BaseField className="col-span-full sm:col-span-2">
          <div className="w-full max-w-[600px]">
            <InputWithClear
              onChange={(e) => handleSearchTextChange(e.target.value)}
              onClear={() => {
                const newFilters = {
                  ...unappliedFilters,
                  searchText: '',
                };
                setUnappliedFilters(newFilters);
                applyUrlFilters(newFilters);
              }}
              onKeyDown={(e) => {
                // If the user presses enter, apply the filters
                if (e.key === 'Enter') {
                  applyUrlFilters(unappliedFilters);
                }
              }}
              placeholder="Build name, description, or creator"
              type="text"
              value={unappliedFilters.searchText}
            />
          </div>
        </BaseField>
      }
    >
      Filters
    </FiltersContainer>
  );
}
