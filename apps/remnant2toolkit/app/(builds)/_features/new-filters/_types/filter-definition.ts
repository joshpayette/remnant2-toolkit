import { type FilterOption } from '@repo/ui';

export interface FilterDefinition {
  buildFilterKey: string;
  defaultValue: FilterOption[];
  label: string;
  validOptions: string[];
}
