import { type DefaultFilter } from '@/app/_types/default-filter';

export interface ItemLookupFilters {
  categories: string[] | [DefaultFilter];
  collections: string[] | [DefaultFilter];
  releases: string[] | [DefaultFilter];
  searchText: string;
  world: string | DefaultFilter;
  dungeon: string | DefaultFilter;
}
