'use client';

import { BaseButton, BaseText, getImageUrl } from '@repo/ui';
import Image from 'next/image';
import { useLocalStorage } from 'usehooks-ts';

import { NAV_ITEMS } from '@/app/_constants/nav-items';

export function RemnantOverseerCTA() {
  const [showBanner, setShowBanner] = useLocalStorage(
    'remnant-overseer-banner',
    true,
  );

  if (!showBanner) return null;

  return (
    <div className="mx-auto w-full py-16 sm:px-6 sm:py-12">
      <div className="bg-secondary-900/10 relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="size-[64rem] absolute left-1/2 top-1/2 -z-10 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#11001C" />
              <stop offset={1} stopColor="#4C1D95" />
            </radialGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Introducing {NAV_ITEMS.remnantOverseer.label}
          </h2>
          <BaseText>
            <span className="text-white/70">
              Spotlighted community tool, developed by Angelore
            </span>
          </BaseText>
          <p className="text-pretty mt-6 text-lg/8 text-white">
            {NAV_ITEMS.remnantOverseer.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-y-2 sm:flex-row sm:gap-x-6 sm:gap-y-0 lg:justify-start">
            <BaseButton
              href={NAV_ITEMS.remnantOverseer.href}
              target="_blank"
              color="white"
            >
              <NAV_ITEMS.remnantOverseer.icon
                width={20}
                height={20}
                className="h-5 w-5"
              />{' '}
              Learn more
            </BaseButton>
            <BaseButton
              className="underline"
              plain
              onClick={() => setShowBanner(false)}
            >
              Dismiss this banner
            </BaseButton>
          </div>
        </div>
        <div className="relative mt-16 h-5 lg:mt-8">
          <Image
            alt="Remnant Overseer In-Game Screenshot"
            src={getImageUrl('/misc/remnant-overseer-ingame.webp')}
            width={1824}
            height={1080}
            className="absolute left-0 top-0 w-[45rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
          />
        </div>
      </div>
    </div>
  );
}
