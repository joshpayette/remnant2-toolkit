import { type FilterOption } from '@repo/ui';

export type FilterDefinition = {
  buildFilterKey: string;
  label: string;
} & (
  | {
      defaultValue: FilterOption[];
      options: Array<{
        label: string;
        value: string;
      }>;
    }
  | {
      defaultValue: boolean;
      options: Array<{
        label: string;
        value: boolean;
      }>;
    }
  | {
      defaultValue: number;
      options: Array<{
        label: string;
        value: number;
      }>;
    }
  | {
      defaultValue: string;
      options:
        | undefined
        | Array<{
            label: string;
            value: string;
          }>;
    }
);
