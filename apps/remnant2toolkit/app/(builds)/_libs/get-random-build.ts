import { getArrayOfLength } from '@repo/utils';
import cloneDeep from 'lodash.clonedeep';

import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { getConcoctionSlotCount } from '@/app/(builds)/_libs/get-concoction-slot-count';
import { getRandomItem } from '@/app/(builds)/_libs/get-random-item';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { modItems } from '@/app/(items)/_constants/mod-items';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { type AmuletItem } from '@/app/(items)/_types/amulet-item';
import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type ArmorItem } from '@/app/(items)/_types/armor-item';
import { type ConcoctionItem } from '@/app/(items)/_types/concotion-item';
import { type ConsumableItem } from '@/app/(items)/_types/consumable-item';
import { type Item } from '@/app/(items)/_types/item';
import { type ModItem } from '@/app/(items)/_types/mod-item';
import { type MutatorItem } from '@/app/(items)/_types/mutator-item';
import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { type RelicItem } from '@/app/(items)/_types/relic-item';
import { type RingItem } from '@/app/(items)/_types/ring-item';
import { type SkillItem } from '@/app/(items)/_types/skill-item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';
import { type WeaponItem } from '@/app/(items)/_types/weapon-item';

export function getRandomBuild(itemList?: Item[]): BuildState {
  let randomBuild: BuildState = cloneDeep(INITIAL_BUILD_STATE);

  // Randomize the name
  randomBuild.name = 'Random Build';
  randomBuild.description = 'Randomized build from the build generator';
  randomBuild.isPublic = false;

  // helm
  const randomHelm = getRandomItem(
    randomBuild,
    {
      category: 'helm',
    },
    itemList?.filter((item) => item.category === 'helm'),
  ) as ArmorItem;
  randomBuild.items.helm = randomHelm;
  // torso
  const randomTorso = getRandomItem(
    randomBuild,
    {
      category: 'torso',
    },
    itemList?.filter((item) => item.category === 'torso'),
  ) as ArmorItem;
  randomBuild.items.torso = randomTorso;
  // legs
  const randomLegs = getRandomItem(
    randomBuild,
    {
      category: 'legs',
    },
    itemList?.filter((item) => item.category === 'legs'),
  ) as ArmorItem;
  randomBuild.items.legs = randomLegs;
  // gloves
  const randomGloves = getRandomItem(
    randomBuild,
    {
      category: 'gloves',
    },
    itemList?.filter((item) => item.category === 'gloves'),
  ) as ArmorItem;
  randomBuild.items.gloves = randomGloves;

  // relic
  const randomRelic = getRandomItem(
    randomBuild,
    {
      category: 'relic',
    },
    itemList?.filter((item) => item.category === 'relic'),
  ) as RelicItem;
  randomBuild.items.relic = randomRelic;

  // relic fragments
  getArrayOfLength(3).forEach((_, index) => {
    const randomRelicFragment = getRandomItem(
      randomBuild,
      {
        category: 'relicfragment',
        index,
      },
      itemList?.filter(
        (item) => item.category === 'relicfragment',
      ) as RelicFragmentItem[],
    ) satisfies RelicFragmentItem;
    randomBuild.items.relicfragment[index] = randomRelicFragment;
  });

  // weapons
  getArrayOfLength(3).forEach((_, index) => {
    const randomWeapon = getRandomItem(
      randomBuild,
      {
        category: 'weapon',
        index,
      },
      itemList?.filter((item) => item.category === 'weapon'),
    ) as WeaponItem;
    randomBuild.items.weapon[index] = randomWeapon;
    // weapon mods
    if (randomWeapon.linkedItems?.mod) {
      const linkedMod = modItems.find(
        (item) => item.name === randomWeapon.linkedItems?.mod?.name,
      );
      if (!linkedMod) {
        throw new Error(`Could not find linked mod for ${randomWeapon.name}`);
      }
      randomBuild.items.mod[index] = linkedMod as ModItem;
    } else {
      // if the weapon is melee (index 1), no mods can be equipped
      // melee can only have linked mods
      if (index !== 1) {
        const randomMod = getRandomItem(
          randomBuild,
          {
            category: 'mod',
            index,
          },
          itemList?.filter((item) => item.category === 'mod'),
        ) as ModItem;
        randomBuild.items.mod[index] = randomMod;
      }
    }
    // weapon mutators
    const randomMutator = getRandomItem(
      randomBuild,
      {
        category: 'mutator',
        index,
      },
      itemList?.filter((item) => item.category === 'mutator'),
    ) as MutatorItem;
    randomBuild.items.mutator[index] = randomMutator;
  });

  // archtypes
  getArrayOfLength(2).forEach((_, index) => {
    const randomArchetype = getRandomItem(
      randomBuild,
      {
        category: 'archetype',
        index,
      },
      itemList?.filter((item) => item.category === 'archetype'),
    ) as ArchetypeItem;
    if (!randomArchetype) {
      throw new Error(`Could not find random archtype for ${index}`);
    }
    randomBuild.items.archetype[index] = randomArchetype;

    // archtype skills
    const randomSkill = getRandomItem(
      randomBuild,
      {
        category: 'skill',
        index,
      },
      itemList?.filter(
        (item) =>
          item.category === 'skill' &&
          item.linkedItems?.archetype?.name === randomArchetype.name,
      ),
    ) as SkillItem;
    if (!randomSkill) {
      throw new Error(
        `Could not find random skill for ${randomArchetype.name}`,
      );
    }
    randomBuild.items.skill[index] = randomSkill;
  });

  // amulet
  const randomAmulet = getRandomItem(
    randomBuild,
    {
      category: 'amulet',
    },
    itemList?.filter((item) => item.category === 'amulet'),
  ) as AmuletItem;
  randomBuild.items.amulet = randomAmulet;

  // rings
  getArrayOfLength(4).forEach((_, index) => {
    const randomRing = getRandomItem(
      randomBuild,
      {
        category: 'ring',
        index,
      },
      itemList?.filter((item) => item.category === 'ring'),
    ) as RingItem;
    randomBuild.items.ring[index] = randomRing;
  });
  // Traits
  // assign the archetype traits first
  randomBuild = cleanUpBuildState(randomBuild);

  // Keep assigning traits until we have 110 total points
  let totalTraitPoints = randomBuild.items.trait.reduce(
    (acc: number, currentValue: TraitItem) => acc + currentValue.amount,
    0,
  );

  while (totalTraitPoints < 110) {
    const randomTrait =
      traitItems[Math.floor(Math.random() * traitItems.length)];

    if (!randomTrait) throw new Error('Could not find random trait');

    randomTrait.amount = 10;
    if (totalTraitPoints + randomTrait.amount > 110) {
      randomTrait.amount = 110 - totalTraitPoints;
    }

    // if the trait is not already in the build, add it
    // otherwise we will just increase the amount
    if (
      !randomBuild.items.trait.find(
        (trait: TraitItem) => trait.name === randomTrait.name,
      )
    ) {
      randomBuild.items.trait.push(randomTrait);
    } else {
      const traitIndex = randomBuild.items.trait.findIndex(
        (trait: TraitItem) => trait.name === randomTrait.name,
      );
      if (!randomBuild.items.trait[traitIndex]) {
        throw new Error(`Could not find trait at index ${traitIndex}`);
      }
      randomBuild.items.trait[traitIndex].amount = randomTrait.amount;
    }

    randomBuild = cleanUpBuildState(randomBuild);

    totalTraitPoints = randomBuild.items.trait.reduce(
      (acc: number, currentValue: TraitItem) => acc + currentValue.amount,
      0,
    );
  }

  // consumables
  getArrayOfLength(4).forEach((_, index) => {
    const randomConsumable = getRandomItem(
      randomBuild,
      {
        category: 'consumable',
        index,
      },
      itemList?.filter((item) => item.category === 'consumable'),
    ) as ConsumableItem;
    randomBuild.items.consumable[index] = randomConsumable;
  });
  // Concotions
  // do this last to determine concoction count
  // add 1 to the concoction count to account for the default slot
  getArrayOfLength(getConcoctionSlotCount(randomBuild) + 1).forEach(
    (_, index) => {
      const randomConcoction = getRandomItem(
        randomBuild,
        {
          category: 'concoction',
          index,
        },
        itemList?.filter((item) => item.category === 'concoction'),
      ) as ConcoctionItem;
      randomBuild.items.concoction[index] = randomConcoction;
    },
  );

  return cleanUpBuildState(randomBuild);
}
