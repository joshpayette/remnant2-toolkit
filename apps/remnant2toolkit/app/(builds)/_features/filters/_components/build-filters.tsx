import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
  FilterIcon,
  FilterListbox,
  FiltersContainer,
} from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { InputWithClear } from '@/app/_components/input-with-clear';
import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/amulet-filter';
import { archetypeFilter } from '@/app/(builds)/_features/filters/_libs/archetype-filter';
import { handGunFilter } from '@/app/(builds)/_features/filters/_libs/hand-gun-filter';
import { longGunFilter } from '@/app/(builds)/_features/filters/_libs/long-gun-filter';
import { meleeFilter } from '@/app/(builds)/_features/filters/_libs/melee-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/relic-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import { withVideoFilter } from '@/app/(builds)/_features/filters/_libs/with-video-filter';
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

    if (isEqual(newFilters.handGuns, defaultFilters.handGuns)) {
      params.delete(handGunFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.handGuns
        .filter((handGun) => handGun.state !== 'default')
        .map((handGun) => {
          return handGun.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${handGun.value}`
            : handGun.value;
        });
      if (paramValues.length > 0) {
        params.set(handGunFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(handGunFilter.buildFilterKey);
      }
    }

    if (isEqual(newFilters.longGuns, defaultFilters.longGuns)) {
      params.delete(longGunFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.longGuns
        .filter((longGun) => longGun.state !== 'default')
        .map((longGun) => {
          return longGun.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${longGun.value}`
            : longGun.value;
        });
      if (paramValues.length > 0) {
        params.set(longGunFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(longGunFilter.buildFilterKey);
      }
    }

    if (isEqual(newFilters.melees, defaultFilters.melees)) {
      params.delete(meleeFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.melees
        .filter((melee) => melee.state !== 'default')
        .map((melee) => {
          return melee.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${melee.value}`
            : melee.value;
        });
      if (paramValues.length > 0) {
        params.set(meleeFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(meleeFilter.buildFilterKey);
      }
    }

    if (isEqual(newFilters.releases, defaultFilters.releases)) {
      params.delete('releases');
    } else {
      const paramValues = newFilters.releases
        .filter((release) => release.state !== 'default')
        .map((release) => {
          return release.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${release.value}`
            : release.value;
        });
      if (paramValues.length > 0) {
        params.set('releases', paramValues.join(','));
      } else {
        params.delete('releases');
      }
    }

    if (isEqual(newFilters.relics, defaultFilters.relics)) {
      params.delete(relicFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.relics
        .filter((relic) => relic.state !== 'default')
        .map((relic) => {
          return relic.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${relic.value}`
            : relic.value;
        });
      if (paramValues.length > 0) {
        params.set(relicFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(relicFilter.buildFilterKey);
      }
    }

    if (isEqual(newFilters.rings, defaultFilters.rings)) {
      params.delete(ringFilter.buildFilterKey);
    } else {
      const paramValues = newFilters.rings
        .filter((ring) => ring.state !== 'default')
        .map((ring) => {
          return ring.state === 'excluded'
            ? `${EXCLUDE_ITEM_SYMBOL}${ring.value}`
            : ring.value;
        });
      if (paramValues.length > 0) {
        params.set(ringFilter.buildFilterKey, paramValues.join(','));
      } else {
        params.delete(ringFilter.buildFilterKey);
      }
    }

    if (newFilters.searchText === defaultFilters.searchText) {
      params.delete(searchTextFilter.buildFilterKey);
    } else {
      params.set(searchTextFilter.buildFilterKey, newFilters.searchText);
    }

    if (newFilters.withVideo === defaultFilters.withVideo) {
      params.delete(withVideoFilter.buildFilterKey);
    } else {
      params.set(withVideoFilter.buildFilterKey, newFilters.withVideo);
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
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="w-full">
            <div className="border-b-primary-500 mb-1 flex w-full flex-row items-end justify-end border-b py-2">
              <div className="w-full pr-4 text-lg">Equipment Filters</div>
              <Disclosure.Button as={BaseButton}>
                <FilterIcon className="h-4 w-4" />
                {open ? 'Hide' : 'Show'}
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <BaseField
                  id="archetypes-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.archetypes}
                    label={archetypeFilter.label}
                    onBlur={() => {
                      if (
                        !isEqual(
                          unappliedFilters.archetypes,
                          filters.archetypes,
                        )
                      ) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        archetypes: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField
                  id="amulets-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.amulets}
                    label={amuletFilter.label}
                    onBlur={() => {
                      if (!isEqual(unappliedFilters.amulets, filters.amulets)) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        amulets: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField
                  id="rings-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.rings}
                    label={ringFilter.label}
                    onBlur={() => {
                      if (!isEqual(unappliedFilters.rings, filters.rings)) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        rings: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField
                  id="relic-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.relics}
                    label={relicFilter.label}
                    onBlur={() => {
                      if (!isEqual(unappliedFilters.relics, filters.relics)) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        relics: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField
                  id="long-guns-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.longGuns}
                    label={longGunFilter.label}
                    onBlur={() => {
                      if (
                        !isEqual(unappliedFilters.longGuns, filters.longGuns)
                      ) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        longGuns: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField
                  id="hand-guns-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.handGuns}
                    label={handGunFilter.label}
                    onBlur={() => {
                      if (
                        !isEqual(unappliedFilters.handGuns, filters.handGuns)
                      ) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        handGuns: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField
                  id="melee-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.melees}
                    label={meleeFilter.label}
                    onBlur={() => {
                      if (!isEqual(unappliedFilters.melees, filters.melees)) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        melees: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="mt-4 w-full">
            <div className="border-b-primary-500 mb-1 flex w-full flex-row items-end justify-end border-b py-2">
              <div className="w-full pr-4 text-lg">Other Filters</div>
              <Disclosure.Button as={BaseButton}>
                <FilterIcon className="h-4 w-4" />
                {open ? 'Hide' : 'Show'}
              </Disclosure.Button>
            </div>
            <Disclosure.Panel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <BaseField
                  id="releases-filter"
                  className="col-span-full sm:col-span-1"
                >
                  <FilterListbox
                    options={unappliedFilters.releases}
                    disabledStates={['excluded']}
                    label="Releases"
                    onBlur={() => {
                      if (
                        !isEqual(unappliedFilters.releases, filters.releases)
                      ) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(newValues) => {
                      const newFilters: BuildFilterFields = {
                        ...unappliedFilters,
                        releases: newValues,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  />
                </BaseField>
                <BaseField className="col-span-full sm:col-span-1">
                  <BaseLabel className="text-surface-solid h-[40px] text-sm font-medium">
                    {withVideoFilter.label}
                  </BaseLabel>
                  <BaseListbox
                    className="mt-1"
                    value={unappliedFilters.withVideo}
                    onBlur={() => {
                      if (unappliedFilters.withVideo !== filters.withVideo) {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                    onChange={(value) => {
                      const newFilters = {
                        ...unappliedFilters,
                        withVideo: value,
                      };
                      setUnappliedFilters(newFilters);
                    }}
                  >
                    {withVideoFilter.validOptions?.map((value) => (
                      <BaseListboxOption key={value} value={value}>
                        <BaseListboxLabel>{value}</BaseListboxLabel>
                      </BaseListboxOption>
                    ))}
                  </BaseListbox>
                </BaseField>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </FiltersContainer>
  );
}
