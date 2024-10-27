import { type FilterOption } from '@repo/ui';

export interface FilterDefinition {
  buildFilterKey: string;
  defaultValue: FilterOption[] | string;
  label: string;
  validOptions?: string[];
}
