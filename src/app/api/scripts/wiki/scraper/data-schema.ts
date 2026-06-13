import { z } from 'zod';

export const dataSchema = z.object({
  Name: z.string({ required_error: 'Name is required' }),
  Class: z.string({ required_error: 'Class is required' }).optional(),
  Description: z
    .string({ required_error: 'Description is required' })
    .optional(),
  Filepath: z.string({ required_error: 'Filepath is required' }).optional(),
  DLC: z.string({ required_error: 'DLC is required' }).optional(),
  Damage: z.string({ required_error: 'Damage is required' }).optional(),
  RPS: z.string({ required_error: 'RPS is required' }).optional(),
  Magazine: z.string({ required_error: 'Magazine is required' }).optional(),
  Accuracy: z.string({ required_error: 'Accuracy is required' }).optional(),
  'Ideal Range': z
    .string({ required_error: 'Ideal Range is required' })
    .optional(),
  'Falloff Range': z
    .string({ required_error: 'Falloff Range is required' })
    .optional(),
  Ammo: z.string({ required_error: 'Ammo is required' }).optional(),
  Crit: z.string({ required_error: 'Crit is required' }).optional(),
  Weakspot: z.string({ required_error: 'Weakspot is required' }).optional(),
  Stagger: z.string({ required_error: 'Stagger is required' }).optional(),
  Mod: z.string({ required_error: 'Mod is required' }).optional(),
  Armor: z.string({ required_error: 'Armor is required' }).optional(),
  Weight: z.string({ required_error: 'Weight is required' }).optional(),
  BleedResistance: z
    .string({ required_error: 'BleedResistance is required' })
    .optional(),
  FireResistance: z
    .string({ required_error: 'FireResistance is required' })
    .optional(),
  ShockResistance: z
    .string({ required_error: 'ShockResistance is required' })
    .optional(),
  CorrosiveResistance: z
    .string({ required_error: 'CorrosiveResistance is required' })
    .optional(),
  BlightResistance: z
    .string({ required_error: 'BlightResistance is required' })
    .optional(),
});
export type DataRow = z.infer<typeof dataSchema>;
