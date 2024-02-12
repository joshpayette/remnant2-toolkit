import Image from 'next/image'

import { Tooltip } from '@/features/ui/Tooltip'

export function NewBuildBadge() {
  return (
    <Tooltip content={`Denotes a new build created in the past 24 hours`}>
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/badges/new_build_badge.png`}
        width={43}
        height={50}
        alt="image denoting the build is new in the past 24 hours"
      />
    </Tooltip>
  )
}
