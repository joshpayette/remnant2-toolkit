'use client';

import Image from 'next/image';
import { useLocalStorage } from 'usehooks-ts';

import { BaseButton, BaseText, BaseTextLink, getImageUrl } from '@/components/ui';

const DISCORD_EVENT_HREF = '#'; // TODO: replace with the Discord event invite URL

export function ReturnToWard13CTA() {
  const [showBanner, setShowBanner] = useLocalStorage(
    'return-to-ward-13-2026-banner',
    true,
  );

  if (!showBanner) return null;

  return (
    <div className="mx-auto w-full py-16 sm:px-6 sm:py-12">
      <div className="relative isolate overflow-hidden bg-secondary-900/10 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:px-24">
        <Image
          alt="Return to Ward 13"
          src={getImageUrl('/misc/return-to-ward-13-2026.png')}
          fill
          priority
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary-900/100 via-white/80 to-secondary-900/100 dark:from-secondary-950/100 dark:via-black/80 dark:to-secondary-950/100"
        />

        <div className="mx-auto max-w-3xl text-center text-surface-solid">
          <BaseText>
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary-500 dark:text-primary-500">
              Community Event
            </span>
          </BaseText>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-surface-solid sm:text-5xl">
            Return to Ward 13
          </h2>
          <p className="mt-3 text-xl font-medium text-surface-solid/90">
            22nd July &ndash; 29th July 2026
          </p>

          <div className="mt-10 space-y-8 text-left">
            <div>
              <h3 className="text-xl font-semibold text-surface-solid">What is it?</h3>
              <p className="mt-3 text-pretty text-base/7 text-surface-solid/90">
                Return to Ward 13 is an annual, unofficial, player-driven event
                to bring players back to Remnant 2 for a week.
              </p>
              <p className="mt-3 text-pretty text-base/7 text-surface-solid/90">
                The idea is to drive the community to try the game again, engage
                with builds, fill up COOP and provide new players with support
                they would receive on game launch.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-surface-solid">
                How to participate?
              </h3>
              <p className="mt-3 text-pretty text-base/7 text-surface-solid/90">
                Play Remnant 2 solo, play Remnant 2 coop. Create new builds
                using{' '}
                <BaseTextLink
                  href="http://remnant2toolkit.com"
                  className="text-surface-solid underline"
                >
                  Remnant 2 Toolkit
                </BaseTextLink>
                , share screenshots, force your friends to try the game again,
                spread the word online, update the{' '}
                <BaseTextLink
                  href="https://remnant2.wiki.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-surface-solid underline"
                >
                  remnant2.wiki.gg
                </BaseTextLink>
                , engage in balance discussion on the{' '}
                <BaseTextLink
                  href={
                    'https://discord.com/channels/439222927876030464/1139046514052837427'
                  }
                >
                  official Discord server
                </BaseTextLink>
                .
              </p>
              <p className="mt-3 text-pretty text-base/7 text-surface-solid/90">
                Anything Remnant 2 related!
              </p>
              <p className="mt-3 text-pretty text-base/7 text-surface-solid/90">
                Check out{' '}
                <BaseTextLink
                  href={'https://www.nexusmods.com/remnant2/mods/186'}
                  className="text-surface-solid underline"
                >
                  Remnant 2 Beyond Hell
                </BaseTextLink>{' '}
                and{' '}
                <BaseTextLink
                  href={'https://www.nexusmods.com/remnant2/mods/174'}
                  className="text-surface-solid underline"
                >
                  Survival Rush
                </BaseTextLink>{' '}
                mods!
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-y-2 sm:flex-row sm:gap-x-6 sm:gap-y-0">
            <BaseButton
              href="https://discord.com/events/1185749697793626244/1414012128712593460"
              target="_blank"
              plain
              className="underline"
            >
              Discord event invite
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
      </div>
    </div>
  );
}
