import type { BuildState } from '@/app/(builds)/_types/build-state';
import type { Item } from '@/app/(items)/_types/item';

export function isBuildBaseGameBuild(build: BuildState): {
  isBaseGameBuild: boolean;
  nonBaseGameItems: Item[];
} {
  const nonBaseGameItems: Item[] = [];

  if (build.items.helm && build.items.helm.dlc !== 'base') {
    nonBaseGameItems.push(build.items.helm);
  }
  if (build.items.torso && build.items.torso.dlc !== 'base') {
    nonBaseGameItems.push(build.items.torso);
  }
  if (build.items.legs && build.items.legs.dlc !== 'base') {
    nonBaseGameItems.push(build.items.legs);
  }
  if (build.items.gloves && build.items.gloves?.dlc !== 'base') {
    nonBaseGameItems.push(build.items.gloves);
  }
  if (build.items.relic && build.items.relic.dlc !== 'base') {
    nonBaseGameItems.push(build.items.relic);
  }
  if (build.items.amulet && build.items.amulet.dlc !== 'base') {
    nonBaseGameItems.push(build.items.amulet);
  }

  for (const archetype of build.items.archetype) {
    if (!archetype) continue;
    if (archetype.dlc !== 'base') {
      nonBaseGameItems.push(archetype);
    }
  }
  for (const ring of build.items.ring) {
    if (!ring) continue;
    if (ring.dlc !== 'base') {
      nonBaseGameItems.push(ring);
    }
  }
  for (const weapon of build.items.weapon) {
    if (!weapon) continue;
    if (weapon.dlc !== 'base') {
      nonBaseGameItems.push(weapon);
    }
  }
  for (const mod of build.items.mod) {
    if (!mod) continue;
    if (mod.dlc !== 'base') {
      nonBaseGameItems.push(mod);
    }
  }
  for (const mutator of build.items.mutator) {
    if (!mutator) continue;
    if (mutator.dlc !== 'base') {
      nonBaseGameItems.push(mutator);
    }
  }
  for (const trait of build.items.trait) {
    if (!trait) continue;
    if (trait.dlc !== 'base') {
      nonBaseGameItems.push(trait);
    }
  }
  for (const concoction of build.items.concoction) {
    if (!concoction) continue;
    if (concoction.dlc !== 'base') {
      nonBaseGameItems.push(concoction);
    }
  }
  for (const consumable of build.items.consumable) {
    if (!consumable) continue;
    if (consumable.dlc !== 'base') {
      nonBaseGameItems.push(consumable);
    }
  }

  return {
    isBaseGameBuild: nonBaseGameItems.length === 0,
    nonBaseGameItems,
  };
}
