import { type WeightClass } from '@/app/(items)/_types/weight-class';

export const WEIGHT_CLASSES = {
  LIGHT: {
    challengerDescription: 'Fast Dodge. No Stamina Cost Penalty.',
    description: 'Fast Dodge. No Stamina Cost Penalty.',
    textColor: 'text-[#477185] dark:text-[#89CFF0]',
    maxWeight: 25,
  },
  MEDIUM: {
    challengerDescription:
      'Normal Dodge. 12.5% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'Normal Dodge. 25% Stamina Cost Penalty.',
    textColor: 'text-[#3e753e] dark:text-[#98FB98]',
    maxWeight: 50,
  },
  HEAVY: {
    challengerDescription:
      'Slow Dodge. 25% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'Slow Dodge. 50% Stamina Cost Penalty.',
    textColor: 'text-[#666600] dark:text-[#ffff00]',
    maxWeight: 75,
  },
  ULTRA: {
    challengerDescription:
      'FLOP. 36% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'FLOP. 75% Stamina Cost Penalty.',
    textColor: 'text-[#B50000] dark:text-[#ff0000]',
    maxWeight: -1,
  },
} as const satisfies Record<
  'LIGHT' | 'MEDIUM' | 'HEAVY' | 'ULTRA',
  WeightClass
>;
