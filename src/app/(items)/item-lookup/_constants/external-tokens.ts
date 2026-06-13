export const EXTERNAL_TOKENS = [
  {
    token: 'AOE/Aura',
    color: 'text-[#1f7a5c] dark:text-[#66ffcc]',
    description:
      "This item benefits from AOE or Aura size increasing effects.",
  },
  // * We keep this here as well as in the description tokens because of the need
  // * to specify that the Handler skills apply bleed.
  {
    token: 'Attack Dog',
    color: 'text-[#C92C0C] dark:text-[#589961]',
    description: 'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Guard Dog',
    color: 'text-[#C92C0C] dark:text-[#589961]',
    description: 'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Support Dog',
    color: 'text-[#C92C0C] dark:text-[#589961]',
    description: 'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Explosive Damage',
    color: 'text-[#c83737] dark:text-[#ff7575]',
    description: "All, or part, of this item's effect deals Explosive Damage.",
  },
  {
    token: 'Multiplicative',
    color: 'text-[#956E44] dark:text-[#FDBA74]',
    description: 'Damage is multiplicative with different sources of damage.',
  },
  {
    token: 'Multiplicative Debuffs',
    color: 'text-[#B05050] dark:text-[#F87171]',
    description:
      'Counts as a debuff making it multiplicative with different sources of damage.',
  },
  {
    token: 'Misty Step',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description:
      'Grants Misty Step evade when worn in combination with other Misty Step items.',
  },
  {
    token: 'Lodestone Set',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description:
      'Wearing the Lodestone Ring with the Lodestone Crown will grant immunity to all BLIGHT Status Effects. ',
  },
  {
    token: `Navigator's Set`,
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: `Wearing either Navigator's Pendant alongside the Navigator's Helm gives +15 BLIGHT resistance.`,
  },
  {
    token: 'PRERELEASE',
    color: 'text-[#646b00] dark:text-[#ecfc00]',
    description: `This is prerelease content. Information might not be accurate or change. Numbers aren't final.`,
  },
  {
    token: 'Bug',
    color: 'text-[#5e6600] dark:text-[#ecff00]',
    description:
      'This item is currently bugged and MAY not function as expected. Check remnant.wiki for more information.',
  },
] as const satisfies {
  token: string;
  color: string;
  description: string | undefined;
}[];
