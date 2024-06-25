import { BaseButton } from '@repo/ui/base/button'
import { LoadingButton } from '@/app/(components)/buttons/builder-buttons/loading-button'

interface Props {
  onClick: () => void
  imageExportLoading: boolean
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
      className="sm:w-full"
    >
      Generate Image
    </BaseButton>
  )
}
