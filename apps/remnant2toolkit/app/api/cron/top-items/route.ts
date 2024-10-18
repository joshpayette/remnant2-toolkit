import { prisma } from '@repo/db';
import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { allItems } from '@/app/(items)/_constants/all-items';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import { armorItems } from '@/app/(items)/_constants/armor-items';
import { concoctionItems } from '@/app/(items)/_constants/concoction-items';
import { consumableItems } from '@/app/(items)/_constants/consumable-items';
import { modItems } from '@/app/(items)/_constants/mod-items';
import { mutatorItems } from '@/app/(items)/_constants/mutator-items';
import { perkItems } from '@/app/(items)/_constants/perk-items';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';
import { relicItems } from '@/app/(items)/_constants/relic-items';
import { ringItems } from '@/app/(items)/_constants/ring-items';
import { skillItems } from '@/app/(items)/_constants/skill-items';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';
import { type Item } from '@/app/(items)/_types/item';

/** To quickly reference for the AFTER_DATE */
const _DLC3_RELEASE_DATE = new Date('2024-09-24');

/**
 * * Used to fetch builds updatedAt after this date
 */
const AFTER_DATE = new Date('2022-01-01');
/**
 * * The amount of ms to stagger each report run
 * * to avoid rate limiting on the Discord webhook.
 */
const STAGGER_TIME = 5000; // 5 seconds
/**
 * * Which categories to run the report for
 */
const CATEGORIES = [
  'all',
  'amulet',
  'archetype',
  'helm',
  'torso',
  'gloves',
  'legs',
  'concoction',
  'consumable',
  'mod',
  'mutator',
  'perk',
  'relicfragment',
  'relic',
  'ring',
  'skill',
  'trait',
  'weapon',
];

type Result = {
  id: string;
  name: string;
  category: string;
  totalCount: number;
  featuredCount: number;
};

async function runReportForCategory(
  category: ItemCategory | 'all',
  webhook: string,
) {
  let reportVars: { fileName: string; reportName: string; items: Item[] } = {
    fileName: 'all-items-report.csv',
    reportName: 'allItems',
    items: allItems,
  };

  switch (category) {
    case 'all':
      reportVars = {
        fileName: 'all-items-report.csv',
        reportName: 'allItems',
        items: allItems,
      };
      break;
    case 'amulet':
      reportVars = {
        fileName: 'amulet-items-report.csv',
        reportName: 'amuletItems',
        items: amuletItems,
      };
      break;
    case 'archetype':
      reportVars = {
        fileName: 'archetype-items-report.csv',
        reportName: 'archetypeItems',
        items: archetypeItems,
      };
      break;
    case 'helm': {
      reportVars = {
        fileName: 'helm-items-report.csv',
        reportName: 'helmItems',
        items: armorItems.filter((item) => item.category === 'helm'),
      };
      break;
    }
    case 'torso': {
      reportVars = {
        fileName: 'torso-items-report.csv',
        reportName: 'torsoItems',
        items: armorItems.filter((item) => item.category === 'torso'),
      };
      break;
    }
    case 'gloves': {
      reportVars = {
        fileName: 'gloves-items-report.csv',
        reportName: 'glovesItems',
        items: armorItems.filter((item) => item.category === 'gloves'),
      };
      break;
    }
    case 'legs': {
      reportVars = {
        fileName: 'legs-items-report.csv',
        reportName: 'legsItems',
        items: armorItems.filter((item) => item.category === 'legs'),
      };
      break;
    }
    case 'concoction': {
      reportVars = {
        fileName: 'concoction-items-report.csv',
        reportName: 'concoctionItems',
        items: concoctionItems,
      };
      break;
    }
    case 'consumable': {
      reportVars = {
        fileName: 'consumable-items-report.csv',
        reportName: 'consumableItems',
        items: consumableItems,
      };
      break;
    }
    case 'mod': {
      reportVars = {
        fileName: 'mod-items-report.csv',
        reportName: 'modItems',
        items: modItems,
      };
      break;
    }
    case 'mutator': {
      reportVars = {
        fileName: 'mutator-items-report.csv',
        reportName: 'mutatorItems',
        items: mutatorItems,
      };
      break;
    }
    case 'perk': {
      reportVars = {
        fileName: 'perk-items-report.csv',
        reportName: 'perkItems',
        items: perkItems,
      };
      break;
    }
    case 'relicfragment': {
      reportVars = {
        fileName: 'relic-fragment-items-report.csv',
        reportName: 'relicFragmentItems',
        items: relicFragmentItems,
      };
      break;
    }
    case 'relic': {
      reportVars = {
        fileName: 'relic-items-report.csv',
        reportName: 'relicItems',
        items: relicItems,
      };
      break;
    }
    case 'ring':
      reportVars = {
        fileName: 'ring-items-report.csv',
        reportName: 'ringItems',
        items: ringItems,
      };
      break;
    case 'skill': {
      reportVars = {
        fileName: 'skill-items-report.csv',
        reportName: 'skillItems',
        items: skillItems,
      };
      break;
    }
    case 'trait': {
      reportVars = {
        fileName: 'trait-items-report.csv',
        reportName: 'traitItems',
        items: traitItems,
      };
      break;
    }
    case 'weapon': {
      reportVars = {
        fileName: 'weapon-items-report.csv',
        reportName: 'weaponItems',
        items: weaponItems,
      };
      break;
    }
    default:
      console.error('invalid category');
      return;
  }

  console.info(`running ${reportVars.reportName} report`);

  const results: Result[] = [];
  for (const item of reportVars.items) {
    const { name, id, category: itemCategory } = item;
    const [totalCount, featuredCount] = await Promise.all([
      prisma.buildItems.count({
        where: {
          itemId: id,
          build: {
            isPublic: true,
            isPatchAffected: false,
            updatedAt: {
              gte: AFTER_DATE,
            },
          },
        },
        take: 2000,
      }),
      prisma.buildItems.count({
        where: {
          itemId: id,
          build: {
            isPublic: true,
            isPatchAffected: false,
            isFeaturedBuild: true,
            updatedAt: {
              gte: AFTER_DATE,
            },
          },
        },
        take: 2000,
      }),
    ]);

    results.push({
      id,
      name,
      category: itemCategory,
      totalCount,
      featuredCount,
    });
  }

  // sort results by count, highest to lowest
  results.sort((a, b) => b.totalCount - a.totalCount);

  // write the results to a csv file
  const headers = [
    'Item Id',
    'Item Name',
    'Item Category',
    'Total Count',
    'Featured Count',
  ];
  const csv = results.map(
    (result) =>
      `${result.id},${result.name},${result.category},${result.totalCount},${result.featuredCount}`,
  );
  csv.unshift(headers.join(','));

  // Need today's date in the format YYYY-MM-DD
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  // write file to a blob
  const csvBlob = new Blob([csv.join('\n')], { type: 'text/csv' });

  // Add content to FormData so it can be passed to the webhook
  const formData = new FormData();
  formData.append(
    'content',
    `# ${formattedDate} ${reportVars.reportName} Report\n`,
  );
  formData.append('file', csvBlob, reportVars.fileName);

  // send the report to the webhook
  const response = await fetch(webhook, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.error('Error in sending report webhook to Discord!');
  }
}

export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  /** Used to be sure that no one can randomly run this other than me in production. */
  const authHeader = request.headers.get('authorization');
  if (
    authHeader !== `Bearer ${envVars.CRON_SECRET}` &&
    envVars.NODE_ENV === 'production'
  ) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  console.info(`Running all items reports...`);

  async function runReportsWithStagger() {
    for (const category of CATEGORIES) {
      await runReportForCategory(
        category as ItemCategory,
        envVars.WEBHOOK_REPORT_DATA,
      );
      await new Promise((resolve) => setTimeout(resolve, STAGGER_TIME));
    }
  }
  runReportsWithStagger();

  console.info(`All items reports complete.`);

  return Response.json({ success: true });
}
