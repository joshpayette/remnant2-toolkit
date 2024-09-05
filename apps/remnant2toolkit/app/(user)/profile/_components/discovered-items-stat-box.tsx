'use client';

import { useIsClient } from 'usehooks-ts';

import { StatBox } from '@/app/(user)/profile/_components/stat-box';

interface Props {
  stat: { name: string; value: number; unit?: string };
  index: number;
  isEditable: boolean;
}

export function DiscoveredItemsStatBox({ stat, index, isEditable }: Props) {
  const isClient = useIsClient();
  if (!isClient || !isEditable) {
    return <StatBox stat={stat} index={index} />;
  }

  return <StatBox stat={stat} index={index} />;
}
