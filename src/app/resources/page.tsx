import Image from 'next/image'

import { NAV_ITEMS } from '@/app/(types)/navigation'
import { LandingPageCard } from '@/features/ui/LandingPageCard'
import { LandingPageContainer } from '@/features/ui/LandingPageContainer'

export default async function Page() {
  return (
    <LandingPageContainer
      image="resources"
      title="Toolkit Resources"
      description={
        <div className="mt-6 text-lg leading-8">
          <p className="mt-6 text-lg leading-8">
            {NAV_ITEMS.resources.description}
          </p>
        </div>
      }
    >
      <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        <LandingPageCard
          {...NAV_ITEMS.worldSaveArchive}
          icon={
            <NAV_ITEMS.worldSaveArchive.icon
              className="h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.bossTracker}
          icon={
            <NAV_ITEMS.bossTracker.icon
              className="h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.hardcoreVeteran}
          icon={
            <NAV_ITEMS.hardcoreVeteran.icon
              className="h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.vashCalculator}
          icon={
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${NAV_ITEMS.vashCalculator.icon}`}
              width={20}
              height={20}
              alt={`${NAV_ITEMS.vashCalculator.label}, ${NAV_ITEMS.vashCalculator.description}`}
              className="mr-2 h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.wiki}
          icon={
            <Image
              src={NAV_ITEMS.wiki.icon}
              width={11}
              height={20}
              alt={`${NAV_ITEMS.wiki.label}, ${NAV_ITEMS.wiki.description}`}
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.r2ag}
          icon={
            <NAV_ITEMS.r2ag.icon
              className="h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />
      </div>
    </LandingPageContainer>
  )
}
