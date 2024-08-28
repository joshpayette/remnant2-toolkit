import { DISCORD_INVITE_URL } from '@repo/constants';
import Image from 'next/image';
import React from 'react';
import { getImageUrl } from '../../utils/get-image-url';

interface FooterContainerProps {
  children: React.ReactNode;
}

export function FooterContainer({ children }: FooterContainerProps) {
  return (
    <footer className="border-secondary-900 bg-background-solid mt-8 flex w-full items-center justify-center border-t p-4 text-left text-sm text-gray-400">
      <div className="max-w-2xl gap-2">
        <div className="flex w-full flex-row items-center justify-center gap-4 p-2">
          <a
            href="https://github.com/joshpayette/remnant2-toolkit"
            rel="noopener"
            target="_blank"
          >
            <Image
              alt="Remnant 2 Toolkit on GitHub"
              className="h-8 w-8 invert dark:invert-0"
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
              className="h-6 w-6 invert dark:invert-0"
              height={32}
              loading="eager"
              src={getImageUrl(`/misc/patreon.png`)}
              width={32}
            />
          </a>
          <a href={DISCORD_INVITE_URL} rel="noopener" target="_blank">
            <Image
              alt="Join the Remnant 2 Toolkit Discord"
              className="h-6 w-6 invert dark:invert-0"
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
              className="h-6 w-6 invert dark:invert-0"
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
