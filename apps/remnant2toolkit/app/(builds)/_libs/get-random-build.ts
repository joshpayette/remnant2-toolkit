import { getArrayOfLength } from '@repo/utils';
import cloneDeep from 'lodash.clonedeep';

import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { getConcoctionSlotCount } from '@/app/(builds)/_libs/get-concoction-slot-count';
import { getRandomItem } from '@/app/(builds)/_libs/get-random-item';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { modItems } from '@/app/(items)/_constants/mod-items';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { type Item } from '@/app/(items)/_types/item';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

// TODO Fix bug where same item can be equipped to multiple slots if not enough items to randomize from

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
  );
  randomBuild.items.helm = randomHelm;
  // torso
  const randomTorso = getRandomItem(
    randomBuild,
    {
      category: 'torso',
    },
    itemList?.filter((item) => item.category === 'torso'),
  );
  randomBuild.items.torso = randomTorso;
  // legs
  const randomLegs = getRandomItem(
    randomBuild,
    {
      category: 'legs',
    },
    itemList?.filter((item) => item.category === 'legs'),
  );
  randomBuild.items.legs = randomLegs;
  // gloves
  const randomGloves = getRandomItem(
    randomBuild,
    {
      category: 'gloves',
    },
    itemList?.filter((item) => item.category === 'gloves'),
  );
  randomBuild.items.gloves = randomGloves;

  // relic
  const randomRelic = getRandomItem(
    randomBuild,
    {
      category: 'relic',
    },
    itemList?.filter((item) => item.category === 'relic'),
  );
  randomBuild.items.relic = randomRelic;

  // perk item
  // const randomPerk = getRandomItem(
  //   randomBuild,
  //   {
  //     category: 'perk',
  //   },
  //   itemList?.filter((item) => item.category === 'perk'),
  // );

  // relic fragments
  getArrayOfLength(3).forEach((_, index) => {
    const randomRelicFragment = getRandomItem(
      randomBuild,
      {
        category: 'relicfragment',
        index,
      },
      itemList?.filter(
        (item) =>
          RelicFragmentItem.isRelicFragmentItem(item) &&
          item.color !== 'legendary' &&
          !randomBuild.items.relicfragment.some((i) => i?.id === item.id),
      ),
    );
    randomBuild.items.relicfragment[index] =
      randomRelicFragment as RelicFragmentItem | null;
    itemList = itemList?.filter(
      (item) => item.name !== randomRelicFragment?.name,
    );
  });

  // weapons
  getArrayOfLength(3).forEach((_, index) => {
    let itemType;
    let mutatorType;
    if (index === 0) {
      itemType = 'long gun';
      mutatorType = 'gun';
    } else if (index === 1) {
      itemType = 'melee';
      mutatorType = 'melee';
    } else {
      itemType = 'hand gun';
      mutatorType = 'gun';
    }

    const randomWeapon = getRandomItem(
      randomBuild,
      {
        category: 'weapon',
        index,
      },
      itemList?.filter(
        (item) => WeaponItem.isWeaponItem(item) && item.type === itemType,
      ),
    );
    if (randomWeapon) {
      randomBuild.items.weapon[index] = randomWeapon as WeaponItem | null;
      itemList = itemList?.filter((item) => item.name !== randomWeapon.name);
    }
    // weapon mods
    if (randomWeapon?.linkedItems?.mod) {
      const linkedMod = modItems.find(
        (item) => item.name === randomWeapon.linkedItems?.mod?.name,
      );
      randomBuild.items.mod[index] = linkedMod as ModItem | null;
      itemList = itemList?.filter((item) => item.name !== linkedMod?.name);
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
          itemList?.filter(
            (item) => ModItem.isModItem(item) && !item.linkedItems?.weapon,
          ),
        );
        randomBuild.items.mod[index] = randomMod;
        itemList = itemList?.filter((item) => item.name !== randomMod?.name);
      }
    }
    // weapon mutators
    const randomMutator = getRandomItem(
      randomBuild,
      {
        category: 'mutator',
        index,
      },
      itemList?.filter(
        (item) => MutatorItem.isMutatorItem(item) && item.type === mutatorType,
      ),
    );
    if (randomMutator) {
      randomBuild.items.mutator[index] = randomMutator as MutatorItem | null;
      itemList = itemList?.filter((item) => item.name !== randomMutator.name);
    }
  });

  // archetypes
  getArrayOfLength(2).forEach((_, index) => {
    const randomArchetype = getRandomItem(
      randomBuild,
      {
        category: 'archetype',
        index,
      },
      itemList?.filter((item) => item.category === 'archetype'),
    );
    if (randomArchetype) {
      randomBuild.items.archetype[index] = randomArchetype;
      itemList = itemList?.filter((item) => item.name !== randomArchetype.name);
    }

    // archetype skills
    const randomSkill = getRandomItem(
      randomBuild,
      {
        category: 'skill',
        index,
      },
      itemList?.filter(
        (item) =>
          item.category === 'skill' &&
          item.linkedItems?.archetype?.name === randomArchetype?.name,
      ),
    );
    randomBuild.items.skill[index] = randomSkill;
    itemList = itemList?.filter((item) => item.name !== randomSkill?.name);
  });

  // amulet
  const randomAmulet = getRandomItem(
    randomBuild,
    {
      category: 'amulet',
    },
    itemList?.filter((item) => item.category === 'amulet'),
  );
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
    );
    randomBuild.items.ring[index] = randomRing;
    itemList = itemList?.filter((item) => item.name !== randomRing?.name);
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

    if (randomTrait) {
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
        if (randomBuild.items.trait[traitIndex]) {
          randomBuild.items.trait[traitIndex].amount = randomTrait.amount;
        }
      }
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
    );
    randomBuild.items.consumable[index] = randomConsumable;
    itemList = itemList?.filter((item) => item.name !== randomConsumable?.name);
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
      );
      randomBuild.items.concoction[index] = randomConcoction;
      itemList = itemList?.filter(
        (item) => item.name !== randomConcoction?.name,
      );
    },
  );

  return cleanUpBuildState(randomBuild);
}
