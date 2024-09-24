import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ParsedLoadoutItem } from '@/app/(builds)/_types/parsed-loadout-item';
import { allItems } from '@/app/(items)/_constants/all-items';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { AmuletItem } from '@/app/(items)/_types/amulet-item';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { RelicItem } from '@/app/(items)/_types/relic-item';
import { RingItem } from '@/app/(items)/_types/ring-item';
import { SkillItem } from '@/app/(items)/_types/skill-item';
import { TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

const USABLE_ITEMS = allItems.filter((item) => item.saveFileSlug !== undefined);

const LOADOUT_SLOT_MAP = {
  Amulet: '12',
  Archetype1: '2',
  Archetype2: '3',
  Gloves: '15',
  Helm: '13',
  Legs: '16',
  Mainhand: '0',
  Offhand: '1',
  Melee: '7',
  Relic: '4',
  Ring1: '8',
  Ring2: '9',
  Ring3: '10',
  Ring4: '11',
  Skill1: '5',
  Skill2: '6',
  Torso: '14',
};

const ARCHETYPE_TRAIT_MAP = {
  Archetype_Alchemist_C: 'Trait_Potency_C',
  Archetype_Archon_C: 'Trait_FlashCaster_C',
  Archetype_Challenger_C: 'Trait_StrongBack_C',
  Archetype_Engineer_C: 'Trait_Fortify_C',
  Archetype_Explorer_C: 'Trait_Swiftness_C',
  Archetype_Gunslinger_C: 'Trait_AmmoReserves_C',
  Archetype_Handler_C: 'Trait_Kinship_C',
  Archetype_Hunter_C: 'Trait_Longshot_C',
  Archetype_Invader_C: 'Trait_Untouchable_C',
  Archetype_Invoker_C: 'Trait_Gifted_C',
  Archetype_Medic_C: 'Trait_Triage_C',
  Archetype_Ritualist_C: 'Trait_Affliction_C',
  Archetype_Summoner_C: 'Trait_Regrowth_C',
} as const;

function getLoadoutSlot(str: string) {
  return str.split(':LoadoutEquipmentSlot_')[1];
}

export function importedLoadoutToBuildState({
  loadout,
}: {
  loadout: ParsedLoadoutItem[];
}): BuildState {
  const buildState: BuildState = {
    buildId: null,
    name: 'Placeholder',
    createdAt: new Date(),
    updatedAt: null,
    createdById: null,
    createdByDisplayName: null,
    isMember: false,
    isPublic: false,
    isFeaturedBuild: false,
    isBeginnerBuild: false,
    isBaseGameBuild: false,
    isGimmickBuild: false,
    isModeratorApproved: false,
    isModeratorLocked: false,
    isVideoApproved: false,
    dateFeatured: null,
    isPatchAffected: false,
    thumbnailUrl: null,
    videoUrl: null,
    buildLinkUpdatedAt: null,
    buildTags: null,
    buildLink: null,
    description: `Placeholder`,
    upvoted: false,
    totalUpvotes: 0,
    viewCount: 0,
    validatedViewCount: 0,
    duplicateCount: 0,
    variantIndex: 0,
    items: {
      helm: null,
      torso: null,
      legs: null,
      gloves: null,
      relic: null,
      amulet: null,
      weapon: [null, null, null],
      ring: [null, null, null, null],
      archetype: [null, null],
      skill: [null, null],
      concoction: [],
      consumable: [],
      mod: [null, null, null],
      mutator: [null, null, null],
      relicfragment: [], // cannot determine fragment order if missing fragments
      trait: [],
      perk: [],
      prism: null,
    },
  };

  for (const loadoutItem of loadout) {
    let item = USABLE_ITEMS.find((item) =>
      loadoutItem.id
        .toLowerCase()
        .includes(item.saveFileSlug?.toLowerCase() as string),
    );

    // If item not found, it may be an archetype trait
    // For some reason, the game uses a different slug for the traits
    // provided by the equipped archetype versus if you used the trait itself
    // i.e. if Handler is equipped, it is `Archetype_Handler_C`, but if you
    // used the trait itself, it is `Trait_Kinship_C`
    if (!item) {
      const loadoutTrait = loadoutItem.id.split('.')[1];
      if (loadoutTrait) {
        const traitSlug =
          ARCHETYPE_TRAIT_MAP[loadoutTrait as keyof typeof ARCHETYPE_TRAIT_MAP];
        if (traitSlug) {
          item = traitItems.find((item) => item.saveFileSlug === traitSlug);
        }
      }

      // If still no item, error
      if (!item) {
        console.error(`Item not found for loadout item ${loadoutItem.id}`);
        continue;
      }
    }

    switch (item.category) {
      case 'helm': {
        if (!ArmorItem.isArmorItem(item)) break;
        buildState.items.helm = item;
        break;
      }
      case 'torso': {
        if (!ArmorItem.isArmorItem(item)) break;
        buildState.items.torso = item;
        break;
      }
      case 'legs': {
        if (!ArmorItem.isArmorItem(item)) break;
        buildState.items.legs = item;
        break;
      }
      case 'gloves': {
        if (!ArmorItem.isArmorItem(item)) break;
        buildState.items.gloves = item;
        break;
      }
      case 'relic': {
        if (!RelicItem.isRelicItem(item)) break;
        buildState.items.relic = item;
        break;
      }
      case 'amulet': {
        if (!AmuletItem.isAmuletItem(item)) break;
        buildState.items.amulet = item;
        break;
      }
      case 'weapon': {
        if (!WeaponItem.isWeaponItem(item)) break;
        // Which slot in the buildstate to add the weapon at
        let inventorySlot = 0;

        const loadoutSlot = getLoadoutSlot(loadoutItem.type);
        if (!loadoutSlot) break;
        switch (loadoutSlot) {
          case LOADOUT_SLOT_MAP.Mainhand:
            inventorySlot = 0;
            break;
          case LOADOUT_SLOT_MAP.Offhand:
            inventorySlot = 2;
            break;
          case LOADOUT_SLOT_MAP.Melee:
            inventorySlot = 1;
            break;
        }

        buildState.items.weapon[inventorySlot] = item;
        break;
      }
      case 'mod': {
        if (!ModItem.isModItem(item)) break;
        // Which slot in the buildstate to add the mod at
        let inventorySlot = 0;

        const loadoutSlot = getLoadoutSlot(loadoutItem.type);
        if (!loadoutSlot) break;
        switch (loadoutSlot) {
          case LOADOUT_SLOT_MAP.Mainhand:
            inventorySlot = 0;
            break;
          case LOADOUT_SLOT_MAP.Offhand:
            inventorySlot = 2;
            break;
          case LOADOUT_SLOT_MAP.Melee:
            inventorySlot = 1;
            break;
        }

        buildState.items.mod[inventorySlot] = item;
        break;
      }
      case 'mutator': {
        if (!MutatorItem.isMutatorItem(item)) break;
        // Which slot in the buildstate to add the mutator at
        let inventorySlot = 0;

        const loadoutSlot = getLoadoutSlot(loadoutItem.type);
        if (!loadoutSlot) break;
        switch (loadoutSlot) {
          case LOADOUT_SLOT_MAP.Mainhand:
            inventorySlot = 0;
            break;
          case LOADOUT_SLOT_MAP.Offhand:
            inventorySlot = 2;
            break;
          case LOADOUT_SLOT_MAP.Melee:
            inventorySlot = 1;
            break;
        }

        buildState.items.mutator[inventorySlot] = item;
        break;
      }
      case 'ring': {
        if (!RingItem.isRingItem(item)) break;
        // Which slot in the buildstate to add the ring at
        let inventorySlot = 0;

        const loadoutSlot = getLoadoutSlot(loadoutItem.type);
        if (!loadoutSlot) break;

        switch (loadoutSlot) {
          case LOADOUT_SLOT_MAP.Ring1:
            inventorySlot = 0;
            break;
          case LOADOUT_SLOT_MAP.Ring2:
            inventorySlot = 1;
            break;
          case LOADOUT_SLOT_MAP.Ring3:
            inventorySlot = 2;
            break;
          case LOADOUT_SLOT_MAP.Ring4:
            inventorySlot = 3;
            break;
        }

        buildState.items.ring[inventorySlot] = item;
        break;
      }
      case 'archetype': {
        if (!ArchetypeItem.isArchetypeItem(item)) break;
        // Which slot in the buildstate to add the archetype at
        let inventorySlot = 0;

        const loadoutSlot = getLoadoutSlot(loadoutItem.type);
        if (!loadoutSlot) break;

        switch (loadoutSlot) {
          case LOADOUT_SLOT_MAP.Archetype1:
            inventorySlot = 0;
            break;
          case LOADOUT_SLOT_MAP.Archetype2:
            inventorySlot = 1;
            break;
        }

        buildState.items.archetype[inventorySlot] = item;
        break;
      }
      case 'skill': {
        if (!SkillItem.isSkillItem(item)) break;
        // Which slot in the buildstate to add the skill at
        let inventorySlot = 0;

        const loadoutSlot = getLoadoutSlot(loadoutItem.type);
        if (!loadoutSlot) break;

        switch (loadoutSlot) {
          case LOADOUT_SLOT_MAP.Skill1:
            inventorySlot = 0;
            break;
          case LOADOUT_SLOT_MAP.Skill2:
            inventorySlot = 1;
            break;
        }

        buildState.items.skill[inventorySlot] = item;
        break;
      }
      case 'relicfragment': {
        if (!RelicFragmentItem.isRelicFragmentItem(item)) break;
        buildState.items.relicfragment.push(item);
        break;
      }
      case 'trait': {
        if (!TraitItem.isTraitItem(item)) break;

        buildState.items.trait.push({
          ...item,
          amount: parseInt(loadoutItem.level),
        });
        break;
      }
    }
  }

  // Add the core trait points
  const coreTraitPoints =
    buildState.items.archetype[0]?.linkedItems?.traits?.filter(
      (t) => t.amount !== 10,
    );

  if (coreTraitPoints) {
    for (const coreTraitPoint of coreTraitPoints) {
      const existingTraitIndex = buildState.items.trait.findIndex(
        (t) => t.name === coreTraitPoint.name,
      );

      // If trait is not in the build, add it
      // Otherwise add the points
      if (existingTraitIndex === -1) {
        const traitItem = traitItems.find(
          (item) => item.name === coreTraitPoint.name,
        ) as TraitItem;
        buildState.items.trait.push({
          ...traitItem,
          amount: coreTraitPoint.amount,
        });
      } else {
        if (!buildState.items.trait[existingTraitIndex]) continue;
        buildState.items.trait[existingTraitIndex].amount +=
          coreTraitPoint.amount;
      }
    }
  }

  return cleanUpBuildState(buildState);
}
