import { BaseDialog, BaseDialogBody, BaseDialogTitle } from '@repo/ui';

import { QualityBuildConditions } from '@/app/(builds)/_components/quality-build-conditions';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function QualityBuildInfoDialog({ open, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>What is a Quality Build?</BaseDialogTitle>
      <BaseDialogBody>
        <QualityBuildConditions />
      </BaseDialogBody>
    </BaseDialog>
  );
}
