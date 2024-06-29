import { Link } from '@repo/ui/base/link'
import { getImageUrl } from '@repo/ui/utils/get-image-url'
import Image from 'next/image'

type Variant = 'remnant2toolkit'

const variants = {
  remnant2toolkit: {
    imageUrl: '/toolkit/toolkit-logo.png',
    alt: 'Remnant 2 Toolkit logo, a purple and yellow toolbox.',
    text: 'Remnant2Toolkit',
    url: 'remnant2toolkit.com',
  },
} as const satisfies Record<
  Variant,
  { url: string; alt: string; text: string; imageUrl: string }
>

export function Logo({
  showUrl = false,
  unoptimized = false,
  variant,
}: {
  showUrl?: boolean
  unoptimized?: boolean
  variant: Variant
}) {
  return (
    <Link
      href="/"
      className="-ui-m-1.5 ui-flex ui-items-center ui-justify-start ui-p-1.5"
    >
      <Image
        className="ui-mr-2 ui-h-[36px] ui-w-[52px]"
        src={getImageUrl(`${variants[variant].imageUrl}`)}
        alt={variants[variant].alt}
        width={52}
        height={36}
        loading="eager"
        priority
        unoptimized={unoptimized}
      />
      <div className="ui-flex ui-flex-col ui-gap-0">
        <span className="ui-text-md ui-text-surface-solid ui-mb-0 ui-pb-0 ui-font-semibold">
          {variants[variant].text}
        </span>
        {showUrl && (
          <span className="text-xs text-gray-400">{variants[variant].url}</span>
        )}
      </div>
    </Link>
  )
}
