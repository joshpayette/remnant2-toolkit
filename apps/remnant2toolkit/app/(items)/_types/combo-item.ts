export interface ComboItem {
  name: string;
  fragments: string[];
}

// Need a typeguard to check if an object is a ComboItem
export function isComboItem(obj: any): obj is ComboItem {
  return obj && obj.name && obj.fragments;
}
