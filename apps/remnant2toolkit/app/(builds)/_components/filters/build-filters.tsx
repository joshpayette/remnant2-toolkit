'use client';

import { Disclosure } from '@headlessui/react';
import {
  BaseButton,
  BaseField,
  BaseFieldGroup,
  BaseFieldset,
  cn,
  FilterIcon,
} from '@repo/ui';
import isEqual from 'lodash.isequal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { QualityBuildDialog } from '@/app/(builds)/_components/dialogs/quality-build-dialog';
import { AmuletFilter } from '@/app/(builds)/_components/filters/amulet-filter';
import {
  ArchetypeFilter,
  VALID_ARCHETYPES,
} from '@/app/(builds)/_components/filters/archetype-filter';
import { BuildMiscFilter } from '@/app/(builds)/_components/filters/build-misc-filter';
import {
  BuildTagFilter,
  VALID_BUILD_TAGS,
} from '@/app/(builds)/_components/filters/build-tag-filter';
import { HandGunFilter } from '@/app/(builds)/_components/filters/hand-gun-filter';
import { LongGunFilter } from '@/app/(builds)/_components/filters/long-gun-filter';
import { MeleeFilter } from '@/app/(builds)/_components/filters/melee-filter';
import { RelicFilter } from '@/app/(builds)/_components/filters/relic-filter';
import { RingFilter } from '@/app/(builds)/_components/filters/ring-filter';
import {
  BUILD_FILTER_KEYS,
  type BuildListFilters,
  MAX_RINGS,
} from '@/app/(builds)/_components/filters/types';
import { parseUrlFilters } from '@/app/(builds)/_components/filters/utils';
import {
  ReleasesFilter,
  VALID_RELEASE_KEYS,
} from '@/app/(components)/filters/releases-filter';
import { DEFAULT_FILTER } from '@/app/(components)/filters/types';
import { InputWithClear } from '@/app/(components)/input-with-clear';

export const DEFAULT_BUILD_FILTERS = {
  archetypes: VALID_ARCHETYPES,
  amulet: DEFAULT_FILTER,
  buildTags: [],
  longGun: DEFAULT_FILTER,
  handGun: DEFAULT_FILTER,
  melee: DEFAULT_FILTER,
  releases: VALID_RELEASE_KEYS,
  relic: DEFAULT_FILTER,
  rings: [DEFAULT_FILTER],
  searchText: '',
  patchAffected: false,
  withCollection: false,
  withQuality: false,
  withVideo: false,
  withReference: false,
} as const satisfies BuildListFilters;

interface Props {
  buildFiltersOverrides?: Partial<BuildListFilters>;
  loadingResults: boolean;
}

// #region Component

export function BuildFilters({ buildFiltersOverrides, loadingResults }: Props) {
  const [qualityBuildDialogOpen, setQualityBuildDialogOpen] = useState(false);
  const { status: sessionStatus } = useSession();

  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FILTERS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FILTERS;
  }, [buildFiltersOverrides]);

  const searchParams = useSearchParams();
  const filters = useMemo(() => {
    return parseUrlFilters(searchParams, defaultFilters);
  }, [searchParams, defaultFilters]);

  const [unappliedFilters, setUnappliedFilters] = useState(filters);

  function clearFilters() {
    setUnappliedFilters(defaultFilters);
    applyUrlFilters(defaultFilters);
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, defaultFilters)) return false;
    return true;
  }, [filters, defaultFilters]);

  const areFiltersApplied = useMemo(() => {
    if (isEqual(filters, unappliedFilters)) return true;
    return false;
  }, [filters, unappliedFilters]);

  // #region Apply Filters Handler

  const pathname = usePathname();
  const router = useRouter();

  function applyUrlFilters(filtersToApply: BuildListFilters) {
    if (loadingResults) return;

    let url = `${pathname}?t=${Date.now()}&`;

    // Add the amulet filter
    if (filtersToApply.amulet !== defaultFilters.amulet) {
      url += `${BUILD_FILTER_KEYS.AMULET}=${filtersToApply.amulet}&`;
    }

    // Add the archetype filter
    if (
      !isEqual(filtersToApply, defaultFilters.archetypes) &&
      filtersToApply.archetypes.length !== VALID_ARCHETYPES.length
    ) {
      url += `${BUILD_FILTER_KEYS.ARCHETYPES}=${filtersToApply.archetypes.join(
        ',',
      )}&`;
    }

    // Add the build tag filters
    if (
      !isEqual(filtersToApply.buildTags, defaultFilters.buildTags) &&
      filtersToApply.buildTags.length !== VALID_BUILD_TAGS.length
    ) {
      url += `${BUILD_FILTER_KEYS.BUILDTAGS}=${filtersToApply.buildTags.join(
        ',',
      )}&`;
    }

    // Add the long gun filters
    if (
      filtersToApply.longGun !== defaultFilters.longGun &&
      filtersToApply.longGun !== DEFAULT_FILTER
    ) {
      url += `${BUILD_FILTER_KEYS.LONGGUN}=${filtersToApply.longGun}&`;
    }

    // Add the hand gun filters
    if (
      filtersToApply.handGun !== defaultFilters.handGun &&
      filtersToApply.handGun !== DEFAULT_FILTER
    ) {
      url += `${BUILD_FILTER_KEYS.HANDGUN}=${filtersToApply.handGun}&`;
    }

    // Add the melee filters
    if (
      filtersToApply.melee !== defaultFilters.melee &&
      filtersToApply.melee !== DEFAULT_FILTER
    ) {
      url += `${BUILD_FILTER_KEYS.MELEE}=${filtersToApply.melee}&`;
    }

    // Add the releases filters
    if (
      !isEqual(filtersToApply.releases, defaultFilters.releases) &&
      filtersToApply.releases.length !== VALID_RELEASE_KEYS.length
    ) {
      url += `${BUILD_FILTER_KEYS.RELEASES}=${filtersToApply.releases.join(
        ',',
      )}&`;
    }

    // Add the relic filter
    if (filtersToApply.relic !== defaultFilters.relic) {
      url += `${BUILD_FILTER_KEYS.RELIC}=${filtersToApply.relic}&`;
    }

    // Add the ring filters
    if (
      !isEqual(filtersToApply.rings, defaultFilters.rings) &&
      !filtersToApply.rings.includes(DEFAULT_FILTER)
    ) {
      url += `${BUILD_FILTER_KEYS.RINGS}=${filtersToApply.rings.join(',')}&`;
    }

    // Add the search text
    if (filtersToApply.searchText !== defaultFilters.searchText) {
      url += `${BUILD_FILTER_KEYS.SEARCHTEXT}=${filtersToApply.searchText}&`;
    }

    // Add the misc filters
    if (filtersToApply.patchAffected !== defaultFilters.patchAffected) {
      url += `${BUILD_FILTER_KEYS.PATCHAFFECTED}=${filtersToApply.patchAffected}&`;
    }
    if (filtersToApply.withVideo !== defaultFilters.withVideo) {
      url += `${BUILD_FILTER_KEYS.WITHVIDEO}=${filtersToApply.withVideo}&`;
    }
    if (filtersToApply.withReference !== defaultFilters.withReference) {
      url += `${BUILD_FILTER_KEYS.WITHREFERENCE}=${filtersToApply.withReference}&`;
    }
    if (filtersToApply.withQuality !== defaultFilters.withQuality) {
      url += `${BUILD_FILTER_KEYS.WITHQUALITY}=${filtersToApply.withQuality}&`;
    }
    if (filtersToApply.withCollection !== defaultFilters.withCollection) {
      url += `${BUILD_FILTER_KEYS.WITHCOLLECTION}=${filtersToApply.withCollection}&`;
    }

    // trim the final &
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    router.push(url, { scroll: false });
  }

  // #region Filter Change Handlers

  function handleSearchTextChange(newSearchText: string) {
    setUnappliedFilters((prev) => ({ ...prev, searchText: newSearchText }));
  }

  function handleAmuletChange(newAmulet: string) {
    const newFilters = { ...unappliedFilters, amulet: newAmulet };
    setUnappliedFilters(newFilters);
  }

  function handleArchetypeChange(newArchetype: string, checked: boolean) {
    // if the archetype is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        archetypes: unappliedFilters.archetypes.filter(
          (i) => i !== newArchetype,
        ),
      };
      setUnappliedFilters(newFilters);
      return;
    }

    // if the archetype is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      archetypes: [...unappliedFilters.archetypes, newArchetype],
    };
    setUnappliedFilters(newFilters);
  }

  function handleBuildTagChange(newBuildTag: string, checked: boolean) {
    // if the build tag is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        buildTags: unappliedFilters.buildTags.filter((i) => i !== newBuildTag),
      };
      setUnappliedFilters(newFilters);
      return;
    }

    // if the build tag is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      buildTags: [...unappliedFilters.buildTags, newBuildTag],
    };
    setUnappliedFilters(newFilters);
  }

  function handleLongGunChange(newLongGun: string) {
    const newFilters = { ...unappliedFilters, longGun: newLongGun };
    setUnappliedFilters(newFilters);
  }

  function handleHandGunChange(newHandGun: string) {
    const newFilters = { ...unappliedFilters, handGun: newHandGun };
    setUnappliedFilters(newFilters);
  }

  function handleMeleeChange(newMelee: string) {
    const newFilters = { ...unappliedFilters, melee: newMelee };
    setUnappliedFilters(newFilters);
  }

  function handleReleasesChange(newRelease: string, checked: boolean) {
    // if the release is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        releases: unappliedFilters.releases.filter((i) => i !== newRelease),
      };
      setUnappliedFilters(newFilters);
      return;
    }

    // if the release is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      releases: [...unappliedFilters.releases, newRelease],
    };
    setUnappliedFilters(newFilters);
  }

  function handleRelicChange(newRelic: string) {
    const newFilters = { ...unappliedFilters, relic: newRelic };
    setUnappliedFilters(newFilters);
  }

  function handleRingChange(newRings: string[]) {
    // if the newRings length is 0, set the rings to the default value
    if (newRings.length === 0) {
      const newFilters = { ...unappliedFilters, rings: [DEFAULT_FILTER] };
      setUnappliedFilters(newFilters);
      return;
    }

    // If the first item is the default value ("All"), apply the filters after removing the default value
    if (newRings[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        rings: newRings.filter((i) => i !== DEFAULT_FILTER),
      };
      setUnappliedFilters(newFilters);
      return;
    }

    // If any of the filters contain the default value of "All", just apply the filters
    if (newRings.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, rings: [DEFAULT_FILTER] };
      setUnappliedFilters(newFilters);
      return;
    }

    // if the newRings length is more than the max rings, return
    if (newRings.length > MAX_RINGS) return;

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      rings: newRings.filter((ring) => ring !== DEFAULT_FILTER),
    };
    setUnappliedFilters(newFilters);
  }

  function handleMiscFilterChange(newFilters: string[]) {
    const patchAffected = newFilters.includes(BUILD_FILTER_KEYS.PATCHAFFECTED);
    const withCollection = newFilters.includes(
      BUILD_FILTER_KEYS.WITHCOLLECTION,
    );
    const withQuality = newFilters.includes(BUILD_FILTER_KEYS.WITHQUALITY);
    const withVideo = newFilters.includes(BUILD_FILTER_KEYS.WITHVIDEO);
    const withReference = newFilters.includes(BUILD_FILTER_KEYS.WITHREFERENCE);

    setUnappliedFilters((prev) => ({
      ...prev,
      patchAffected,
      withCollection,
      withQuality,
      withVideo,
      withReference,
    }));
  }

  // #region Render

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="w-full">
          <div className="border-b-primary-500 flex w-full flex-row items-end justify-end border-b py-2">
            <div className="w-full pr-4">
              <BaseField className="col-span-full sm:col-span-2">
                <div className="w-full max-w-[600px]">
                  <InputWithClear
                    disabled={loadingResults}
                    type="text"
                    value={unappliedFilters.searchText}
                    placeholder="Build name, description, or creator"
                    onClear={() => {
                      const newFilters = {
                        ...unappliedFilters,
                        searchText: '',
                      };
                      setUnappliedFilters(newFilters);
                      applyUrlFilters(newFilters);
                    }}
                    onChange={(e) => handleSearchTextChange(e.target.value)}
                    onKeyDown={(e) => {
                      // If the user presses enter, apply the filters
                      if (e.key === 'Enter') {
                        applyUrlFilters(unappliedFilters);
                      }
                    }}
                  />
                </div>
              </BaseField>
            </div>
            <Disclosure.Button as={BaseButton}>
              <FilterIcon className="h-4 w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel
            className={cn(
              'border-primary-500 mt-2 w-full border bg-gray-950 p-4',
              areAnyFiltersActive &&
                'border-accent1-300 shadow-accent1-600 shadow-xl',
            )}
          >
            <BaseFieldset>
              <BaseFieldGroup>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                  <div className="col-span-full md:col-span-3">
                    <ArchetypeFilter
                      values={unappliedFilters.archetypes}
                      onChange={handleArchetypeChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          archetypes: VALID_ARCHETYPES,
                        };
                        setUnappliedFilters(newFilters);
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          archetypes: [],
                        };
                        setUnappliedFilters(newFilters);
                      }}
                    />
                  </div>
                  <div className="col-span-full flex flex-col gap-y-8 sm:col-span-1 sm:gap-y-2">
                    <AmuletFilter
                      value={unappliedFilters.amulet}
                      onChange={handleAmuletChange}
                    />
                    <RingFilter
                      value={unappliedFilters.rings}
                      onChange={handleRingChange}
                    />
                    <RelicFilter
                      value={unappliedFilters.relic}
                      onChange={handleRelicChange}
                    />
                  </div>
                  <div className="col-span-full flex flex-col gap-y-8 sm:col-span-1 sm:gap-y-2">
                    <LongGunFilter
                      value={unappliedFilters.longGun}
                      onChange={handleLongGunChange}
                    />
                    <MeleeFilter
                      value={unappliedFilters.melee}
                      onChange={handleMeleeChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <HandGunFilter
                      value={unappliedFilters.handGun}
                      onChange={handleHandGunChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1 md:col-span-2">
                    <ReleasesFilter
                      values={unappliedFilters.releases}
                      onChange={handleReleasesChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: VALID_RELEASE_KEYS,
                        };
                        setUnappliedFilters(newFilters);
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: [],
                        };
                        setUnappliedFilters(newFilters);
                      }}
                    />
                  </div>
                  <div className="col-span-full md:col-span-2">
                    <BuildTagFilter
                      values={unappliedFilters.buildTags}
                      onChange={handleBuildTagChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          buildTags: VALID_BUILD_TAGS,
                        };
                        setUnappliedFilters(newFilters);
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          buildTags: [],
                        };
                        setUnappliedFilters(newFilters);
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1 md:col-span-2">
                    <QualityBuildDialog
                      open={qualityBuildDialogOpen}
                      onClose={() => setQualityBuildDialogOpen(false)}
                    />
                    <BuildMiscFilter
                      value={[
                        unappliedFilters.patchAffected
                          ? BUILD_FILTER_KEYS.PATCHAFFECTED
                          : '',
                        unappliedFilters.withCollection
                          ? BUILD_FILTER_KEYS.WITHCOLLECTION
                          : '',
                        unappliedFilters.withQuality
                          ? BUILD_FILTER_KEYS.WITHQUALITY
                          : '',
                        unappliedFilters.withVideo
                          ? BUILD_FILTER_KEYS.WITHVIDEO
                          : '',
                        unappliedFilters.withReference
                          ? BUILD_FILTER_KEYS.WITHREFERENCE
                          : '',
                      ]}
                      onChange={handleMiscFilterChange}
                    />
                    {unappliedFilters.withQuality && (
                      <div className="flex items-center justify-end">
                        <BaseButton
                          plain
                          onClick={() => setQualityBuildDialogOpen(true)}
                        >
                          What makes a Quality Build?
                        </BaseButton>
                      </div>
                    )}
                    {unappliedFilters.withCollection && (
                      <div className="flex flex-col gap-y-2">
                        {sessionStatus !== 'authenticated' && (
                          <p className="text-accent1-500 text-sm">
                            If you are not logged in, the "Only Owned Items"
                            filter will not work.
                          </p>
                        )}
                        <p className="text-sm text-red-500">
                          If it seems like you aren't getting enough results,
                          try untoggling/toggling a single item in the Item
                          Tracker to force a refresh of your owned items.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-full items-center justify-end gap-x-4">
                  <BaseButton color="red" onClick={clearFilters}>
                    Clear Filters
                  </BaseButton>
                  <BaseButton
                    color="green"
                    onClick={() => applyUrlFilters(unappliedFilters)}
                    className={cn(!areFiltersApplied && 'animate-pulse')}
                    disabled={loadingResults}
                  >
                    Apply Filters
                  </BaseButton>
                </div>
              </BaseFieldGroup>
            </BaseFieldset>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
