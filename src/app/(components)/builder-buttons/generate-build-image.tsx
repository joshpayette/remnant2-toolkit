import { Button } from '@/app/(components)/base/button'
import { LoadingButton } from '@/app/(components)/builder-buttons/loading-button'

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
    <Button
      color="violet"
      aria-label="Export build as an image."
      onClick={onClick}
      className="sm:w-full"
    >
      Generate Image
    </Button>
  )
}
