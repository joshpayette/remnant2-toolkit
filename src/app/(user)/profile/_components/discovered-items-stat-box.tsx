'use client';

import { useIsClient } from 'usehooks-ts';

import { StatBox } from '@/app/(user)/profile/_components/stat-box';

interface Props {
  stat: { name: string; value: number; unit?: string };
  icon?: React.ReactNode;
  isEditable: boolean;
}

export function DiscoveredItemsStatBox({ stat, icon, isEditable }: Props) {
  const isClient = useIsClient();
  if (!isClient || !isEditable) {
    return <StatBox stat={stat} icon={icon} />;
  }

  return <StatBox stat={stat} icon={icon} />;
}
