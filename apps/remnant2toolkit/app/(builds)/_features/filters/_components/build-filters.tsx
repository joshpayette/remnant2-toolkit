import { BaseField, FilterListbox, FiltersContainer } from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { InputWithClear } from '@/app/_components/input-with-clear';
import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/amulet-filter';
import { archetypeFilter } from '@/app/(builds)/_features/filters/_libs/archetype-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import { type BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';

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

  /**
   * Applies the filters to the URL and triggers a re-fetch of the data.
   */
  function applyUrlFilters(newFilters: BuildFilterFields) {
    const params = new URLSearchParams(searchParams.toString());

    if (isEqual(newFilters.archetypes, defaultFilters.archetypes)) {
      params.delete(archetypeFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.archetypes
        .filter((archetype) => archetype.state !== 'default')
        .map((archetype) => {
          return archetype.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${archetype.value}`
            : archetype.value;
        });
      if (paramValues.length > 0) {
        params.set(archetypeFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(archetypeFilter.buildFilterKey);
      }
    }

    if (isEqual(newFilters.amulets, defaultFilters.amulets)) {
      params.delete(amuletFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.amulets
        .filter((amulet) => amulet.state !== 'default')
        .map((amulet) => {
          return amulet.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${amulet.value}`
            : amulet.value;
        });
      if (paramValues.length > 0) {
        params.set(amuletFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(amuletFilter.buildFilterKey);
      }
    }

    if (newFilters.searchText === defaultFilters.searchText) {
      params.delete(searchTextFilter.buildFilterKey);
    } else {
      params.set(searchTextFilter.buildFilterKey, newFilters.searchText);
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
      onClearFilters={() => {
        applyUrlFilters(defaultFilters);
      }}
      searchInput={
        <BaseField className="col-span-full sm:col-span-2">
          <div className="w-full max-w-[600px]">
            <InputWithClear
              onChange={(e) => {
                const newFilters = {
                  ...unappliedFilters,
                  searchText: e.target.value,
                };
                setUnappliedFilters(newFilters);
              }}
              onClear={() => {
                if (!areAnyFiltersActive) return;
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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <BaseField
          id="archetypes-filter"
          className="col-span-full sm:col-span-1"
        >
          <FilterListbox
            options={unappliedFilters.archetypes}
            label={archetypeFilter.label}
            onBlur={() => applyUrlFilters(unappliedFilters)}
            onChange={(newValues) => {
              const newFilters = {
                ...unappliedFilters,
                archetypes: newValues,
              };
              setUnappliedFilters(newFilters);
            }}
          />
        </BaseField>
        <BaseField id="amulets-filter" className="col-span-full sm:col-span-1">
          <FilterListbox
            options={unappliedFilters.amulets}
            label={amuletFilter.label}
            onBlur={() => applyUrlFilters(unappliedFilters)}
            onChange={(newValues) => {
              const newFilters = {
                ...unappliedFilters,
                amulets: newValues,
              };
              setUnappliedFilters(newFilters);
            }}
          />
        </BaseField>
        <BaseField id="rings-filter" className="col-span-full sm:col-span-1">
          <FilterListbox
            options={unappliedFilters.rings}
            label="Rings"
            onBlur={() => applyUrlFilters(unappliedFilters)}
            onChange={(newValues) => {
              const newFilters = {
                ...unappliedFilters,
                rings: newValues,
              };
              setUnappliedFilters(newFilters);
            }}
          />
        </BaseField>
      </div>
    </FiltersContainer>
  );
}
