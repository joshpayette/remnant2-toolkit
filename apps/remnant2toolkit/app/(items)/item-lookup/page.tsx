import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { ToCsvButton } from '@/app/_components/to-csv-button';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { allItems } from '@/app/(items)/_constants/all-items';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { itemToCsvItem } from '@/app/(items)/_utils/item-to-csv-item';
import { ItemCompareList } from '@/app/(items)/item-lookup/_components/item-compare-list';
import { ItemList } from '@/app/(items)/item-lookup/_components/item-list';
import { ItemLookupFilters } from '@/app/(items)/item-lookup/_components/item-lookup-filters';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.itemLookup.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.itemLookup.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.itemLookup.href}`,
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

const csvItems = allItems
  // Modify the data for use. Adds a discovered flag,
  // modifies the description for mutators
  .map((item) => {
    let csvItem = itemToCsvItem(item);

    // For mutators, we need to combine the description
    // and the max level bonus
    if (MutatorItem.isMutatorItem(item)) {
      const description = item.description;
      const maxLevelBonus = item.maxLevelBonus;
      csvItem = itemToCsvItem({
        ...item,
        description: `${description}. At Max Level: ${maxLevelBonus}`,
      });
    }

    return csvItem;
  })
  // sort items by category then name alphabetically
  .sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

export default function Page() {
  return (
    <>
      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title="Remnant 2 Item Lookup"
          subtitle="Find extended item information and interactions."
        />
      </div>
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center">
          <ItemLookupFilters />
          <ItemCompareList />
          <ItemList />
          <div className="mt-6 flex w-full flex-col items-center justify-center">
            <div className="max-w-[200px]">
              <hr className="border-primary-500 mb-4 w-full border-t" />
              <ToCsvButton
                data={csvItems}
                filename="remnant2toolkit_iteminfo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
