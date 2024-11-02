import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogTitle,
  BaseText,
} from '@repo/ui';

import type { QualityBuildCheckResult } from '@/app/(builds)/_libs/is-build-quality-build';

interface Props {
  open: boolean;
  qualityBuildCheckResults: QualityBuildCheckResult[];
  onClose: (action: 'save' | 'edit') => void;
}

export function QualityBuildCheckDialog({
  open,
  qualityBuildCheckResults,
  onClose,
}: Props) {
  return (
    <BaseDialog open={open} onClose={() => onClose('edit')} size="md">
      <BaseDialogTitle>Quality Build</BaseDialogTitle>
      <BaseDialogBody>
        <BaseText>
          Your build does not meet the quality build conditions. This means that
          it will not show up in the Community Build feed unless the user
          specifically filters for non-quality builds.
        </BaseText>
        <BaseText>
          Below is a list of what you can adjust to meet the quality build
          conditions:
        </BaseText>
        <ul className="text-md mt-4 list-disc">
          {qualityBuildCheckResults.map((result, index) => (
            <li key={index} className="mb-1 ml-4">
              {result.message}
            </li>
          ))}
        </ul>
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton onClick={() => onClose('edit')} outline>
          Edit Build
        </BaseButton>
        <BaseButton onClick={() => onClose('save')} color="green">
          Save Anyway
        </BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  );
}
