import Image from 'next/image';
import { BaseLink } from '../../base/link';

type Variant = 'remnant2toolkit';

const variants = {
  remnant2toolkit: {
    imageUrl: '/remnant2/misc/toolkit-logo.png',
    alt: 'Remnant 2 Toolkit logo, a purple and yellow toolbox.',
    text: (
      <div className="font-black text-lg leading-5 text-surface-solid mb-0 pb-0 flex gap-x-0.5">
        <p>REMNANT</p>
        <p className="text-accent3-500">II</p>
        <p>TOOLKIT</p>
      </div>
    ),
    subtext: 'Powered by Remnant.wiki +\nCowaii.io',
    url: 'remnant2toolkit.com',
  },
} as const satisfies Record<
  Variant,
  {
    url: string;
    alt: string;
    text: React.ReactNode;
    subtext: string;
    imageUrl: string;
  }
>;

export function Logo({
  showUrl = false,
  unoptimized = false,
  variant,
}: {
  showUrl?: boolean;
  unoptimized?: boolean;
  variant: Variant;
}) {
  return (
    <BaseLink
      className="-m-1.5 flex items-center justify-start p-1.5 w-[270px] max-w-[270px]"
      href="/"
    >
      <Image
        alt={variants[variant].alt}
        className="mr-2 h-[36px] w-[52px]"
        height={36}
        loading="eager"
        priority
        quality={90}
        src={`https://d2sqltdcj8czo5.cloudfront.net${variants[variant].imageUrl}`}
        unoptimized={unoptimized}
        width={52}
      />
      <div className="flex flex-col gap-0">
        {variants[variant].text}
        <span className="text-xs leading-3 font-semibold text-gray-400 mb-0 pb-0 whitespace-pre-line">
          {variants[variant].subtext}
        </span>
        {showUrl ? (
          <span className="text-xs leading-3 text-gray-400">
            {variants[variant].url}
          </span>
        ) : null}
      </div>
    </BaseLink>
  );
}
