import Image from 'next/image'

import { Link } from '@repo/ui/base/link'
import { getImageUrl } from '@/app/(utils)/get-image-url'

export function Logo({
  showUrl = false,
  unoptimized = false,
}: {
  showUrl?: boolean
  unoptimized?: boolean
}) {
  return (
    <Link href="/" className="-m-1.5 flex items-center justify-start p-1.5">
      <Image
        className="mr-2 h-[36px] w-[52px]"
        src={getImageUrl(`/toolkit/toolkit-logo.png`)}
        alt="Remnant 2 Toolkit logo, a purple and yellow toolbox."
        width={52}
        height={36}
        loading="eager"
        priority
        unoptimized={unoptimized}
      />
      <div className="flex flex-col gap-0">
        <span className="text-md text-surface-solid mb-0 pb-0 font-semibold">
          Remnant2Toolkit
        </span>
        {showUrl && (
          <span className="text-xs text-gray-400">remnant2toolkit.com</span>
        )}
      </div>
    </Link>
  )
}
