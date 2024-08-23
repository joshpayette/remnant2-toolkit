import { LandingPageCard } from '@/app/(components)/cards/landing-page-card'
import { LandingPageContainer } from '@/app/(components)/landing-page-container'
import { NAV_ITEMS } from '@/app/(types)/navigation'

export default async function Page() {
  return (
    <LandingPageContainer
      title="Toolkit Resources"
      description={
        <div className="mt-6 text-lg leading-8 text-gray-300">
          <p className="mt-6 text-lg leading-8 text-gray-300">
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
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.bossTracker}
          icon={
            <NAV_ITEMS.bossTracker.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.hardcoreVeteran}
          icon={
            <NAV_ITEMS.hardcoreVeteran.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.vashCalculator}
          icon={
            <NAV_ITEMS.vashCalculator.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.wiki}
          icon={
            <NAV_ITEMS.wiki.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.modding}
          icon={
            <NAV_ITEMS.modding.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.r2ag}
          icon={
            <NAV_ITEMS.r2ag.icon
              className="text-primary-500 h-7 w-7 flex-none"
              aria-hidden="true"
            />
          }
        />
      </div>
    </LandingPageContainer>
  )
}
