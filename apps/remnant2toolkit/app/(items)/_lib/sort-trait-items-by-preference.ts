import type { SortingPreference } from '@/app/_types/localstorage';
import type { TraitItem } from '@/app/(items)/_types/trait-item';

export function sortTraitsItemsByPreference(
  traitItems: TraitItem[],
  sortingPreference: SortingPreference,
): TraitItem[] {
  switch (sortingPreference) {
    case 'alphabetical': {
      return [...traitItems].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Traits should be ordered by type:
    // 1. Archetype, sorted alphabetical
    // 2. Core, sorted Vigor, Endurance, Spirit, Expertise
    // 3. Trait, sorted alphabetical
    case 'in-game': {
      return [
        ...traitItems
          .filter((item) => item.type === 'archetype')
          .sort((a, b) => a.name.localeCompare(b.name)),
        ...traitItems
          .filter((item) => item.type === 'core')
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
        ...traitItems
          .filter((item) => item.type === 'trait')
          .sort((a, b) => a.name.localeCompare(b.name)),
      ];
    }
  }
}
