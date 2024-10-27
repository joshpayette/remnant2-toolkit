import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/optional-item-symbol';
import { DEFAULT_TRAIT_AMOUNT } from '@/app/(builds)/_constants/default-trait-amount';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

const allItems = [...traitItems, ...archetypeItems];

interface BaseTraitItem extends BaseItem {
  amount: number;
  type: 'archetype' | 'core' | 'trait';
  elementalResistanceStep?: number; // The amount to increase the elemental resistance per level
  elementalResistanceStepPercent?: number; // The percentage to increase the elemental resistance per level
  elementalResistanceThresholds?: number[]; // The elemental resistance thresholds for the elemental resistance step
  healthStep?: number; // The amount to increase the health per level
  healthStepPercent?: number; // The percentage to increase the health per level
  staminaStep?: number; // The amount to increase the stamina per level
  staminaStepPercent?: number; // The percentage to increase the stamina per level
  shieldStep?: number; // The amount to increase the shield per level
  shieldStepPercent?: number; // The percentage to increase the shield per level
  armorStep?: number; // The amount to increase the armor per level
  armorStepPercent?: number; // The percentage to increase the armor per level
  weightStep?: number; // The amount to increase the weight per level
  weightStepPercent?: number; // The percentage to increase the weight per level
  weightThresholds?: number[]; // The weight thresholds for the weight step
}

export class TraitItem extends BaseItem implements BaseTraitItem {
  public category: BaseTraitItem['category'] = 'trait';
  public type: BaseTraitItem['type'] = 'trait';
  public amount: BaseTraitItem['amount'] = DEFAULT_TRAIT_AMOUNT;
  public elementalResistanceStep?: BaseTraitItem['elementalResistanceStep'] = 0;
  public elementalResistanceStepPercent?: BaseTraitItem['elementalResistanceStepPercent'] = 0;
  public elementalResistanceThresholds?: BaseTraitItem['elementalResistanceThresholds'] =
    [];
  public healthStep?: BaseTraitItem['healthStep'] = 0;
  public healthStepPercent?: BaseTraitItem['healthStepPercent'] = 0;
  public staminaStep?: BaseTraitItem['staminaStep'] = 0;
  public staminaStepPercent?: BaseTraitItem['staminaStepPercent'] = 0;
  public shieldStep?: BaseTraitItem['shieldStep'] = 0;
  public shieldStepPercent?: BaseTraitItem['shieldStepPercent'] = 0;
  public armorStep?: BaseTraitItem['armorStep'] = 0;
  public weightStep?: BaseTraitItem['weightStep'] = 0;
  public armorStepPercent?: BaseTraitItem['armorStepPercent'] = 0;
  public weightThresholds?: BaseTraitItem['weightThresholds'] = [];
  public weightStepPercent?: BaseTraitItem['weightStepPercent'] = 0;

  constructor(props: BaseTraitItem) {
    super(props);
    this.amount = props.amount;
    this.type = props.type;
    this.elementalResistanceStep = props.elementalResistanceStep;
    this.elementalResistanceStepPercent = props.elementalResistanceStepPercent;
    this.elementalResistanceThresholds = props.elementalResistanceThresholds;
    this.healthStep = props.healthStep;
    this.healthStepPercent = props.healthStepPercent;
    this.staminaStep = props.staminaStep;
    this.staminaStepPercent = props.staminaStepPercent;
    this.armorStep = props.armorStep;
    this.armorStepPercent = props.armorStepPercent;
    this.shieldStep = props.shieldStep;
    this.shieldStepPercent = props.shieldStepPercent;
    this.weightStep = props.weightStep;
    this.weightStepPercent = props.weightStepPercent;
    this.weightThresholds = props.weightThresholds;
  }

  public static isTraitItem = (item?: Item): item is TraitItem => {
    if (!item) return false;
    return item.category === 'trait';
  };

  static toParams(
    items: Array<{
      id: BaseTraitItem['id'];
      amount: number;
      optional?: boolean;
    }>,
  ): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional
        ? `${i.id}${OPTIONAL_ITEM_SYMBOL};${i.amount}`
        : `${i.id};${i.amount}`;
    });
  }

  static fromParams(params: string): TraitItem[] {
    const itemIds = params.split(',');
    if (!itemIds) return [];

    const items: TraitItem[] = [];
    itemIds.forEach((itemId, _index) => {
      // We need to split the trait id at the ; to get the amount
      const [originalTraitId, amount] = itemId.split(';');

      if (!originalTraitId) return;

      const optional = originalTraitId.includes(OPTIONAL_ITEM_SYMBOL);
      const traitId = originalTraitId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = traitItems.find((i) => i.id === traitId);
      if (!item) return [];

      let validAmount = amount ? Number(amount) : DEFAULT_TRAIT_AMOUNT;
      if (isNaN(validAmount)) validAmount = DEFAULT_TRAIT_AMOUNT;
      if (validAmount < 1) validAmount = DEFAULT_TRAIT_AMOUNT;
      if (validAmount > 10) validAmount = DEFAULT_TRAIT_AMOUNT;

      if (TraitItem.isTraitItem(item)) {
        items.push(
          new TraitItem({
            id: item.id,
            name: item.name,
            category: item.category,
            type: item.type,
            optional,
            imagePath: item.imagePath,
            amount: validAmount,
            dlc: item.dlc,
            description: item.description ?? '',
            wikiLinks: item.wikiLinks ?? [],
            linkedItems: item.linkedItems ?? {},
            saveFileSlug: item.saveFileSlug ?? '',
            elementalResistanceStep: item.elementalResistanceStep ?? 0,
            elementalResistanceStepPercent:
              item.elementalResistanceStepPercent ?? 0,
            elementalResistanceThresholds:
              item.elementalResistanceThresholds ?? [],
            healthStep: item.healthStep ?? 0,
            healthStepPercent: item.healthStepPercent ?? 0,
            armorStep: item.armorStep ?? 0,
            armorStepPercent: item.armorStepPercent ?? 0,
            staminaStep: item.staminaStep ?? 0,
            staminaStepPercent: item.staminaStepPercent ?? 0,
            weightStep: item.weightStep ?? 0,
            weightStepPercent: item.weightStepPercent ?? 0,
            weightThresholds: item.weightThresholds ?? [],
          }),
        );
      }
    });
    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<TraitItem & { isOwned?: boolean }> {
    if (!buildItems) return [];

    const traitValues: Array<TraitItem> = [];
    const archtypeValues: Array<BaseItem> = [];
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      if (item.category === 'archetype') {
        // insert the archtype at the index
        buildItem.index
          ? archtypeValues.splice(buildItem.index, 0, {
              ...item,
              optional: buildItem.optional,
            })
          : archtypeValues.push({
              ...item,
              optional: buildItem.optional,
            });
        continue;
      }
      const traitItem = {
        ...item,
        amount: buildItem.amount,
      } as TraitItem;
      buildItem.index
        ? (traitValues[buildItem.index] = {
            ...traitItem,
            optional: buildItem.optional,
          })
        : traitValues.push({
            ...traitItem,
            optional: buildItem.optional,
          });
    }

    const newTraitItems: TraitItem[] = [];
    const primaryTraits: TraitItem[] = [];

    // Add the archtype items to the trait items
    for (let i = 0; i < archtypeValues.length; i++) {
      const archtypeItem = archtypeValues[i];
      if (!archtypeItem) continue;

      // if the archtype is primary, get all linked items
      // if the archtype is secondary, get only the main trait
      const linkedTraits =
        i === 0
          ? archtypeItem.linkedItems?.traits
          : archtypeItem.linkedItems?.traits?.filter((t) => t.amount === 10);
      if (!linkedTraits) continue;

      for (const linkedTrait of linkedTraits) {
        const traitItem = traitValues.find((i) => i.name === linkedTrait.name);
        if (!traitItem) continue;

        if (linkedTrait.amount === 10) {
          primaryTraits.push(traitItem);
        }

        // if traititem not already in newTraitItems, add it
        if (!newTraitItems.find((i) => i.name === traitItem.name)) {
          newTraitItems.push(traitItem);
        }
      }
    }

    const sortedTraitItems = [...newTraitItems];

    // All non-archetype linked traits
    const remainingTraits = traitValues.filter(
      (i) => !newTraitItems.find((j) => j.name === i.name),
    );

    // Add the remaining traits to the end of the array
    for (const remainingTrait of remainingTraits) {
      sortedTraitItems.push(remainingTrait);
    }

    // Traits should be ordered by type:
    // 1. Archetype, sorted alphabetical
    // 2. Core, sorted Vigor, Endurance, Spirit, Expertise
    // 3. Trait, sorted alphabetical
    return [
      ...sortedTraitItems
        .filter((i) => i.type === 'archetype')
        .map((i) => {
          const isOwned =
            buildItems.find((j) => j.itemId === i.id)?.isOwned || false;
          return { ...i, isOwned };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
      ...sortedTraitItems
        .filter((i) => i.type === 'core')
        .map((i) => {
          const isOwned =
            buildItems.find((j) => j.itemId === i.id)?.isOwned || false;
          return { ...i, isOwned };
        })
        .sort((a, b) => {
          if (a.name === 'Vigor') return -1;
          if (b.name === 'Vigor') return 1;
          if (a.name === 'Endurance') return -1;
          if (b.name === 'Endurance') return 1;
          if (a.name === 'Spirit') return -1;
          if (b.name === 'Spirit') return 1;
          if (a.name === 'Expertise') return -1;
          if (b.name === 'Expertise') return 1;
          return a.name.localeCompare(b.name);
        }),
      ...sortedTraitItems
        .filter((i) => i.type === 'trait')
        .map((i) => {
          const isOwned =
            buildItems.find((j) => j.itemId === i.id)?.isOwned || false;
          return { ...i, isOwned };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }
}
