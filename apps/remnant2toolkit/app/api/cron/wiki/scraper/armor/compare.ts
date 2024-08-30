import { type ArmorItem } from '@/app/(data)/items/types/ArmorItem';

export function armorDataCompare(
  newData: {
    armor: number;
    weight: number;
    bleedResistance: number;
    fireResistance: number;
    shockResistance: number;
    toxinResistance: number;
    blightResistance: number;
  },
  currentItem: ArmorItem,
): {
  armorMatches: boolean;
  weightMatches: boolean;
  bleedResistanceMatches: boolean;
  fireResistanceMatches: boolean;
  shockResistanceMatches: boolean;
  toxinResistanceMatches: boolean;
  blightResistanceMatches: boolean;
  dataDiffers: boolean;
} {
  let armorMatches = newData.armor === currentItem.armor;
  if (isNaN(newData.armor) || currentItem.armor === undefined) {
    armorMatches = true;
  }

  let weightMatches = newData.weight === currentItem.weight;
  if (isNaN(newData.weight) || currentItem.weight === undefined) {
    weightMatches = true;
  }

  let bleedResistanceMatches =
    newData.bleedResistance === currentItem.bleedResistance;
  if (
    isNaN(newData.bleedResistance) ||
    currentItem.bleedResistance === undefined
  ) {
    bleedResistanceMatches = true;
  }

  let fireResistanceMatches =
    newData.fireResistance === currentItem.fireResistance;
  if (
    isNaN(newData.fireResistance) ||
    currentItem.fireResistance === undefined
  ) {
    fireResistanceMatches = true;
  }

  let shockResistanceMatches =
    newData.shockResistance === currentItem.shockResistance;
  if (
    isNaN(newData.shockResistance) ||
    currentItem.shockResistance === undefined
  ) {
    shockResistanceMatches = true;
  }

  let toxinResistanceMatches =
    newData.toxinResistance === currentItem.toxinResistance;
  if (
    isNaN(newData.toxinResistance) ||
    currentItem.toxinResistance === undefined
  ) {
    toxinResistanceMatches = true;
  }

  let blightResistanceMatches =
    newData.blightResistance === currentItem.blightResistance;
  if (
    isNaN(newData.blightResistance) ||
    currentItem.blightResistance === undefined
  ) {
    blightResistanceMatches = true;
  }

  const dataDiffers = !(
    armorMatches &&
    weightMatches &&
    bleedResistanceMatches &&
    fireResistanceMatches &&
    shockResistanceMatches &&
    toxinResistanceMatches &&
    blightResistanceMatches
  );

  return {
    armorMatches,
    weightMatches,
    bleedResistanceMatches,
    fireResistanceMatches,
    shockResistanceMatches,
    toxinResistanceMatches,
    blightResistanceMatches,
    dataDiffers,
  };
}
