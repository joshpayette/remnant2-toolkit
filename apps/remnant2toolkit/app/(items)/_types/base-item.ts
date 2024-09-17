import { type ReleaseKey } from '@/app/_types/releases';
import { type LinkedItems } from '@/app/(items)/_types/linked-items';
import { type ItemLocation } from '@/app/(items)/_types/locations';
import { type ExternalToken } from '@/app/(items)/item-lookup/_types/external-token';
import { type ItemToken } from '@/app/(items)/item-lookup/_types/item-token';

type ItemCategory =
  | 'helm'
  | 'torso'
  | 'legs'
  | 'gloves'
  | 'relic'
  | 'amulet'
  | 'weapon'
  | 'archetype'
  | 'concoction'
  | 'consumable'
  | 'mod'
  | 'mutator'
  | 'relicfragment'
  | 'ring'
  | 'skill'
  | 'trait'
  | 'perk';

export interface BaseItemProps {
  id: string;
  name: string;
  category: ItemCategory;
  tags?: ItemToken[];
  dlc: ReleaseKey;
  imagePath: string;
  saveFileSlug?: string | undefined;
  description?: string;
  location?: ItemLocation;
  cooldown?: number;
  optional?: boolean;
  wikiLinks?: string[];
  externalTokens?: Array<ExternalToken['token']>;
  linkedItems?: LinkedItems;
  health?: number;
  healthPercent?: number;
  healthCap?: number;
  stamina?: number;
  staminaPercent?: number;
  armor?: number;
  armorPercent?: number;
  weight?: number;
  weightPercent?: number;
  weightThreshold?: number;
  bleedResistance?: number;
  bleedResistancePercent?: number;
  fireResistance?: number;
  fireResistancePercent?: number;
  shockResistance?: number;
  shockResistancePercent?: number;
  blightResistance?: number;
  blightResistancePercent?: number;
  toxinResistance?: number;
  toxinResistancePercent?: number;
}

export abstract class BaseItem implements BaseItemProps {
  public id: BaseItemProps['id'] = '';
  public name: BaseItemProps['name'] = '';
  public category: BaseItemProps['category'] = 'skill';
  public tags?: BaseItemProps['tags'] = [];
  public dlc: BaseItemProps['dlc'] = 'base';
  public description?: BaseItemProps['description'] = '';
  public location?: BaseItemProps['location'] = {
    world: 'Losomn',
    dungeon: 'World Drop',
  };
  public cooldown?: BaseItemProps['cooldown'] = -1;
  public imagePath: BaseItemProps['imagePath'] = '';
  public wikiLinks?: BaseItemProps['wikiLinks'] = [];
  public externalTokens?: BaseItemProps['externalTokens'] = [];
  public linkedItems?: BaseItemProps['linkedItems'] = {};
  public saveFileSlug?: BaseItemProps['saveFileSlug'] = '';
  public optional?: BaseItemProps['optional'] = false;
  public health?: BaseItemProps['health'] = 0;
  public healthPercent?: BaseItemProps['healthPercent'] = 0;
  public healthCap?: BaseItemProps['healthCap'] = 1; // no cap
  public stamina?: BaseItemProps['stamina'] = 0;
  public staminaPercent?: BaseItemProps['staminaPercent'] = 0;
  public armor?: BaseItemProps['armor'] = 0;
  public armorPercent?: BaseItemProps['armorPercent'] = 0;
  public weight?: BaseItemProps['weight'] = 0;
  public weightPercent?: BaseItemProps['weightPercent'] = 0;
  public weightThreshold?: BaseItemProps['weightThreshold'] = 0;
  public bleedResistance?: BaseItemProps['bleedResistance'] = 0;
  public bleedResistancePercent?: BaseItemProps['bleedResistancePercent'] = 0;
  public fireResistance?: BaseItemProps['fireResistance'] = 0;
  public fireResistancePercent?: BaseItemProps['fireResistancePercent'] = 0;
  public shockResistance?: BaseItemProps['shockResistance'] = 0;
  public shockResistancePercent?: BaseItemProps['shockResistancePercent'] = 0;
  public blightResistance?: BaseItemProps['blightResistance'] = 0;
  public blightResistancePercent?: BaseItemProps['blightResistancePercent'] = 0;
  public toxinResistance?: BaseItemProps['toxinResistance'] = 0;
  public toxinResistancePercent?: BaseItemProps['toxinResistancePercent'] = 0;

  protected constructor(props: BaseItemProps) {
    this.id = props.id;
    this.name = props.name;
    this.category = props.category;
    this.dlc = props.dlc;
    this.description = props.description;
    this.cooldown = props.cooldown;
    this.imagePath = props.imagePath;
    this.wikiLinks = props.wikiLinks;
    this.externalTokens = props.externalTokens;
    this.location = props.location;
    this.linkedItems = props.linkedItems;
    this.saveFileSlug = props.saveFileSlug;
    this.optional = props.optional || false;
    this.health = props.health;
    this.healthPercent = props.healthPercent;
    this.healthCap = props.healthCap;
    this.stamina = props.stamina;
    this.staminaPercent = props.staminaPercent;
    this.armor = props.armor;
    this.armorPercent = props.armorPercent;
    this.weight = props.weight;
    this.weightPercent = props.weightPercent;
    this.weightThreshold = props.weightThreshold;
    this.bleedResistance = props.bleedResistance;
    this.bleedResistancePercent = props.bleedResistancePercent;
    this.fireResistance = props.fireResistance;
    this.fireResistancePercent = props.fireResistancePercent;
    this.shockResistance = props.shockResistance;
    this.shockResistancePercent = props.shockResistancePercent;
    this.blightResistance = props.blightResistance;
    this.blightResistancePercent = props.blightResistancePercent;
    this.toxinResistance = props.toxinResistance;
    this.toxinResistancePercent = props.toxinResistancePercent;
  }

  public static isBaseItem = (item?: BaseItem): item is BaseItem => {
    if (!item) return false;
    return (
      item.category !== 'trait' &&
      item.category !== 'weapon' &&
      item.category !== 'helm' &&
      item.category !== 'torso' &&
      item.category !== 'legs' &&
      item.category !== 'gloves' &&
      item.category !== 'mutator' &&
      item.category !== 'mod' &&
      item.category !== 'perk'
    );
  };
}
