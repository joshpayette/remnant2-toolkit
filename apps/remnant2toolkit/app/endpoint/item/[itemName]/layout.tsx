import { BaseText, BaseTextLink, getImageUrl } from '@repo/ui';
import { cleanItemName } from '@repo/utils';
import { Metadata, ResolvingMetadata } from 'next';

import { allItems } from '@/app/(data)/items/all-items';
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem';
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem';
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem';
import { itemEndpoint } from '@/app/(utils)/get-item-endpoint';

import ItemPage from './page';

function getItemFromParam(itemName: string) {
  // need to remove all punctuation and spaces from itemName
  // and convert it to lowercase
  const cleanItem = cleanItemName(itemName);

  const item = allItems.find((item) => {
    // need to remove all punctuation and spaces from item.name
    // and convert it to lowercase
    const cleanCurrentItemName = item.name
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();
    return cleanCurrentItemName === cleanItem;
  });
  return item;
}

export async function generateMetadata(
  { params: { itemName } }: { params: { itemName: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const item = getItemFromParam(itemName);

  if (!item) {
    throw new Error(`Item ${itemName} is not found.`);
  }

  const title = `${item.name} (${
    item.category === 'relicfragment' ? 'relic fragment' : item.category
  })`;
  let description = `${item.description}\r\n` ?? 'An item for Remnant 2.';

  if (MutatorItem.isMutatorItem(item)) {
    description += '';
    description += `\r\nAt Max Level: ${item.maxLevelBonus}`;
  }
  if (item.cooldown) {
    description += '';
    description += `\r\nCooldown: ${item.cooldown}s`;
  }
  if (ArmorItem.isArmorItem(item)) {
    description += '';
    description += `\r\nArmor: ${item.armor}`;
    description += `\r\nWeight: ${item.weight}`;
    description += `\r\nBleed Resistance: ${item.bleedResistance}`;
    description += `\r\nFire Resistance: ${item.fireResistance}`;
    description += `\r\nShock Resistance: ${item.shockResistance}`;
    description += `\r\nToxin Resistance: ${item.toxinResistance}`;
    description += `\r\nBlight Resistance: ${item.blightResistance}`;
  }
  if (WeaponItem.isWeaponItem(item)) {
    description += '';
    description += `\r\nDamage: ${item.damage}`;
    if (item.rps) {
      description += `\r\nRPS: ${item.rps}`;
    }
    if (item.magazine) {
      description += `\r\nMagazine: ${item.magazine}`;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: itemEndpoint(item.name),
      images: [
        {
          url: getImageUrl(item.imagePath),
          width: 100,
          height: 100,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary',
      images: [
        {
          url: getImageUrl(item.imagePath),
          width: 100,
          height: 100,
        },
      ],
    },
  };
}

export default async function Layout({
  params: { itemName },
}: {
  params: { itemName: string };
}) {
  const item = getItemFromParam(itemName);

  if (!item) {
    throw new Error(`Item ${itemName} is not found.`);
  }

  return (
    <>
      <div className="text-red mb-4 border-2 border-red-500 p-4 text-center">
        <h2 className="text-2xl font-bold">
          This endpoint is being deprecated, and will be removed soon.
        </h2>
        <BaseText>
          Please update your bookmarks to{' '}
          <BaseTextLink href={itemEndpoint(item.name)}>
            the new endpoint
          </BaseTextLink>
          .
        </BaseText>
      </div>
      <ItemPage params={{ item }} />
    </>
  );
}
