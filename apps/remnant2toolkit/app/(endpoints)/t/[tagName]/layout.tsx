import { type Metadata, type ResolvingMetadata } from 'next';

import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { allItems } from '@/app/(items)/_constants/all-items';
import { itemMatchesSearchText } from '@/app/(items)/_lib/item-matches-search-text';
import { type Item } from '@/app/(items)/_types/item';
import { INLINE_TOKENS } from '@/app/(items)/item-lookup/_constants/inline-tokens';
import { ITEM_TOKENS } from '@/app/(items)/item-lookup/_constants/item-tokens';

import TagPage from './page';

function getItemsFromTagParam(tagName: string): Item[] {
  // need to remove all punctuation and spaces from tagName
  // and convert it to lowercase
  const cleanTagName = tagName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let tagToken = INLINE_TOKENS.find(
    (tag) =>
      tag.type.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === cleanTagName ||
      tag.token.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === cleanTagName,
  )?.token as string;

  if (!tagToken) {
    const itemTag = ITEM_TOKENS.find(
      (tag) => tag.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === cleanTagName,
    );
    if (itemTag) {
      tagToken = itemTag as string;
    }
  }

  // If still no tagToken, then it doesn't exist
  if (tagToken === undefined) {
    return [];
  }

  const items = allItems
    .filter((item) => itemMatchesSearchText({ item, searchText: tagToken }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

function getItemDescription(items: Item[], label: string): string | null {
  if (items.length === 0) return null;

  let description = `\r\n`;
  description += `${label}: `;
  for (const item of items) {
    description += `${item.name}, `;
  }
  description = description.slice(0, -2);

  return description;
}

export async function generateMetadata(
  { params: { tagName } }: { params: { tagName: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const items = getItemsFromTagParam(tagName);

  const title = `Items with the "${tagName}" tag`;
  let description: string =
    'Note: This is a work in progress and may not be exhaustive.';
  description += `\r\n`;

  // Add each item by category
  const amuletItems = items.filter((item) => item.category === 'amulet');
  if (amuletItems.length > 0)
    description += getItemDescription(amuletItems, 'Amulets');

  const armorItems = items.filter(
    (item) =>
      item.category === 'helm' ||
      item.category === 'torso' ||
      item.category === 'legs' ||
      item.category === 'gloves',
  );
  if (armorItems.length > 0)
    description += getItemDescription(armorItems, 'Armor');

  const concoctionItems = items.filter(
    (item) => item.category === 'concoction',
  );
  if (concoctionItems.length > 0)
    description += getItemDescription(concoctionItems, 'Concoctions');

  const consumableItems = items.filter(
    (item) => item.category === 'consumable',
  );
  if (consumableItems.length > 0)
    description += getItemDescription(consumableItems, 'Consumables');

  const modItems = items.filter((item) => item.category === 'mod');
  if (modItems.length > 0) description += getItemDescription(modItems, 'Mods');

  const mutatorItems = items.filter((item) => item.category === 'mutator');
  if (mutatorItems.length > 0)
    description += getItemDescription(mutatorItems, 'Mutators');

  const perkItems = items.filter((item) => item.category === 'perk');
  if (perkItems.length > 0)
    description += getItemDescription(perkItems, 'Perks');

  const relicItems = items.filter(
    (item) => item.category === 'relic' || item.category === 'relicfragment',
  );
  if (relicItems.length > 0)
    description += getItemDescription(relicItems, 'Relics');

  const ringItems = items.filter((item) => item.category === 'ring');
  if (ringItems.length > 0)
    description += getItemDescription(ringItems, 'Rings');

  const traitItems = items.filter((item) => item.category === 'trait');
  if (traitItems.length > 0)
    description += getItemDescription(traitItems, 'Traits');

  const weaponItems = items.filter((item) => item.category === 'weapon');
  if (weaponItems.length > 0)
    description += getItemDescription(weaponItems, 'Weapons');

  if (items.length === 0) {
    description = 'No items found.';
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/endpoint/tag/${tagName}`,
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
      card: 'summary',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 150,
          height: 150,
        },
      ],
    },
  };
}

export default async function Layout({
  params: { tagName },
}: {
  params: { tagName: string };
}) {
  const items = getItemsFromTagParam(tagName);
  return <TagPage params={{ tagName, items }} />;
}
