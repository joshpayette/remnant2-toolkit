export const STATUS_FILTERS = ['Unread', 'Read', 'Hidden'] as const;
export type StatusFilters = (typeof STATUS_FILTERS)[number];

export const TYPE_FILTERS = [
  'Announcement',
  'BuildNew',
  'BuildUpdate',
] as const;
