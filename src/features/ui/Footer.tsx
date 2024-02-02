import { cn } from '@/lib/classnames'
import Image from 'next/image'

const aClass = 'text-gray-300 hover:text-green-400 underline'

export default function Footer() {
  return (
    <div className="max-w-2xl gap-2">
      <div className="flex w-full flex-row items-center justify-center gap-4 p-2">
        <a href="https://discord.gg/kgVaU3zAQ7" target="_blank">
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/discord.png`}
            alt="Donate with PayPal"
            width={32}
            height={32}
            className="h-6 w-6"
            loading="eager"
          />
        </a>
        {/* <a href="https://twitter.com/Remnant2Toolkit" target="_blank">
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/twitter.png`}
            alt="Remnant 2 Toolkit on Twitter"
            width={32}
            height={32}
            className="h-6 w-6"
            loading="eager"
          />
        </a> */}
        <a
          href="https://github.com/joshpayette/remnant2-toolkit"
          target="_blank"
        >
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/github.png`}
            alt="Remnant 2 Toolkit on GitHub"
            width={32}
            height={32}
            className="h-8 w-8"
            loading="eager"
          />
        </a>
        <a
          href="https://www.patreon.com/JoshPayette/membership"
          target="_blank"
        >
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/patreon.png`}
            alt="Support on Patreon"
            width={32}
            height={32}
            className="h-6 w-6"
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
      </p>
      <hr className="border-gray-900 pb-4" />
      <p className="pb-4">
        These tools would not be possible without the{' '}
        <a
          href="https://remnant2.wiki.fextralife.com/Remnant+2+Wiki"
          target="_blank"
          className={cn(aClass)}
        >
          Fextralife Remnant 2 Wiki
        </a>
        , as well as the{' '}
        <a
          href="https://docs.google.com/spreadsheets/d/1I7vkh50KWJZSxNy4FqxvniFWBstJQEMtpwtxQ3ByoPw/edit?pli=1"
          target="_blank"
          className={cn(aClass)}
        >
          amazingly detailed stat calculator
        </a>{' '}
        by{' '}
        <a
          href="https://www.youtube.com/@VashCowaii"
          target="_blank"
          className={cn(aClass)}
        >
          Vash Cowaii
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/joshpayette/remnant2-toolkit/CONTRIBUTORS.md"
          target="_blank"
          className={cn(aClass)}
        >
          all of the community contributors.
        </a>
      </p>
      <hr className="border-gray-900 pb-4" />
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
      <div className="h-[50px] w-full bg-black sm:hidden">
        {/* Spacer for the back to top button on mobile */}
        &nbsp;
      </div>
    </div>
  )
}
