import { type WeaponItem } from '@/app/(data)/items/types/WeaponItem';

export function weaponDataCompare(
  newData: {
    description: string;
    damage: number;
    rps: number;
    magazine: number;
    accuracy: number;
    ideal: number;
    falloff: number;
    ammo: number;
    crit: number;
    weakspot: number;
    stagger: number;
  },
  currentItem: WeaponItem,
): {
  descriptionMatches: boolean;
  damageMatches: boolean;
  rpsMatches: boolean;
  magazineMatches: boolean;
  accuracyMatches: boolean;
  idealMatches: boolean;
  falloffMatches: boolean;
  ammoMatches: boolean;
  critMatches: boolean;
  weakspotMatches: boolean;
  staggerMatches: boolean;
  dataDiffers: boolean;
} {
  const descriptionMatches = newData.description === currentItem.description;
  const damageMatches = newData.damage === currentItem.damage;
  let rpsMatches = newData.rps === currentItem.rps;
  if (isNaN(newData.rps) || currentItem.rps === undefined) {
    rpsMatches = true;
  }
  let magazineMatches = newData.magazine === currentItem.magazine;
  if (isNaN(newData.magazine) || currentItem.magazine === undefined) {
    magazineMatches = true;
  }
  let accuracyMatches = newData.accuracy === currentItem.accuracy;
  if (isNaN(newData.accuracy) || currentItem.accuracy === undefined) {
    accuracyMatches = true;
  }
  let idealMatches = newData.ideal === currentItem.ideal;
  if (isNaN(newData.ideal) || currentItem.ideal === undefined) {
    idealMatches = true;
  }
  let falloffMatches = newData.falloff === currentItem.falloff;
  if (isNaN(newData.falloff) || currentItem.falloff === undefined) {
    falloffMatches = true;
  }
  let ammoMatches = newData.ammo === currentItem.ammo;
  if (isNaN(newData.ammo) || currentItem.ammo === undefined) {
    ammoMatches = true;
  }
  const critMatches = newData.crit === currentItem.crit;
  const weakspotMatches = newData.weakspot === currentItem.weakspot;
  const staggerMatches = newData.stagger === currentItem.stagger;
  const dataDiffers = !(
    descriptionMatches &&
    damageMatches &&
    rpsMatches &&
    magazineMatches &&
    accuracyMatches &&
    idealMatches &&
    falloffMatches &&
    ammoMatches &&
    critMatches &&
    weakspotMatches &&
    staggerMatches
  );

  return {
    descriptionMatches,
    damageMatches,
    rpsMatches,
    magazineMatches,
    accuracyMatches,
    idealMatches,
    falloffMatches,
    ammoMatches,
    critMatches,
    weakspotMatches,
    staggerMatches,
    dataDiffers,
  };
}
