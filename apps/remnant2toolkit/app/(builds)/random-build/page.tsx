import { type Metadata } from 'next';
import React from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getRandomBuild } from '@/app/(builds)/_libs/get-random-build';
import { CreateBuild } from '@/app/(builds)/builder/create/create-build';
import { allItems } from '@/app/(items)/_constants/all-items';
import { type Item } from '@/app/(items)/_types/item';
import { getDiscoveredItems } from '@/app/(items)/item-tracker/_actions/get-discovered-items';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.randomBuild.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.randomBuild.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.randomBuild.href}`,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Page() {
  const session = await getSession();
  const discoveredItemResponse = session?.user
    ? await getDiscoveredItems()
    : {
        success: false,
        message: 'You must be logged in to track items to the database.',
        discoveredItemIds: undefined,
      };

  const discoveredItemIds = discoveredItemResponse.discoveredItemIds;

  const itemList = discoveredItemIds
    ? discoveredItemIds.map((itemId) => {
        return allItems.find((item) => item.id === itemId) as Item;
      })
    : undefined;

  // Add discovered skills and perks to the list
  if (itemList) {
    const discoveredArchetypes = itemList.filter(
      (item) => item.category === 'archetype',
    );

    for (const archetypeItem of discoveredArchetypes) {
      if (
        !archetypeItem.linkedItems?.skills ||
        !archetypeItem.linkedItems?.perks
      ) {
        continue;
      }

      for (const skill of archetypeItem.linkedItems.skills) {
        const skillItem = allItems.find((i) => i.name === skill.name);
        if (skillItem) {
          itemList.push(skillItem);
        }
      }

      for (const perk of archetypeItem.linkedItems.perks) {
        const perkItem = allItems.find((i) => i.name === perk.name);
        if (perkItem) {
          itemList.push(perkItem);
        }
      }
    }
  }

  const randomBuildState =
    itemList && itemList.length > 0
      ? getRandomBuild(itemList)
      : getRandomBuild(allItems);

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle={NAV_ITEMS.createBuild.description}
      />
      <CreateBuild initialBuildState={randomBuildState} />
    </div>
  );
}
