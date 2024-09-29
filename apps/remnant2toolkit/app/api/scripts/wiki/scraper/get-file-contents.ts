import * as cheerio from 'cheerio';
import fs from 'fs';
import he from 'he';
import Papa from 'papaparse';

import { type DataRow, dataSchema } from './data-schema';

const ENDPOINTS = {
  remote: {
    data: 'https://remnant.wiki/index.php?title=Special:CargoExport&tables=items%2C+ranged_weapons%2C+armor&join+on=items.item_id+%3D+ranged_weapons.item_id%2C+items.item_id+%3D+armor.item_id&fields=items.name+%3D+Name%2C+class+%3D+Class%2C+description+%3D+Description%2C+filepath+%3D+Filepath%2C+require_dlc+%3D+DLC%2C+ranged_weapons.damage+%3D+Damage%2C+rps+%3D+RPS%2C+magazine+%3D+Magazine%2C+accuracy+%3D+Accuracy%2C+ideal+%3D+Ideal+Range%2C+falloff+%3D+Falloff+Range%2C+ammo+%3D+Ammo%2C+crit+%3D+Crit%2C+weakspot+%3D+Weakspot%2C+stagger+%3D+Stagger%2C+attached_mod+%3D+Mod&where=NOT+items.class+%3D+"Melee+Weapon"&format=csv&limit=2000',
  },
  local: {
    data: 'public/scripts/wiki/wiki-data.csv',
  },
};

const SKIPPED_CLASSES = [
  'Weapon Material',
  'Crafting Material',
  'Mod Material',
  'Quest Item',
  'Material',
  'Engram Material',
  'Engram',
  'Upgrade Material',
  'Currency',
];

const SKIPPED_ITEMS = [
  'Fruit of Death',
  'MOD',
  'Polygun (Marksman)',
  'Polygun (Shotgun)',
];

/**
 * Either fetches the CSV files from the wiki remotely, or from the local folder.
 * It then validates and parses the information and shape, then returns the data.
 */
export async function getFileContents({
  source,
}: {
  source: 'remote' | 'local';
}): Promise<{
  data: Array<DataRow & { maxLevelBonus?: string }>;
}> {
  // the endpoints present a CSV for download
  // I need to open and read that CSV
  const csvFile =
    source === 'remote'
      ? await fetch(ENDPOINTS[source].data)
      : await fs.promises.readFile(ENDPOINTS[source].data);

  const csvContent =
    csvFile instanceof Response ? await csvFile.text() : csvFile.toString();

  const papaData = Papa.parse<DataRow>(csvContent, {
    header: true,
  }).data;

  const dataParsed = papaData.map((row) => {
    const result = dataSchema.safeParse(row);
    if (!result.success) {
      console.error(result.error.errors);
    }
    return result;
  });

  // Filter out invalid rows
  const validData = dataParsed
    .filter((result) => result.success)
    .map((result) => {
      return result.data;
    })
    .filter(
      (row) =>
        !SKIPPED_CLASSES.some(
          (c) => c.toLowerCase() === row.Class?.toLowerCase(),
        ),
    )
    .filter(
      (row) =>
        !SKIPPED_ITEMS.some((i) => i.toLowerCase() === row.Name.toLowerCase()),
    )
    // For testing items before description change
    // .map((row) => {
    //   if (row.Name === 'Bark Extract') {
    //     console.info('Bark Extract', he.decode(row.Description || ''));
    //   }
    //   return row;
    // })
    .map((row) => {
      const name = cleanName(row.Name || '');
      const { description, maxLevelBonus } = cleanDescription(
        row.Description || '',
      );
      const filepath = cleanFilePath(row.Filepath || '');

      return {
        ...row,
        Name: name,
        Description: description,
        maxLevelBonus,
        Filepath: filepath,
      };
    });

  return {
    data: validData,
  };
}

function cleanName(name: string): string {
  return he.decode(name);
}

function cleanDescription(description: string): {
  description: string;
  maxLevelBonus?: string;
} {
  const cleanText =
    // Strips HTML tags from the description
    stripHtmlTags(
      // Converts &lt; and other safe HTML entities to their respective characters
      he.decode(description),
    )
      // Removes items surrounded by `[[` and `]]`
      .replaceAll(/\[\[.*?\]\]/g, '')
      // Remove the word '[sic]' and replace it with a period
      .replaceAll(`''[sic]''`, '');

  const hasLevel10Text = cleanText.includes('Level 10:');
  if (!hasLevel10Text) {
    return {
      description: cleanText,
    };
  }

  const splitDescription = cleanText.split('Level 10:')[0]?.trim();
  const maxLevelBonus = cleanText.split('Level 10:')[1]?.trim();
  return {
    description: splitDescription || cleanText,
    maxLevelBonus: maxLevelBonus,
  };
}
function cleanFilePath(filePath: string): string {
  return filePath.split('.').pop() || '';
}

// Function to strip HTML tags from a string
function stripHtmlTags(str: string): string {
  const $ = cheerio.load(str);
  // need to get the text inside of the span with the class `hoverbox__hoverable`
  const tooltipValue = $('.hoverbox__hoverable').html();
  // Need to remove the hoverbox element from the string
  // and replace it with the tooltipValue text
  $('.hoverbox').replaceWith(tooltipValue?.toString() || '');

  return $.root().find('br').replaceWith('\n').end().text();
}
