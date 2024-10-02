import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { allItems } from '@/app/(items)/_constants/all-items';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

import { getFileContents } from './get-file-contents';

type Result = {
  notFound: Array<{
    wikiName: string;
  }>;
  badDescriptions: Array<{
    wikiName: string;
    wikiDescription: string;
    toolkitDescription: string;
  }>;
  badMutatorMaxLevel: Array<{
    wikiName: string;
    wikiMutatorMaxLevel: string;
    toolkitMutatorMaxLevel: string;
  }>;
  badFilePaths: Array<{
    wikiName: string;
    wikiFilePath: string;
    toolkitFilePath: string;
  }>;
  badArmorValues: Array<{
    wikiName: string;
    armor: string | undefined;
    weight: string | undefined;
    bleedResistance: string | undefined;
    fireResistance: string | undefined;
    shockResistance: string | undefined;
    toxinResistance: string | undefined;
    blightResistance: string | undefined;
  }>;
  badWeaponValues: Array<{
    wikiName: string;
    damage: string | undefined;
    rps: string | undefined;
    magazine: string | undefined;
    accuracy: string | undefined;
    ideal: string | undefined;
    falloff: string | undefined;
    ammo: string | undefined;
    crit: string | undefined;
    weakspot: string | undefined;
    stagger: string | undefined;
  }>;
};

export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  const authHeader = request.headers.get('authorization');
  if (
    authHeader !== `Bearer ${envVars.CRON_SECRET}` &&
    envVars.NODE_ENV === 'production'
  ) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const { data } = await getFileContents({
    source: 'remote',
  });

  const results: Result = {
    notFound: [],
    badDescriptions: [],
    badMutatorMaxLevel: [],
    badFilePaths: [],
    badArmorValues: [],
    badWeaponValues: [],
  };

  for (const row of data) {
    const { Name, Description } = row;

    const toolkitItem = allItems.find(
      (i) => i.name.toLowerCase() === Name.toLowerCase(),
    );
    if (!toolkitItem) {
      if (Name) {
        results.notFound.push({
          wikiName: Name,
        });
      }
      continue;
    }

    if (
      toolkitItem.description?.toLowerCase() !== Description?.toLowerCase() &&
      Description !== ''
    ) {
      results.badDescriptions.push({
        wikiName: Name,
        wikiDescription: Description || '',
        toolkitDescription: toolkitItem.description || '',
      });
    }
    if (
      MutatorItem.isMutatorItem(toolkitItem) &&
      toolkitItem.maxLevelBonus !== row.maxLevelBonus
    ) {
      results.badMutatorMaxLevel.push({
        wikiName: Name,
        wikiMutatorMaxLevel: row.maxLevelBonus || '',
        toolkitMutatorMaxLevel: toolkitItem.maxLevelBonus || '',
      });
    }

    if (
      toolkitItem.saveFileSlug !== row.Filepath &&
      row.Filepath !== '' &&
      !row.Filepath?.includes('Material_')
    ) {
      results.badFilePaths.push({
        wikiName: Name,
        wikiFilePath: row.Filepath || '',
        toolkitFilePath: toolkitItem.saveFileSlug || '',
      });
    }

    if (ArmorItem.isArmorItem(toolkitItem)) {
      const armor =
        row.Armor && row.Armor !== '' ? parseFloat(row.Armor) : undefined;
      const weight =
        row.Weight && row.Weight !== '' ? parseFloat(row.Weight) : undefined;
      const bleedResistance =
        row.BleedResistance && row.BleedResistance !== ''
          ? parseInt(row.BleedResistance)
          : undefined;
      const fireResistance =
        row.FireResistance && row.FireResistance !== ''
          ? parseInt(row.FireResistance)
          : undefined;
      const shockResistance =
        row.ShockResistance && row.ShockResistance !== ''
          ? parseInt(row.ShockResistance)
          : undefined;
      const toxinResistance =
        row.CorrosiveResistance && row.CorrosiveResistance !== ''
          ? parseInt(row.CorrosiveResistance)
          : undefined;
      const blightResistance =
        row.BlightResistance && row.BlightResistance !== ''
          ? parseInt(row.BlightResistance)
          : undefined;

      const result = {
        wikiName: Name,
        armor: undefined,
        weight: undefined,
        bleedResistance: undefined,
        fireResistance: undefined,
        shockResistance: undefined,
        toxinResistance: undefined,
        blightResistance: undefined,
      };

      if (armor && armor !== toolkitItem.armor) {
        results.badArmorValues.push({
          ...result,
          armor: `${toolkitItem.armor} -> ${armor}`,
        });
      }
      if (weight && weight !== toolkitItem.weight) {
        results.badArmorValues.push({
          ...result,
          weight: `${toolkitItem.weight} -> ${weight}`,
        });
      }
      if (bleedResistance && bleedResistance !== toolkitItem.bleedResistance) {
        results.badArmorValues.push({
          ...result,
          bleedResistance: `${toolkitItem.bleedResistance} -> ${bleedResistance}`,
        });
      }
      if (fireResistance && fireResistance !== toolkitItem.fireResistance) {
        results.badArmorValues.push({
          ...result,
          fireResistance: `${toolkitItem.fireResistance} -> ${fireResistance}`,
        });
      }
      if (shockResistance && shockResistance !== toolkitItem.shockResistance) {
        results.badArmorValues.push({
          ...result,
          shockResistance: `${toolkitItem.shockResistance} -> ${shockResistance}`,
        });
      }
      if (toxinResistance && toxinResistance !== toolkitItem.toxinResistance) {
        results.badArmorValues.push({
          ...result,
          toxinResistance: `${toolkitItem.toxinResistance} -> ${toxinResistance}`,
        });
      }
      if (
        blightResistance &&
        blightResistance !== toolkitItem.blightResistance
      ) {
        results.badArmorValues.push({
          ...result,
          blightResistance: `${toolkitItem.blightResistance} -> ${blightResistance}`,
        });
      }
    }

    if (WeaponItem.isWeaponItem(toolkitItem)) {
      const damage =
        row.Damage && row.Damage !== '' ? parseInt(row.Damage) : undefined;
      const rps = row.RPS && row.RPS !== '' ? parseFloat(row.RPS) : undefined;
      const magazine =
        row.Magazine && row.Magazine !== ''
          ? parseInt(row.Magazine)
          : undefined;
      const ammo = row.Ammo && row.Ammo !== '' ? parseInt(row.Ammo) : undefined;
      const accuracy =
        row.Accuracy && row.Accuracy !== ''
          ? parseFloat(row.Accuracy)
          : undefined;
      const ideal =
        row['Ideal Range'] && row['Ideal Range'] !== ''
          ? parseFloat(row['Ideal Range'])
          : undefined;
      const falloff =
        row['Falloff Range'] && row['Falloff Range'] !== ''
          ? parseFloat(row['Falloff Range'])
          : undefined;
      const crit =
        row.Crit && row.Crit !== '' ? parseFloat(row.Crit) : undefined;
      const weakspot =
        row.Weakspot && row.Weakspot !== ''
          ? parseFloat(row.Weakspot)
          : undefined;
      const stagger =
        row.Stagger && row.Stagger !== '' ? parseFloat(row.Stagger) : undefined;

      const result = {
        wikiName: Name,
        damage: undefined,
        rps: undefined,
        magazine: undefined,
        accuracy: undefined,
        ideal: undefined,
        falloff: undefined,
        ammo: undefined,
        crit: undefined,
        weakspot: undefined,
        stagger: undefined,
      };

      if (damage && damage !== toolkitItem.damage) {
        results.badWeaponValues.push({
          ...result,
          damage: `${toolkitItem.damage} -> ${damage}`,
        });
      }
      if (rps && rps !== toolkitItem.rps) {
        results.badWeaponValues.push({
          ...result,
          rps: `${toolkitItem.rps} -> ${rps}`,
        });
      }
      if (magazine && magazine !== toolkitItem.magazine) {
        results.badWeaponValues.push({
          ...result,
          magazine: `${toolkitItem.magazine} -> ${magazine}`,
        });
      }
      if (accuracy && accuracy !== toolkitItem.accuracy) {
        results.badWeaponValues.push({
          ...result,
          accuracy: `${toolkitItem.accuracy} -> ${accuracy}`,
        });
      }
      if (ideal && ideal !== toolkitItem.ideal) {
        results.badWeaponValues.push({
          ...result,
          ideal: `${toolkitItem.ideal} -> ${ideal}`,
        });
      }
      if (falloff && falloff !== toolkitItem.falloff) {
        results.badWeaponValues.push({
          ...result,
          falloff: `${toolkitItem.falloff} -> ${falloff}`,
        });
      }
      if (ammo && toolkitItem.ammo && ammo !== toolkitItem.ammo) {
        results.badWeaponValues.push({
          ...result,
          ammo: `${toolkitItem.ammo} -> ${ammo}`,
        });
      }
      if (crit && crit !== toolkitItem.crit) {
        results.badWeaponValues.push({
          ...result,
          crit: `${toolkitItem.crit} -> ${crit}`,
        });
      }
      if (weakspot && weakspot !== toolkitItem.weakspot) {
        results.badWeaponValues.push({
          ...result,
          weakspot: `${toolkitItem.weakspot} -> ${weakspot}`,
        });
      }
      if (stagger && stagger !== toolkitItem.stagger) {
        results.badWeaponValues.push({
          ...result,
          stagger: `${toolkitItem.stagger} -> ${stagger}`,
        });
      }
    }
  }

  return Response.json({
    results,
  });
}
