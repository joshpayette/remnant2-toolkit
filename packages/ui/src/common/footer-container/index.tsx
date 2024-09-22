import { DISCORD_INVITE_URL } from '@repo/constants';
import Image from 'next/image';
import React from 'react';
import { getImageUrl } from '../../utils/get-image-url';

interface FooterContainerProps {
  children: React.ReactNode;
}

export function FooterContainer({ children }: FooterContainerProps) {
  return (
    <footer className="ui-border-secondary-900 ui-bg-background-solid ui-mt-8 ui-flex ui-w-full ui-items-center ui-justify-center ui-border-t ui-p-4 ui-text-left ui-text-sm ui-text-gray-400">
      <div className="ui-max-w-2xl ui-gap-2">
        <div className="ui-flex ui-w-full ui-flex-row ui-items-center ui-justify-center ui-gap-4 ui-p-2">
          <a
            href="https://github.com/joshpayette/remnant2-toolkit"
            rel="noopener"
            target="_blank"
          >
            <Image
              alt="Remnant 2 Toolkit on GitHub"
              className="ui-h-8 ui-w-8 ui-invert dark:ui-invert-0"
              height={32}
              loading="eager"
              src={getImageUrl(`/misc/github.png`)}
              width={32}
            />
          </a>
          <a
            href="https://www.patreon.com/JoshPayette/membership"
            rel="noopener"
            target="_blank"
          >
            <Image
              alt="Support on Patreon"
              className="ui-h-6 ui-w-6 ui-invert dark:ui-invert-0"
              height={32}
              loading="eager"
              src={getImageUrl(`/misc/patreon.png`)}
              width={32}
            />
          </a>
          <a href={DISCORD_INVITE_URL} rel="noopener" target="_blank">
            <Image
              alt="Join the Remnant 2 Toolkit Discord"
              className="ui-h-6 ui-w-6 ui-invert dark:ui-invert-0"
              height={32}
              loading="eager"
              src={getImageUrl(`/misc/discord1.png`)}
              width={32}
            />
          </a>
          <a
            href="https://twitter.com/Remnant2Toolkit"
            rel="noopener"
            target="_blank"
          >
            <Image
              alt="Remnant 2 Toolkit on Twitter"
              className="ui-h-6 ui-w-6 ui-invert dark:ui-invert-0"
              height={32}
              loading="eager"
              src={getImageUrl(`/misc/twitter.png`)}
              width={32}
            />
          </a>
        </div>
        {children}
      </div>
    </footer>
  );
}
