import { type ReactNode } from 'react';

export function StatsListItem({ children }: { children: ReactNode }) {
  return <li className="text-gray-300">{children}</li>;
}
