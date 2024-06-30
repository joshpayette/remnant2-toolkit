import { DISCORD_INVITE_URL } from '@repo/constants'
import { getImageUrl } from '@repo/ui/utils/get-image-url'
import Image from 'next/image'
import type React from 'react'

interface Props {
  children: React.ReactNode
}

export function FooterContainer({ children }: Props) {
  return (
    <footer className="border-secondary-900 bg-background-solid mt-8 flex w-full items-center justify-center border-t p-4 text-left text-sm text-gray-400">
      <div className="max-w-2xl gap-2">
        <div className="flex w-full flex-row items-center justify-center gap-4 p-2">
          <a
            href="https://github.com/joshpayette/remnant2-toolkit"
            target="_blank"
          >
            <Image
              src={getImageUrl(`/toolkit/github.png`)}
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
              src={getImageUrl(`/toolkit/patreon.png`)}
              alt="Support on Patreon"
              width={32}
              height={32}
              className="h-6 w-6 invert dark:invert-0"
              loading="eager"
            />
          </a>
          <a href={DISCORD_INVITE_URL} target="_blank">
            <Image
              src={getImageUrl(`/toolkit/discord.png`)}
              alt="Join the Remnant 2 Toolkit Discord"
              width={32}
              height={32}
              className="h-6 w-6 invert dark:invert-0"
              loading="eager"
            />
          </a>
          <a href="https://twitter.com/Remnant2Toolkit" target="_blank">
            <Image
              src={getImageUrl(`/toolkit/twitter.png`)}
              alt="Remnant 2 Toolkit on Twitter"
              width={32}
              height={32}
              className="h-6 w-6 invert dark:invert-0"
              loading="eager"
            />
          </a>
        </div>
        {children}
      </div>
    </footer>
  )
}
