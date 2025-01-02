'use client';

import { BaseDialog, BaseDialogBody, BaseDialogTitle } from '@repo/ui';
import { useState } from 'react';

import { QualityBuildConditions } from '@/app/(builds)/_components/quality-build-conditions';

export function QualityBuildFeedInfoDialog() {
  const [qualityBuildDialogOpen, setQualityBuildDialogOpen] = useState(false);

  return (
    <>
      <BaseDialog
        open={qualityBuildDialogOpen}
        onClose={() => setQualityBuildDialogOpen(false)}
        size="md"
      >
        <BaseDialogTitle>What is a Quality Build?</BaseDialogTitle>
        <BaseDialogBody>
          <QualityBuildConditions />
        </BaseDialogBody>
      </BaseDialog>
      <button
        onClick={() => setQualityBuildDialogOpen(true)}
        className="hover:text-surface-solid text-primary-400 text-right text-sm underline"
      >
        What makes a Quality Build?
      </button>
    </>
  );
}
