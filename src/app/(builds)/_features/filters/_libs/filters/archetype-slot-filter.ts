export const archetypeSlotFilter = {
  buildFilterKey: 'archetypeSlot',
  defaultValue: -1,
  label: 'Archetype Slot',
  options: [
    {
      label: 'Any Slot',
      value: -1,
    },
    {
      label: 'Primary',
      value: 0,
    },
    {
      label: 'Secondary',
      value: 1,
    },
  ],
};

export type ArchetypeSlotFilterValue = typeof archetypeSlotFilter.defaultValue;
