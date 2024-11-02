import { DISCORD_INVITE_URL } from '@repo/constants';
import { cn, FooterContainer, getImageUrl } from '@repo/ui';
import Image from 'next/image';
import Link from 'next/link';

import { NAV_ITEMS } from '@/app/_constants/nav-items';

const aClass = 'text-gray-300 hover:text-primary-400 underline';

export function Footer() {
  return (
    <FooterContainer>
      <p className="mb-4">
        Remnant 2 Toolkit is an{' '}
        <a
          href="https://github.com/joshpayette/remnant2-toolkit"
          target="_blank"
          className={cn(aClass)}
        >
          open source project
        </a>{' '}
        created and managed by Josh Payette. View the{' '}
        <a href={NAV_ITEMS.changeLog.href} className={cn(aClass)}>
          change log
        </a>{' '}
        or the{' '}
        <a
          href="https://www.patreon.com/JoshPayette"
          target="_blank"
          className={cn(aClass)}
        >
          Patreon
        </a>
        {` `}for the latest updates.
      </p>

      <p className="pb-4">
        Got an issue or feature request? Want to be involved in giving feedback
        on the latest features? Want your build featured on the site? Join the{' '}
        <a href={DISCORD_INVITE_URL} target="_blank" className={cn(aClass)}>
          Remnant 2 Toolkit Discord
        </a>
        !
      </p>

      <hr className="mb-2 border-gray-900" />

      <div className="flex items-center justify-center">
        <Link href={NAV_ITEMS.wiki.href} target="_blank">
          <Image
            src={getImageUrl(`/misc/remnant_wiki_poweredby.png`)}
            alt={NAV_ITEMS.wiki.description}
            width={300}
            height={200}
          />
        </Link>
      </div>

      <p className="pb-4">
        This tool is made more powerful thanks to the{' '}
        <a href="https://cowaii.io/" target="_blank" className={cn(aClass)}>
          amazingly detailed loadout calculator
        </a>{' '}
        by{' '}
        <a
          href="https://www.youtube.com/@VashCowaii"
          target="_blank"
          className={cn(aClass)}
        >
          Vash Cowaii
        </a>
        . A special thanks to{' '}
        <a
          href="https://github.com/joshpayette/remnant2-toolkit/blob/main/CONTRIBUTORS.md"
          target="_blank"
          className={cn(aClass)}
        >
          all of the community contributors
        </a>
        , this project would not be possible without your help.{' '}
        {`This project was inspired by Robin Kuiper's `}
        <a
          href="https://remnant.rkuiper.nl/"
          target="_blank"
          className={cn(aClass)}
        >
          Remnant 2 Tools
        </a>
        .
      </p>
      <div className="bg-background-solid h-[50px] w-full sm:hidden">
        {/* Spacer for the back to top button on mobile */}
        &nbsp;
      </div>
    </FooterContainer>
  );
}
