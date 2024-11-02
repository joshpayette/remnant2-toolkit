'use server';

import { prisma } from '@repo/db';

import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/filters/amulet-filter';
import { archetypeFilter } from '@/app/(builds)/_features/filters/_libs/filters/archetype-filter';
import { fusionFilter } from '@/app/(builds)/_features/filters/_libs/filters/fusion-filter';
import { handGunFilter } from '@/app/(builds)/_features/filters/_libs/filters/hand-gun-filter';
import { legendaryFragmentFilter } from '@/app/(builds)/_features/filters/_libs/filters/legendary-fragment-filter';
import { longGunFilter } from '@/app/(builds)/_features/filters/_libs/filters/long-gun-filter';
import { meleeFilter } from '@/app/(builds)/_features/filters/_libs/filters/melee-filter';
import { modFilter } from '@/app/(builds)/_features/filters/_libs/filters/mod-filter';
import { mutatorFilter } from '@/app/(builds)/_features/filters/_libs/filters/mutator-filter';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/filters/relic-filter';
import { relicFragmentFilter } from '@/app/(builds)/_features/filters/_libs/filters/relic-fragment-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/filters/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/filters/search-text-filter';
import { skillFilter } from '@/app/(builds)/_features/filters/_libs/filters/skill-filter';
import { traitFilter } from '@/app/(builds)/_features/filters/_libs/filters/trait-filter';
import { allItems } from '@/app/(items)/_constants/all-items';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import type { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import type { WeaponItem } from '@/app/(items)/_types/weapon-item';

/** Used to show the # of builds an item is used in */
export type ItemBuildStats = {
  featured: { usedIn: number; total: number };
  community: { usedIn: number; total: number };
  buildsPath: string | undefined;
};

export default async function getItemBuildStats(itemId: string): Promise<{
  success: boolean;
  stats: ItemBuildStats;
}> {
  try {
    const [featuredUsedIn, featuredTotal, communityUsedIn, communityTotal] =
      await Promise.all([
        prisma.build.count({
          where: {
            isFeaturedBuild: true,
            isPublic: true,
            isPatchAffected: false,
            BuildItems: {
              some: {
                itemId,
              },
            },
          },
        }),
        prisma.build.count({
          where: {
            isFeaturedBuild: true,
            isPublic: true,
          },
        }),
        prisma.build.count({
          where: {
            isFeaturedBuild: false,
            isPublic: true,
            isPatchAffected: false,
            BuildItems: {
              some: {
                itemId,
              },
            },
          },
        }),
        prisma.build.count({
          where: {
            isFeaturedBuild: false,
            isPublic: true,
          },
        }),
      ]);

    const item = allItems.find((item) => item.id === itemId);
    let buildsPath: string | undefined = undefined;
    if (item) {
      switch (item.category) {
        case 'archetype':
          buildsPath = `${archetypeFilter.buildFilterKey}=${item.id}`;
          break;
        case 'amulet':
          buildsPath = `${amuletFilter.buildFilterKey}=${item.id}`;
          break;
        case 'fusion':
          buildsPath = `${fusionFilter.buildFilterKey}=${item.id}`;
          break;
        case 'weapon':
          switch ((item as WeaponItem).type) {
            case 'long gun':
              buildsPath = `${longGunFilter.buildFilterKey}=${item.id}`;
              break;
            case 'hand gun':
              buildsPath = `${handGunFilter.buildFilterKey}=${item.id}`;
              break;
            case 'melee':
              buildsPath = `${meleeFilter.buildFilterKey}=${item.id}`;
              break;
          }
          break;
        case 'mod':
          buildsPath = `${modFilter.buildFilterKey}=${item.id}`;
          break;
        case 'mutator':
          buildsPath = `${mutatorFilter}=${item.id}`;
          break;
        case 'relic':
          buildsPath = `${relicFilter.buildFilterKey}=${item.id}`;
          break;
        case 'relicfragment':
          switch ((item as RelicFragmentItem).color) {
            case 'legendary':
              buildsPath = `${legendaryFragmentFilter.buildFilterKey}=${item.id}`;
              break;
            default:
              buildsPath = `${relicFragmentFilter.buildFilterKey}=${item.id}`;
              break;
          }
          break;
        case 'ring':
          buildsPath = `${ringFilter.buildFilterKey}=${item.id}`;
          break;
        case 'skill':
          buildsPath = `${skillFilter.buildFilterKey}=${item.id}`;
          break;
        case 'trait':
          buildsPath = `${traitFilter.buildFilterKey}=${item.id}`;
          break;
        case 'perk': {
          const archetypeItem = archetypeItems.find(
            (archetypeItem) =>
              archetypeItem.linkedItems?.perks?.some(
                (perk) => perk.name === item.name,
              ),
          );
          if (archetypeItem) {
            buildsPath = `${archetypeFilter.buildFilterKey}=${archetypeItem.id}`;
          }
          break;
        }
        case 'pylon':
          buildsPath = undefined;
          break;
        default:
          buildsPath = `${searchTextFilter.buildFilterKey}=${item.category}`;
          break;
      }
    }

    return {
      success: true,
      stats: {
        featured: {
          usedIn: featuredUsedIn,
          total: featuredTotal,
        },
        community: {
          usedIn: communityUsedIn,
          total: communityTotal,
        },
        buildsPath,
      },
    };
  } catch (error) {
    return {
      success: false,
      stats: {
        featured: {
          usedIn: 0,
          total: 0,
        },
        community: {
          usedIn: 0,
          total: 0,
        },
        buildsPath: undefined,
      },
    };
  }
}
