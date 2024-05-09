import Image from 'next/image'

import { Link } from '@/app/(components)/_base/link'

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
        className="mr-2 h-[24px] w-[35px]"
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/toolkit-logo-sm.png`}
        alt="Remnant 2 Toolkit logo, a purple and yellow toolbox."
        width={35}
        height={24}
        loading="eager"
        priority
        unoptimized={unoptimized}
      />
      <div className="flex flex-col gap-0">
        <span className="text-md mb-0 pb-0 font-semibold text-on-background">
          Remnant2Toolkit
        </span>
        {showUrl && (
          <span className="text-xs text-on-background">remnant2toolkit.com</span>
        )}
      </div>
    </Link>
  )
}
