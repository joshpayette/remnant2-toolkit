import { NAV_ITEMS } from '@/app/(types)/navigation'
import { LandingPageCard } from '@/features/ui/LandingPageCard'
import { LandingPageContainer } from '@/features/ui/LandingPageContainer'

export default async function Page() {
  return (
    <LandingPageContainer
      bgClass="bg-background-container/60"
      image="support"
      title="Support the Toolkit"
      description={
        <div className="mt-6 text-lg leading-8 text-on-background">
          <p className="mt-6 text-lg leading-8 text-on-background">
            {NAV_ITEMS.supportR2TK.description}
          </p>
        </div>
      }
    >
      <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        <LandingPageCard
          label="Patreon"
          description="Support the Toolkit with a subscription on Patreon."
          href="https://www.patreon.com/JoshPayette/membership"
          target="_blank"
          icon={
            <NAV_ITEMS.supportR2TK.icon
              className="h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          label="Ko-Fi"
          description="Make a donation to support the Toolkit on Ko-Fi."
          href="https://ko-fi.com/remnant2toolkit"
          target="_blank"
          icon={
            <NAV_ITEMS.supportR2TK.icon
              className="h-7 w-7 flex-none text-primary"
              aria-hidden="true"
            />
          }
        />
      </div>
    </LandingPageContainer>
  )
}
