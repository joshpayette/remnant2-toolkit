import Image from 'next/image'

import { Avatar } from '@/app/profile/[userId]/(lib)/types'

interface Props {
  avatar: Avatar
  showLabel?: boolean
}

export function AvatarBox({
  avatar: { name, id, imagePath },
  showLabel = false,
}: Props) {
  return (
    <div className="rounded-md bg-secondary/10 p-1 text-xs font-medium ring-1 ring-inset ring-secondary/30">
      <Image
        id={id}
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}`}
        alt={name}
        width={128}
        height={128}
      />
      {showLabel ? (
        <div className="mt-1 bg-gray-900 py-1 text-center">{name}</div>
      ) : null}
    </div>
  )
}
