import { type ReactNode } from 'react';

export function ListItem({ children }: { children: ReactNode }) {
  return <li className="text-gray-300">{children}</li>;
}
