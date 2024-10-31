export type FilterListboxState = 'included' | 'default' | 'excluded';

export interface FilterOption {
  readonly value: string;
  readonly label: string;
  readonly subLabel?: string;
  readonly state: FilterListboxState;
}
