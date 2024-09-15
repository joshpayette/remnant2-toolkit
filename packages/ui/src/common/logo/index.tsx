import Image from 'next/image';
import { BaseLink } from '../../base/link';

type Variant = 'remnant2toolkit';

const variants = {
  remnant2toolkit: {
    imageUrl: '/remnant2/misc/toolkit-logo.png',
    alt: 'Remnant 2 Toolkit logo, a purple and yellow toolbox.',
    text: (
      <div className="ui-mb-0 ui-pb-0 ui-flex ui-gap-x-0.5">
        <p className="ui-font-black ui-text-[16px] ui-leading-4 ui-antialiased ui-text-surface-solid">
          REMNANT
        </p>
        <p className="ui-font-black ui-leading-4 ui-text-red-500 ui-text-[16px] ui-antialiased">
          II
        </p>
        <p className="ui-font-black ui-leading-4 ui-text-[16px] ui-antialiased ui-text-surface-solid">
          TOOLKIT
        </p>
      </div>
    ),
    subtext: 'Powered by Remnant.wiki + Cowaii.io',
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
      className="-ui-m-1.5 ui-flex ui-items-center ui-justify-start ui-p-1.5 ui-max-w-[245px]"
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
        <span className="ui-text-[10px] ui-font-bold ui-antialiased ui-leading-3 ui-text-surface-solid ui-mb-0 ui-pb-0">
          {variants[variant].subtext}
        </span>
        {showUrl ? (
          <span className="ui-text-[10px] ui-leading-3 ui-text-surface-solid">
            {variants[variant].url}
          </span>
        ) : null}
      </div>
    </BaseLink>
  );
}
