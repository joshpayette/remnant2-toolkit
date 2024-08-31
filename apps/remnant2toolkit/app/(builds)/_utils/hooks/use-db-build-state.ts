import { type BuildTags } from '@repo/db';
import cloneDeep from 'lodash.clonedeep';
import { useMemo, useState } from 'react';

import { type BuildState } from '@/app/(builds)/_types/build-state';
import { buildStateToCsvData } from '@/app/(builds)/_utils/build-state-to-csv-data';
import { buildStateToMasonryItems } from '@/app/(builds)/_utils/build-state-to-masonry-items';
import { cleanUpBuildState } from '@/app/(builds)/_utils/clean-up-build-state';
import { AmuletItem } from '@/app/(items)/_types/amulet-item';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { ConcoctionItem } from '@/app/(items)/_types/concotion-item';
import { ConsumableItem } from '@/app/(items)/_types/consumable-item';
import { type Item } from '@/app/(items)/_types/item';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { RelicItem } from '@/app/(items)/_types/relic-item';
import { RingItem } from '@/app/(items)/_types/ring-item';
import { SkillItem } from '@/app/(items)/_types/skill-item';
import { TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

export function useDBBuildState(initialBuildState: BuildState) {
  // )
  const [dbBuildState, setDBBuildState] = useState<BuildState>(
    cloneDeep(initialBuildState),
  );

  /** Used for build state protection, currently does nothing. */
  const usingLocalChanges = false;

  /**
   * Converts the build state to CSV data.
   */
  const csvItems = useMemo(
    () => buildStateToCsvData(dbBuildState).filter((item) => item?.name !== ''),
    [dbBuildState],
  );

  /**
   * Populates the masonry grid with the items from the build state.
   */
  const masonryItems = useMemo(
    () => buildStateToMasonryItems(dbBuildState),
    [dbBuildState],
  );

  function updateDBBuildState({
    category,
    value,
  }: {
    category: string;
    value: string | Array<string | undefined> | BuildTags[];
    scroll?: boolean;
  }) {
    // --------------------------
    // Non-items
    // --------------------------

    if (category === 'name') {
      const newBuildState = {
        ...dbBuildState,
        name: value as string,
      };
      setDBBuildState(newBuildState);
      //setLocalBuildState(newBuildState)
      return;
    }
    if (category === 'description') {
      const newBuildState = {
        ...dbBuildState,
        description: value as string,
      };
      setDBBuildState(newBuildState);
      //setLocalBuildState(newBuildState)
      return;
    }
    if (category === 'isPublic') {
      const newBuildState = {
        ...dbBuildState,
        isPublic: value === 'true',
      };
      setDBBuildState(newBuildState);
      //setLocalBuildState(newBuildState)
      return;
    }
    if (category === 'isPatchAffected') {
      const newBuildState = {
        ...dbBuildState,
        isPatchAffected: value === 'true',
      };
      setDBBuildState(newBuildState);
      //setLocalBuildState(newBuildState)
      return;
    }
    if (category === 'buildLink') {
      const newBuildState = {
        ...dbBuildState,
        buildLink: value as string,
      };
      setDBBuildState(newBuildState);
      //setLocalBuildState(newBuildState)
      return;
    }
    if (category === 'tags') {
      const newBuildState = {
        ...dbBuildState,
        buildTags: value as BuildTags[],
      };
      setDBBuildState(newBuildState);
      //setLocalBuildState(newBuildState)
      return;
    }

    // Remove skill if archetype unequipped
    if (category === 'archetype' && Array.isArray(value)) {
      const emptySlot = value.findIndex((item) => item === '');
      if (emptySlot !== -1) {
        const newSkills = dbBuildState.items.skill.map((skill, index) => {
          if (index === emptySlot) return null;
          return skill;
        });
        const newArchetypes = dbBuildState.items.archetype.map(
          (archetype, index) => {
            if (index === emptySlot) return null;
            return archetype;
          },
        );

        const newBuildState = {
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            archetype: newArchetypes,
            skill: newSkills,
          },
        };

        setDBBuildState(newBuildState);
        return;
      }
    }

    // --------------------------
    // Items
    // --------------------------

    // Remove empty items
    if (Array.isArray(value)) {
      const allItemsEmpty = value.every((item) => item === '');
      if (allItemsEmpty) {
        const cleanBuildState = cleanUpBuildState({
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            [category]: [],
          },
        });

        setDBBuildState(cleanBuildState);
        //setLocalBuildState(cleanBuildState)
        return;
      }
    } else {
      if (value === '') {
        const cleanBuildState = cleanUpBuildState({
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            [category]: null,
          },
        });

        setDBBuildState(cleanBuildState);
        //setLocalBuildState(cleanBuildState)
        return;
      }
    }

    const params = Array.isArray(value) ? value.join(',') : value;
    let itemOrItems: Item | Item[] | null = null;

    switch (category) {
      case 'helm':
        itemOrItems = ArmorItem.fromParams(params);
        break;
      case 'torso':
        itemOrItems = ArmorItem.fromParams(params);
        break;
      case 'legs':
        itemOrItems = ArmorItem.fromParams(params);
        break;
      case 'gloves':
        itemOrItems = ArmorItem.fromParams(params);
        break;
      case 'relic':
        itemOrItems = RelicItem.fromParams(params);
        break;
      case 'amulet':
        itemOrItems = AmuletItem.fromParams(params);
        break;
      case 'weapon':
        itemOrItems = WeaponItem.fromParams(params);
        break;
      case 'archetype':
        itemOrItems = ArchetypeItem.fromParams(params);
        break;
      case 'concoction':
        itemOrItems = ConcoctionItem.fromParams(params);
        break;
      case 'consumable':
        itemOrItems = ConsumableItem.fromParams(params);
        break;
      case 'mod':
        itemOrItems = ModItem.fromParams(params);
        break;
      case 'mutator':
        itemOrItems = MutatorItem.fromParams(params);
        break;
      case 'relicfragment':
        itemOrItems = RelicFragmentItem.fromParams(params);
        break;
      case 'ring':
        itemOrItems = RingItem.fromParams(params);
        break;
      case 'skill':
        itemOrItems = SkillItem.fromParams(params);
        break;
      case 'trait':
        itemOrItems = TraitItem.fromParams(params);
        break;
      default:
        console.error(`Unknown category ${category}`);
        return;
    }

    if (itemOrItems === null) return;

    const newBuildState = {
      ...dbBuildState,
      items: {
        ...dbBuildState.items,
        [category]: itemOrItems,
      },
    };

    const cleanBuildState = cleanUpBuildState(newBuildState);
    setDBBuildState(cleanBuildState);
    //setLocalBuildState(cleanBuildState)
  }

  function setNewBuildState(buildState: BuildState) {
    const cleanBuildState = cleanUpBuildState(buildState);
    setDBBuildState(cleanBuildState);
    //setLocalBuildState(cleanBuildState)
  }

  return {
    csvItems,
    masonryItems,
    dbBuildState,
    usingLocalChanges,
    setNewBuildState,
    updateDBBuildState,
  };
}
