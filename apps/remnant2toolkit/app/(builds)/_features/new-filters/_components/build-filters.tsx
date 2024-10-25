import { BaseField, FiltersContainer } from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { InputWithClear } from '@/app/_components/input-with-clear';
import { ArchetypeFilter } from '@/app/(builds)/_features/new-filters/_components/archetype-filter';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/new-filters/_constants/default-build-fields';
import { type BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';

import { archetypeFilter } from '../_libs/archetype-filter';

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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
    const params = new URLSearchParams(searchParams.toString());

    if (
      !isEqual(newFilters.archetypes, defaultFilters.archetypes) &&
      newFilters.archetypes.length !== archetypeFilter.validOptions.length
    ) {
      params.set(
        archetypeFilter.buildFilterKey,
        newFilters.archetypes.map((archetype) => archetype.value).join(','),
      );
    }

    // Add unique timestamp to prevent caching when linking
    params.append('t', Date.now().toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onFiltersChange();
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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <BaseField className="col-span-full sm:col-span-1">
          <ArchetypeFilter
            onChange={(newValues) => {
              setUnappliedFilters({
                ...unappliedFilters,
                archetypes: newValues,
              });
            }}
            values={unappliedFilters.archetypes}
          />
        </BaseField>
      </div>
    </FiltersContainer>
  );
}
