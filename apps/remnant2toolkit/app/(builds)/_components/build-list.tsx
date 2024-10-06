'use client';

import { BaseButton, cn } from '@repo/ui';
import { useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { QualityBuildDialog } from '@/app/(builds)/_components/quality-build-dialog';

function NonQualityBuildsBox({ isWithQuality }: { isWithQuality: boolean }) {
  const isClient = useIsClient();

  const [qualityBuildDialogOpen, setQualityBuildDialogOpen] = useState(false);

  // need to add `withQuality=false` to the current url
  const url = new URL(window.location.href);
  url.searchParams.set('withQuality', isWithQuality ? 'false' : 'true');

  const label = isWithQuality
    ? 'Not seeing enough builds?'
    : 'Too many builds?';

  const label2 = isWithQuality ? 'remove' : 'apply';

  if (!isClient) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center sm:mt-4">
      <QualityBuildDialog
        open={qualityBuildDialogOpen}
        onClose={() => setQualityBuildDialogOpen(false)}
      />
      <BaseButton
        color="violet"
        onClick={() => {
          window.location.href = url.href;
        }}
        className="flex flex-col"
      >
        <strong>{label}</strong>
        <span>Click to {label2} the Quality Build filter!</span>
      </BaseButton>
      <BaseButton plain onClick={() => setQualityBuildDialogOpen(true)}>
        What makes a Quality Build?
      </BaseButton>
    </div>
  );
}

interface Props {
  children: React.ReactNode;
  currentPage: number;
  firstVisibleItemNumber: number;
  lastVisibleItemNumber: number;
  headerActions: React.ReactNode | undefined;
  pagination: React.ReactNode;
  isLoading: boolean;
  isWithQuality: boolean;
  label?: string;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function BuildList({
  children,
  headerActions,
  isLoading,
  isWithQuality,
  label,
  pagination,
}: Props) {
  return (
    <div className={cn(isLoading ? 'min-h-[1000px]' : 'min-h-0')}>
      <NonQualityBuildsBox isWithQuality={isWithQuality} />
      <div className="border-b-primary-500 flex w-full flex-row items-end justify-center border-b py-2">
        {label ? <div className="w-full text-xl">{label}</div> : null}
        {headerActions}
      </div>
      {pagination}
      {children}
      {pagination}
      <NonQualityBuildsBox isWithQuality={isWithQuality} />
    </div>
  );
}
