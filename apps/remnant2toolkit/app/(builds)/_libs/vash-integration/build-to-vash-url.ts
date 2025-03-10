import { getArrayOfLength } from '@repo/utils';

import { type BuildState } from '@/app/(builds)/_types/build-state';

export function buildToVashUrl(buildState: BuildState) {
  const { items } = buildState;

  let vashUrl = 'https://cowaii.io/Remnant2/Calculator?';

  // traits
  const traitParams = items.trait.map(
    (trait) => `${trait.name.replaceAll(' ', '+')}${trait.amount}`,
  );
  const traitString = traitParams.join(',');
  vashUrl += `trait=${traitString}&`;

  // archetypes and skills
  const archetypeParams = items.archetype.map(
    (archetype) => archetype?.name.replaceAll(' ', '+') ?? '',
  );
  const skillParams = items.skill.map(
    (skill) => skill?.name.replaceAll(' ', '+') ?? '',
  );
  const archetypeString = archetypeParams.join(',');
  const skillString = skillParams.join(',');
  vashUrl += `archetype=${archetypeString},${skillString}&`;

  // armor
  const armorParams = [
    items.helm?.name.replaceAll(' ', '+') ?? '',
    items.torso?.name.replaceAll(' ', '+') ?? '',
    items.legs?.name.replaceAll(' ', '+') ?? '',
    items.gloves?.name.replaceAll(' ', '+') ?? '',
  ];
  const armorString = armorParams.join(',');
  vashUrl += `armor=${armorString}&`;

  // main weapon
  const mainWeaponParams = [
    items.weapon[0]?.name.replaceAll(' ', '+') ?? '',
    items.mutator[0]?.name.replaceAll(' ', '+') ?? '',
    items.mod[0]?.name.replaceAll(' ', '+') ?? '',
  ];
  const mainWeaponString = mainWeaponParams.join(',');
  vashUrl += `primary=${mainWeaponString}&`;

  // melee weapon
  const meleeWeaponParams = [
    items.weapon[1]?.name.replaceAll(' ', '+') ?? '',
    items.mutator[1]?.name.replaceAll(' ', '+') ?? '',
    items.mod[1]?.name.replaceAll(' ', '+') ?? '',
  ];
  const meleeWeaponString = meleeWeaponParams.join(',');
  vashUrl += `melee=${meleeWeaponString}&`;

  // pistol weapon
  const pistolWeaponParams = [
    items.weapon[2]?.name.replaceAll(' ', '+') ?? '',
    items.mutator[2]?.name.replaceAll(' ', '+') ?? '',
    items.mod[2]?.name.replaceAll(' ', '+') ?? '',
  ];
  const pistolWeaponString = pistolWeaponParams.join(',');
  vashUrl += `secondary=${pistolWeaponString}&`;

  // consumable
  const concoctionParams = getArrayOfLength(7).map(
    (_, i) => items.concoction[i]?.name.replaceAll(' ', '+') ?? '',
  );
  const consumableParams = getArrayOfLength(4).map(
    (_, i) => items.consumable[i]?.name.replaceAll(' ', '+') ?? '',
  );

  const concoctionString = concoctionParams.join(',');
  const consumableString = consumableParams.join(',');
  vashUrl += `consumable=${concoctionString},${consumableString}&`;

  // accessories
  const accessoryParams = [
    items.amulet?.name.replaceAll(' ', '+') ?? '',
    items.ring[0]?.name.replaceAll(' ', '+') ?? '',
    items.ring[1]?.name.replaceAll(' ', '+') ?? '',
    items.ring[2]?.name.replaceAll(' ', '+') ?? '',
    items.ring[3]?.name.replaceAll(' ', '+') ?? '',
  ];
  const accessoryString = accessoryParams.join(',');
  vashUrl += `accessory=${accessoryString}&`;

  // relic
  const relicParams = [
    items.relic?.name.replaceAll(' ', '+') ?? '',
    // items.relicfragment[0]?.name.replaceAll(' ', '+') ?? '',
    // items.relicfragment[1]?.name.replaceAll(' ', '+') ?? '',
    // items.relicfragment[2]?.name.replaceAll(' ', '+') ?? '',
  ];

  const relicString = relicParams.join(',');
  vashUrl += `relic=${relicString}&`;

  // prism
  const relicFragmentParams = [
    items.relicfragment[0]?.name.replaceAll(' ', '+') ?? '',
    items.relicfragment[1]?.name.replaceAll(' ', '+') ?? '',
    items.relicfragment[2]?.name.replaceAll(' ', '+') ?? '',
  ];
  const bonusFragmentParams = [
    items.relicfragment[3]?.name.replaceAll(' ', '+') ??
      items.fusion[3]?.name.replaceAll(' ', '+') ??
      '',
    items.relicfragment[4]?.name.replaceAll(' ', '+') ??
      items.fusion[4]?.name.replaceAll(' ', '+') ??
      '',
    items.relicfragment[5]?.name.replaceAll(' ', '+') ??
      items.fusion[5]?.name.replaceAll(' ', '+') ??
      '',
    items.relicfragment[6]?.name.replaceAll(' ', '+') ??
      items.fusion[6]?.name.replaceAll(' ', '+') ??
      '',
    items.relicfragment[7]?.name.replaceAll(' ', '+') ??
      items.fusion[7]?.name.replaceAll(' ', '+') ??
      '',
  ];
  const legendaryFragmentParams = [
    items.relicfragment[8]?.name.replaceAll(' ', '+') ?? '',
  ];
  const prismString = [
    ...relicFragmentParams,
    ...bonusFragmentParams,
    ...legendaryFragmentParams,
  ].join(',');
  vashUrl += `prism=${prismString}&`;

  // Remove the last & from the string
  vashUrl = vashUrl.slice(0, -1);

  return vashUrl;
}
