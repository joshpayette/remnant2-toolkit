/**
 * Used to link items, such as guns to their mods,
 * archtypes to skills, etc.
 */
export type LinkedItems = Partial<{
  archetype: { name: string };
  skills: Array<{ name: string }>;
  weapon: { name: string };
  mod: { name: string };
  traits: Array<{ name: string; amount: number }>;
  perks: Array<{ name: string }>;
}>;
