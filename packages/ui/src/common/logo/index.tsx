import Image from 'next/image';
import { BaseLink } from '../../base/link';

type Variant = 'remnant2toolkit';

const variants = {
  remnant2toolkit: {
    imageUrl: '/remnant2/misc/toolkit-logo.png',
    alt: 'Remnant 2 Toolkit logo, a purple and yellow toolbox.',
    text: (
      <div className="ui-font-black ui-text-lg ui-leading-5 ui-text-surface-solid ui-mb-0 ui-pb-0 ui-flex ui-gap-x-0.5">
        <p>REMNANT</p>
        <p className="ui-text-red-500">II</p>
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
      className="-ui-m-1.5 ui-flex ui-items-center ui-justify-start ui-p-1.5 w-[270px] max-w-[270px]"
      href="/"
    >
      <Image
        alt={variants[variant].alt}
        className="ui-mr-2 ui-h-[36px] ui-w-[52px]"
        height={36}
        loading="eager"
        priority
        quality={90}
        src={`https://d2sqltdcj8czo5.cloudfront.net${variants[variant].imageUrl}`}
        unoptimized={unoptimized}
        width={52}
      />
      <div className="ui-flex ui-flex-col ui-gap-0">
        {variants[variant].text}
        <span className="ui-text-xs ui-leading-3 ui-font-semibold ui-text-gray-400 ui-mb-0 ui-pb-0 ui-whitespace-pre-line">
          {variants[variant].subtext}
        </span>
        {showUrl ? (
          <span className="ui-text-xs ui-leading-3 ui-text-gray-400">
            {variants[variant].url}
          </span>
        ) : null}
      </div>
    </BaseLink>
  );
}
