/**
 * Since a lot of data is stored in URL params, there are symbols that are used to
 * represent certain values. These symbols are used to represent the following:
 */

// Some items can be optional
// i.e. `itemId*`
export const OPTIONAL_ITEM_SYMBOL = '*' as const;

// Some items can be excluded from results
// i.e. `!itemId`
export const EXCLUDE_ITEM_SYMBOL = '!' as const;

// For values like traits and their values
// i.e. `traitName;value`
export const VALUE_SEPARATOR_SYMBOL = ';' as const;
