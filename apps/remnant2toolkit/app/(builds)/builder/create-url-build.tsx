'use client';

import { type BuildTags } from '@repo/db';
import cloneDeep from 'lodash.clonedeep';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ToCsvButton } from '@/app/_components/to-csv-button';
import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/optional-item-symbol';
import { LongUrlAlert } from '@/app/(builds)/_components/long-url-alert';
import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { buildStateToCsvData } from '@/app/(builds)/_libs/build-state-to-csv-data';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { vashUrlToBuild } from '@/app/(builds)/_libs/vash-integration/vash-url-to-build';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/detailed-build-dialog';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/detailed-view-button';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/generate-build-image';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/image-download-info-dialog';
import { SaveBuildButton } from '@/app/(builds)/builder/_components/save-build-button';
import { ShareBuildButton } from '@/app/(builds)/builder/_components/share-build-button';
import { AmuletItem } from '@/app/(items)/_types/amulet-item';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { ConcoctionItem } from '@/app/(items)/_types/concotion-item';
import { ConsumableItem } from '@/app/(items)/_types/consumable-item';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { PerkItem } from '@/app/(items)/_types/perk-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { RelicItem } from '@/app/(items)/_types/relic-item';
import { RingItem } from '@/app/(items)/_types/ring-item';
import { SkillItem } from '@/app/(items)/_types/skill-item';
import { TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';
import { itemCategories } from '@/app/(items)/_utils/get-item-categories';
/**
 * Parses the build values from the query string
 */
function parseQueryString(searchParams: URLSearchParams): BuildState {
  /** The build state that will be returned */
  const buildState = cloneDeep(INITIAL_BUILD_STATE);

  // Build name
  const name = searchParams.get('name');
  buildState.name = name ?? buildState.name;

  // Loop through each category and check the query params
  // for that category's item IDs
  itemCategories.forEach((itemCategory) => {
    const params = searchParams.get(itemCategory);

    switch (itemCategory) {
      case 'helm': {
        if (!params) {
          buildState.items[itemCategory] = null;
          break;
        }
        const armorItem = ArmorItem.fromParams(params);
        if (armorItem) buildState.items[itemCategory] = armorItem;
        break;
      }
      case 'torso': {
        if (!params) {
          buildState.items[itemCategory] = null;
          break;
        }
        const torsoItem = ArmorItem.fromParams(params);
        if (torsoItem) buildState.items[itemCategory] = torsoItem;
        break;
      }
      case 'legs': {
        if (!params) {
          buildState.items[itemCategory] = null;
          break;
        }
        const legsItem = ArmorItem.fromParams(params);
        if (legsItem) buildState.items[itemCategory] = legsItem;
        break;
      }
      case 'gloves': {
        if (!params) {
          buildState.items[itemCategory] = null;
          break;
        }
        const glovesItem = ArmorItem.fromParams(params);
        if (glovesItem) buildState.items[itemCategory] = glovesItem;
        break;
      }
      case 'relic': {
        if (!params) {
          buildState.items.relic = null;
          break;
        }
        const relicItem = RelicItem.fromParams(params);
        if (relicItem) buildState.items.relic = relicItem;
        break;
      }
      case 'amulet': {
        if (!params) {
          buildState.items.amulet = null;
          break;
        }
        const amuletItem = AmuletItem.fromParams(params);
        if (amuletItem) buildState.items.amulet = amuletItem;
        break;
      }
      case 'weapon': {
        if (!params) {
          buildState.items.weapon = [];
          break;
        }
        const weaponItems = WeaponItem.fromParams(params);
        if (weaponItems) buildState.items.weapon = weaponItems;
        break;
      }
      case 'archetype': {
        if (!params) {
          buildState.items.archetype = [];
          break;
        }
        const archetypeItems = ArchetypeItem.fromParams(params);
        if (archetypeItems) buildState.items.archetype = archetypeItems;
        break;
      }
      case 'concoction': {
        if (!params) {
          buildState.items.concoction = [];
          break;
        }
        const concoctionItems = ConcoctionItem.fromParams(params);
        if (concoctionItems) buildState.items.concoction = concoctionItems;
        break;
      }
      case 'consumable': {
        if (!params) {
          buildState.items.consumable = [];
          break;
        }
        const consumableItems = ConsumableItem.fromParams(params);
        if (consumableItems) buildState.items.consumable = consumableItems;
        break;
      }
      case 'mod': {
        if (!params) {
          buildState.items.mod = [];
          break;
        }
        const modItems = ModItem.fromParams(params);
        if (modItems) buildState.items.mod = modItems;
        break;
      }
      case 'mutator': {
        if (!params) {
          buildState.items.mutator = [];
          break;
        }
        const mutatorItems = MutatorItem.fromParams(params);
        if (mutatorItems) buildState.items.mutator = mutatorItems;
        break;
      }
      case 'relicfragment': {
        if (!params) {
          buildState.items.relicfragment = [];
          break;
        }
        const relicFragmentItems = RelicFragmentItem.fromParams(params);
        if (relicFragmentItems)
          buildState.items.relicfragment = relicFragmentItems;
        break;
      }
      case 'ring': {
        if (!params) {
          buildState.items.ring = [];
          break;
        }
        const ringItems = RingItem.fromParams(params);
        if (ringItems) buildState.items.ring = ringItems;
        break;
      }
      case 'skill': {
        if (!params) {
          buildState.items.skill = [];
          break;
        }
        const skillItems = SkillItem.fromParams(params);
        if (skillItems) buildState.items.skill = skillItems;
        break;
      }
      case 'trait': {
        if (!params) {
          buildState.items.trait = [];
          break;
        }
        const traitItems = TraitItem.fromParams(params);
        if (traitItems) buildState.items.trait = traitItems;
        break;
      }
      case 'perk': {
        if (!params) {
          buildState.items.perk = [];
          break;
        }
        const perkItems = PerkItem.fromParams(params);
        if (perkItems) buildState.items.perk = perkItems;
        break;
      }
      default: {
        console.error(`Unhandled item category: ${itemCategory}`);
        break;
      }
    }
  });

  const cleanedBuildState = cleanUpBuildState(buildState);
  return cleanedBuildState;
}

export function CreateUrlBuild() {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);
  const [shareBuildAlertOpen, setShareBuildAlertOpen] = useState(false);

  const { data: session } = useSession();

  // Hooks for monitoring the URL query string
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if the vash search params exists
  const sourceParam = searchParams.get('source');
  const isVashBuild = sourceParam === 'vash';
  if (isVashBuild) {
    const convertedUrl = vashUrlToBuild(searchParams);
    if (convertedUrl) {
      // window.location.href = convertedUrl;
      router.push(convertedUrl);
    }
  }

  const buildState = cleanUpBuildState(parseQueryString(searchParams));

  /**
   * Converts the build state to CSV data.
   */
  const csvItems = buildStateToCsvData(buildState).filter(
    (item) => item?.name !== '',
  );

  // Add the build name to the page title
  // * useEffect necessary here to update the document title
  useEffect(() => {
    if (!buildState.name) {
      document.title = 'Remnant 2 Toolkit';
      return;
    }
    document.title = `${buildState.name} | Remnant 2 Toolkit`;
  }, [buildState.name]);

  /**
   * Creates a new query string by adding or updating a parameter.
   */
  const createQueryString = useCallback(
    (name: string, value: string | null, optional: boolean = false) => {
      const params = new URLSearchParams(searchParams);
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, optional ? `${value}${OPTIONAL_ITEM_SYMBOL}` : value);
      }

      return params.toString();
    },
    [searchParams],
  );

  /**
   * Adds a value to the query string then navigates to it
   */
  function updateUrlBuildState({
    category,
    value,
    scroll = false,
    optional = false,
  }: {
    category: string;
    value: string | Array<string | undefined> | BuildTags[];
    scroll?: boolean;
    optional?: boolean;
  }): void {
    // Remove empty items
    if (Array.isArray(value)) {
      const allItemsEmpty = value.every((item) => item === '');
      if (allItemsEmpty) {
        router.push(
          `${pathname}?${createQueryString(category, null, optional)}`,
        );
        return;
      }
    } else {
      if (value === '') {
        router.push(
          `${pathname}?${createQueryString(category, null, optional)}`,
        );
        return;
      }
    }

    if (Array.isArray(value)) {
      value = value.join(',');
    }

    router.push(`${pathname}?${createQueryString(category, value, optional)}`, {
      scroll,
    });
  }

  const {
    isScreenshotMode,
    showControls,
    imageExportLoading,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
    handleImageExport,
  } = useImageExport();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <DetailedBuildDialog
        buildState={buildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />

      <ImageDownloadInfoDialog
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />

      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={buildState}
        isEditable={true}
        isMainBuild={true}
        isScreenshotMode={isScreenshotMode}
        itemOwnershipPreference={false}
        showControls={showControls}
        showCreatedBy={false}
        showMemberFeatures={false}
        onUpdateBuildState={updateUrlBuildState}
        builderActions={
          <>
            {session?.user && <SaveBuildButton buildVariants={[buildState]} />}

            <GenerateBuildImageButton
              imageExportLoading={imageExportLoading}
              onClick={() =>
                handleImageExport(
                  buildContainerRef.current,
                  `${buildState.name}`,
                )
              }
            />

            {session?.user ? null : (
              <>
                <LongUrlAlert
                  open={shareBuildAlertOpen}
                  onClose={() => setShareBuildAlertOpen(false)}
                />
                <ShareBuildButton
                  onClick={() => setShareBuildAlertOpen(true)}
                />
              </>
            )}

            <DetailedViewButton
              onClick={() => setDetailedBuildDialogOpen(true)}
            />

            <ToCsvButton
              data={csvItems}
              filename={`remnant2_builder_${buildState.name}`}
              label="Export to CSV"
            />
          </>
        }
      />
    </>
  );
}
