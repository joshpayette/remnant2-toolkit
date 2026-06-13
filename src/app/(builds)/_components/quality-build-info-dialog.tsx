import { QualityBuildConditions } from '@/app/(builds)/_components/quality-build-conditions';
import { BaseDialog, BaseDialogBody, BaseDialogTitle } from '@/components/ui';

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
