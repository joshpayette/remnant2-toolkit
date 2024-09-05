import { type CheerioAPI } from 'cheerio';

export function armorDataParse($: CheerioAPI): {
  armor: number;
  weight: number;
  bleedResistance: number;
  fireResistance: number;
  shockResistance: number;
  toxinResistance: number;
  blightResistance: number;
} {
  // Main stats
  const mainstatsContainer = $('ul.infobox-mainstats');
  // The first li is the armor
  // the second li is the weight
  const armor = parseFloat(
    mainstatsContainer
      .find('li')
      .eq(0)
      .find('span')
      .eq(1)
      .text()
      .replaceAll('[sic]', ''),
  );
  const weight = parseFloat(
    mainstatsContainer
      .find('li')
      .eq(1)
      .find('span')
      .eq(1)
      .text()
      .replaceAll('[sic]', ''),
  );

  // Substats
  const resistancesContainer = $('ul.infobox-resistances');

  let bleedResistance = 0;
  let fireResistance = 0;
  let shockResistance = 0;
  let toxinResistance = 0;
  let blightResistance = 0;

  // The rest of the li tags are the other stats
  resistancesContainer.find('li').each((_, el) => {
    const resistanceType = $(el).find('img.mw-file-element').attr('alt');
    const value = $(el).find('span.infobox-resistances-value').text();
    switch (resistanceType) {
      case 'Bleed Resistance':
        bleedResistance = parseInt(value);
        break;
      case 'Corrosive Resistance':
        toxinResistance = parseInt(value);
        break;
      case 'Shock Resistance':
        shockResistance = parseInt(value);
        break;
      case 'Fire Resistance':
        fireResistance = parseInt(value);
        break;
      case 'Blight Resistance':
        blightResistance = parseInt(value);
        break;
      default:
        // No need to return anything here
        break;
    }
  });

  return {
    armor,
    weight,
    bleedResistance,
    fireResistance,
    shockResistance,
    toxinResistance,
    blightResistance,
  };
}
