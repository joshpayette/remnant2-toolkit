import Image from 'next/image'

import { cn } from '@/app/(utils)/classnames'

import { DISCORD_INVITE_URL, NAV_ITEMS } from '../(types)/navigation'

const aClass = 'text-gray-300 hover:text-primary-400 underline'

export function Footer() {
  return (
    <footer className="mt-8 flex w-full items-center justify-center border-t border-secondary-900 bg-background-solid p-4 text-left text-sm text-gray-400">
      <div className="max-w-2xl gap-2">
        <div className="flex w-full flex-row items-center justify-center gap-4 p-2">
          <a
            href="https://github.com/joshpayette/remnant2-toolkit"
            target="_blank"
          >
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/github.png`}
              alt="Remnant 2 Toolkit on GitHub"
              width={32}
              height={32}
              className="h-8 w-8 invert dark:invert-0"
              loading="eager"
            />
          </a>
          <a
            href="https://www.patreon.com/JoshPayette/membership"
            target="_blank"
          >
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/patreon.png`}
              alt="Support on Patreon"
              width={32}
              height={32}
              className="h-6 w-6 invert dark:invert-0"
              loading="eager"
            />
          </a>
          <a href={DISCORD_INVITE_URL} target="_blank">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/discord.png`}
              alt="Join the Remnant 2 Toolkit Discord"
              width={32}
              height={32}
              className="h-6 w-6 invert dark:invert-0"
              loading="eager"
            />
          </a>
          <a href="https://twitter.com/Remnant2Toolkit" target="_blank">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/twitter.png`}
              alt="Remnant 2 Toolkit on Twitter"
              width={32}
              height={32}
              className="h-6 w-6 invert dark:invert-0"
              loading="eager"
            />
          </a>
        </div>
        <p className="mb-4">
          Remnant 2 Toolkit is an{' '}
          <a
            href="https://github.com/joshpayette/remnant2-toolkit"
            target="_blank"
            className={cn(aClass)}
          >
            open source project
          </a>{' '}
          created and managed by Josh Payette.
          <br />
          View the{' '}
          <a href={NAV_ITEMS.changeLog.href} className={cn(aClass)}>
            change log
          </a>{' '}
          for the latest updates.
        </p>

        <p className="pb-4">
          Got an issue or feature request? Want to be involved in giving
          feedback on the latest features? Want your build featured on the site?
          Join the{' '}
          <a href={DISCORD_INVITE_URL} target="_blank" className={cn(aClass)}>
            Remnant 2 Toolkit Discord
          </a>
          !
        </p>

        <hr className="border-gray-900 pb-4" />
        <p className="pb-4">
          These tools would not be possible without the{' '}
          <a href="https://remnant.wiki" target="_blank" className={cn(aClass)}>
            community maintained Remnant 2 Wiki
          </a>
          , as well as the{' '}
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
          .
          <br />
          <br />A special thanks to{' '}
          <a
            href="https://github.com/joshpayette/remnant2-toolkit/blob/main/CONTRIBUTORS.md"
            target="_blank"
            className={cn(aClass)}
          >
            all of the community contributors
          </a>
          , this project would not be possible without your help.
        </p>

        <p>
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
        <div className="h-[50px] w-full bg-background-solid sm:hidden">
          {/* Spacer for the back to top button on mobile */}
          &nbsp;
        </div>
      </div>
    </footer>
  )
}
