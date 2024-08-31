import { prisma } from '@repo/db';
import { writeFile } from 'fs';
import path from 'path';

import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { allItems } from '@/app/(items)/_data/all-items';
import { amuletItems } from '@/app/(items)/_data/amulet-items';
import { archetypeItems } from '@/app/(items)/_data/archetype-items';
import { armorItems } from '@/app/(items)/_data/armor-items';
import { concoctionItems } from '@/app/(items)/_data/concoction-items';
import { consumableItems } from '@/app/(items)/_data/consumable-items';
import { modItems } from '@/app/(items)/_data/mod-items';
import { mutatorItems } from '@/app/(items)/_data/mutator-items';
import { perkItems } from '@/app/(items)/_data/perk-items';
import { relicFragmentItems } from '@/app/(items)/_data/relic-fragment-items';
import { relicItems } from '@/app/(items)/_data/relic-items';
import { ringItems } from '@/app/(items)/_data/ring-items';
import { skillItems } from '@/app/(items)/_data/skill-items';
import { traitItems } from '@/app/(items)/_data/trait-items';
import { weaponItems } from '@/app/(items)/_data/weapon-items';
import { type Item } from '@/app/(items)/_types/item';

type Result = {
  id: string;
  name: string;
  count: number;
};

async function runReportForCategory(category: ItemCategory | 'all') {
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
    const { name, id } = item;
    const count = await prisma.buildItems.count({
      where: {
        itemId: id,
        build: {
          isPublic: true,
          isPatchAffected: false,
        },
      },
    });

    results.push({ id, name, count });
  }

  // sort results by count, highest to lowest
  results.sort((a, b) => b.count - a.count);

  // write the results to a csv file
  const csv = results
    .map((result) => `${result.id},${result.name},${result.count}`)
    .join('\n');
  // write to the current folder
  writeFile(
    path.join(__dirname, 'output', `${reportVars.fileName}`),
    csv,
    (err) => {
      if (err) {
        console.error('error writing report', err);
      }
    },
  );
}

async function main() {
  console.info(`Running all items reports...`);

  await Promise.resolve([
    runReportForCategory('all'),
    runReportForCategory('amulet'),
    runReportForCategory('archetype'),
    runReportForCategory('helm'),
    runReportForCategory('torso'),
    runReportForCategory('gloves'),
    runReportForCategory('legs'),
    runReportForCategory('concoction'),
    runReportForCategory('consumable'),
    runReportForCategory('mod'),
    runReportForCategory('mutator'),
    runReportForCategory('perk'),
    runReportForCategory('relicfragment'),
    runReportForCategory('relic'),
    runReportForCategory('ring'),
    runReportForCategory('skill'),
    runReportForCategory('trait'),
    runReportForCategory('weapon'),
  ]);

  console.info(`All items reports complete.`);
}

main();
