'use client';

import { useState } from 'react';

import { QualityBuildInfoDialog } from '@/app/(builds)/_components/quality-build-info-dialog';

export function QualityBuildFeedInfoDialog() {
  const [qualityBuildDialogOpen, setQualityBuildDialogOpen] = useState(false);

  return (
    <>
      <QualityBuildInfoDialog
        open={qualityBuildDialogOpen}
        onClose={() => setQualityBuildDialogOpen(false)}
      />
      <button
        onClick={() => setQualityBuildDialogOpen(true)}
        className="hover:text-surface-solid text-primary-400 text-right text-sm underline"
      >
        What makes a Quality Build?
      </button>
    </>
  );
}
