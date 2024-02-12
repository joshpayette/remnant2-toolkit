import Link from 'next/link'

import { Dialog } from '@/features/ui/Dialog'

interface Props {
  imageLink: string | null
  onClose: () => void
}

export function ImageDownloadLink({ imageLink, onClose }: Props) {
  if (!imageLink) return null

  return (
    <Dialog
      open={Boolean(imageLink)}
      title="Image download"
      maxWidthClass="max-w-lg"
      onClose={onClose}
    >
      <Link href={imageLink ?? ''} target="_blank">
        If the download doesn&apos;t start automatically,{' '}
        <span className="text-green-500 hover:text-green-300 hover:underline">
          click here
        </span>
        .
      </Link>
    </Dialog>
  )
}
