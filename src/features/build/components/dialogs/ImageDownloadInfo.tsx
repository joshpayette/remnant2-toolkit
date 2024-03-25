import { Dialog } from '@/features/ui/Dialog'
import { Skeleton } from '@/features/ui/Skeleton'

interface Props {
  imageDownloadInfo: { imageLink: string; imageName: string } | null
  onClose: () => void
}

export function ImageDownloadInfo({ imageDownloadInfo, onClose }: Props) {
  if (!imageDownloadInfo) return null

  const { imageLink, imageName } = imageDownloadInfo

  return (
    <Dialog
      open={Boolean(imageDownloadInfo)}
      title="Shareable Build Image"
      maxWidthClass="max-w-lg"
      onClose={onClose}
    >
      <div className="flex w-full flex-col items-start justify-center gap-y-4 text-left text-sm">
        <p>
          Copy and paste the below image to share it, or save the image for
          later!
        </p>
        <p className="text-primary-500">
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
    </Dialog>
  )
}
