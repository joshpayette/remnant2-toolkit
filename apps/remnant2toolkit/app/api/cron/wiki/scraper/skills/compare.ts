import { type SkillItem } from '@/app/(items)/_types/skill-item';

export function skillDataCompare(
  newData: {
    description: string;
    cooldown: number;
  },
  currentItem: SkillItem,
): {
  descriptionMatches: boolean;
  cooldownMatches: boolean;
  dataDiffers: boolean;
} {
  const descriptionMatches = newData.description === currentItem.description;
  let cooldownMatches = newData.cooldown === currentItem.cooldown;
  if (newData.cooldown === 0 && currentItem.cooldown === undefined) {
    cooldownMatches = true;
  }
  const dataDiffers = !descriptionMatches || !cooldownMatches;

  return {
    descriptionMatches,
    cooldownMatches,
    dataDiffers,
  };
}
