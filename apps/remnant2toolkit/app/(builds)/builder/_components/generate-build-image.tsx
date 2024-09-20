import { BaseButton } from '@repo/ui';

import { LoadingButton } from '@/app/(builds)/builder/_components/loading-button';

interface Props {
  onClick: () => void;
  imageExportLoading: boolean;
}

export function GenerateBuildImageButton({
  onClick,
  imageExportLoading,
}: Props) {
  return imageExportLoading ? (
    <LoadingButton />
  ) : (
    <BaseButton
      color="violet"
      aria-label="Export build as an image."
      onClick={onClick}
      className="lg:w-full"
    >
      Generate Image
    </BaseButton>
  );
}
