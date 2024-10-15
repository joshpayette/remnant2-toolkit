'use client';

import { useIsClient } from 'usehooks-ts';

import { StatBox } from '@/app/(user)/profile/_components/stat-box';

interface Props {
  stat: { name: string; value: number; unit?: string };
  index: number;
  icon?: React.ReactNode;
  isEditable: boolean;
}

export function DiscoveredItemsStatBox({
  stat,
  icon,
  index,
  isEditable,
}: Props) {
  const isClient = useIsClient();
  if (!isClient || !isEditable) {
    return <StatBox stat={stat} index={index} icon={icon} />;
  }

  return <StatBox stat={stat} index={index} icon={icon} />;
}
