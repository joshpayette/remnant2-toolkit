import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { Skeleton } from '@/features/ui/Skeleton'

interface Props {
  imageDownloadInfo: { imageLink: string; imageName: string } | null
  onClose: () => void
}

export function ImageDownloadInfoDialog({ imageDownloadInfo, onClose }: Props) {
  if (!imageDownloadInfo) return null
  const { imageLink, imageName } = imageDownloadInfo

  return (
    <BaseDialog
      open={Boolean(imageDownloadInfo)}
      title="Shareable Build Image"
      onClose={onClose}
      size="lg"
    >
      <BaseDialogTitle>Shareable Build Image</BaseDialogTitle>
      <BaseDialogBody>
        <div className="flex w-full flex-col items-start justify-center gap-y-4 text-left text-sm">
          <p>
            Copy and paste the below image to share it, or save the image for
            later!
          </p>
          <p className="text-primary">
            Note: This image link will expire in one hour.
          </p>
          {imageLink ? (
            <a href={imageLink} target="_blank">
              <img src={imageLink} alt={imageName} />
            </a>
          ) : (
            <Skeleton className="h-[500px] w-[500px]" />
          )}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
