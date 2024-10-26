import { BaseField, FiltersContainer } from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { InputWithClear } from '@/app/_components/input-with-clear';
import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { ArchetypeFilter } from '@/app/(builds)/_features/new-filters/_components/archetype-filter';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/new-filters/_constants/default-build-fields';
import { parseUrlParams } from '@/app/(builds)/_features/new-filters/_libs/parse-url-params';
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [unappliedFilters, setUnappliedFilters] =
    useState<BuildFilterFields>(DEFAULT_BUILD_FIELDS);

  const filters = useMemo(() => {
    const newFilters = parseUrlParams({ searchParams, defaultFilters });
    setUnappliedFilters(newFilters);
    return newFilters;
  }, [searchParams, defaultFilters]);

  /** Whether any filters are active */
  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, defaultFilters)) return false;
    return true;
  }, [filters, defaultFilters]);

  /** Whether any filters are changed but not yet active. */
  const areFiltersUnapplied = useMemo(() => {
    if (isEqual(filters, unappliedFilters)) return false;
    return true;
  }, [filters, unappliedFilters]);

  // #region Handlers

  function handleSearchTextChange(searchText: string) {
    const newFilters = {
      ...unappliedFilters,
      searchText,
    };
    setUnappliedFilters(newFilters);
  }

  function applyUrlFilters(newFilters: BuildFilterFields) {
    const params = new URLSearchParams(searchParams.toString());

    // If archetype filters are differnet from default, add them to the URL
    if (!isEqual(newFilters.archetypes, defaultFilters.archetypes)) {
      const paramValues = newFilters.archetypes
        .filter((archetype) => archetype.state !== 'default')
        .map((archetype) => {
          return archetype.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${archetype.value}`
            : archetype.value;
        });
      if (paramValues.length > 0) {
        params.set('archetypes', paramValues.join(','));
      } else {
        params.delete('archetypes');
      }
    }

    // Add unique timestamp to prevent caching when linking
    if (!params.has('t')) {
      params.append('t', Date.now().toString());
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onFiltersChange();
  }

  // #region Render
  return (
    <FiltersContainer
      areAnyFiltersActive={areAnyFiltersActive}
      areFiltersUnapplied={areFiltersUnapplied}
      onApplyFilters={() => applyUrlFilters(unappliedFilters)}
      onClearFilters={() => {
        // Remove all filters from the url and load the page
        setUnappliedFilters(defaultFilters);
        router.push(pathname, { scroll: false });
      }}
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
