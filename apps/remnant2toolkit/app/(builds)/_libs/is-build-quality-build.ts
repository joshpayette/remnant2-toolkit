import { MAX_ALLOWED_MODS } from '@/app/(builds)/_constants/max-allowed-mods';
import {
  MAX_TRAIT_AMOUNT,
  MAX_TRAIT_AMOUNT_WITH_TRAITOR,
} from '@/app/(builds)/_constants/max-trait-amount';
import { MINIMUM_QUALITY_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/minimum-quality-description-length';
import type { BuildState } from '@/app/(builds)/_types/build-state';

export interface QualityBuildCheckResult {
  message: string;
}

export function isBuildQualityBuild(
  buildState: BuildState,
): QualityBuildCheckResult[] {
  const results: QualityBuildCheckResult[] = [];

  // Quality build needs at least MINIMUM_QUALITY_DESCRIPTION_LENGTH characters
  if (
    !buildState.description ||
    buildState.description.length < MINIMUM_QUALITY_DESCRIPTION_LENGTH
  ) {
    results.push({
      message: `Build description should have at least ${MINIMUM_QUALITY_DESCRIPTION_LENGTH} characters.`,
    });
  }

  // Quality build name cannot be "My Build"
  if (buildState.name === 'My Build') {
    results.push({
      message: 'Build name cannot be "My Build".',
    });
  }

  // Quality build name cannot include "(copy)"
  if (buildState.name.includes('(copy)')) {
    results.push({
      message: 'Build name cannot include "(copy)".',
    });
  }

  // Quality build needs at least one build tag
  if (!buildState.buildTags || buildState.buildTags.length === 0) {
    results.push({
      message: 'Build needs at least one build tag.',
    });
  }

  // Quality build needs all item slots filled, except consumables and armor
  const amuletEquipped = buildState.items.amulet !== null;
  if (!amuletEquipped) {
    results.push({
      message: 'Build needs an amulet equipped.',
    });
  }

  const archetypesEquipped =
    buildState.items.archetype.filter((archetype) => archetype !== null)
      .length === 2;

  if (!archetypesEquipped) {
    results.push({
      message: 'Build needs at least two archetypes equipped.',
    });
  }

  const skillsEquipped =
    buildState.items.skill.filter((skill) => skill !== null).length === 2;
  if (!skillsEquipped) {
    results.push({
      message: 'Build needs at least two skills equipped.',
    });
  }

  const relicEquipped = buildState.items.relic !== null;
  if (!relicEquipped) {
    results.push({
      message: 'Build needs a relic equipped.',
    });
  }

  const relicFragmentsEquipped =
    buildState.items.relicfragment[1] !== null &&
    buildState.items.relicfragment[2] !== null &&
    buildState.items.relicfragment[3] !== null;
  if (!relicFragmentsEquipped) {
    results.push({
      message:
        'Build needs at least three relic fragments equipped. (Prism and Legendary Gem not required).',
    });
  }

  const weaponsEquipped =
    buildState.items.weapon.filter((weapon) => weapon !== null).length === 3;
  if (!weaponsEquipped) {
    results.push({
      message: 'Build needs all weapons equipped.',
    });
  }

  // Rusty items do not have mods, so reduce the total for every weapon that
  // has isRusty set to true
  const rustyWeaponCount = buildState.items.weapon.filter(
    (weapon) => weapon !== null && weapon!.isRusty,
  ).length;
  const requiredModCount = MAX_ALLOWED_MODS - rustyWeaponCount;

  console.info('requiredModCount', requiredModCount);

  const modsEquipped =
    buildState.items.mod.filter((mod) => mod !== null && mod !== undefined)
      .length === requiredModCount;
  if (!modsEquipped) {
    results.push({
      message: 'Build needs all mods equipped.',
    });
  }

  const mutatorsEquipped =
    buildState.items.mutator.filter((mutator) => mutator !== null).length === 3;
  if (!mutatorsEquipped) {
    results.push({
      message: 'Build needs all mutators equipped.',
    });
  }

  const ringsEquipped =
    buildState.items.ring.filter((ring) => ring !== null).length === 4;
  if (!ringsEquipped) {
    results.push({
      message: 'Build needs all rings equipped.',
    });
  }

  // traits should total to MAX_TRAIT_COUNT or MAX_TRAIT_COUNT_WITH_TRAITOR
  const isTraitorEquipped = buildState.items.relicfragment.some(
    (i) => i?.id === 'cya6q1',
  );
  const traitCount = buildState.items.trait
    .filter((i) => i !== null)
    .reduce((acc, trait) => acc + trait!.amount, 0);
  const traitsEquipped =
    traitCount === MAX_TRAIT_AMOUNT ||
    (isTraitorEquipped && traitCount === MAX_TRAIT_AMOUNT_WITH_TRAITOR);
  if (!traitsEquipped) {
    results.push({
      message: `Build needs ${MAX_TRAIT_AMOUNT} trait points equipped`,
    });
  }

  return results;
}
