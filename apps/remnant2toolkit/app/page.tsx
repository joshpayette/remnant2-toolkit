import Image from 'next/image'

import { getTotalBuildCount } from '@/app/(actions)/builds/get-total-build-count'
import { Link } from '@/app/(components)/_base/link'
import { LandingPageCard } from '@/app/(components)/cards/landing-page-card'
import { LandingPageContainer } from '@/app/(components)/landing-page-container'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { getServerSession } from '@/app/(utils)/auth'

export default async function Page() {
  const session = await getServerSession()
  const totalBuildCount = await getTotalBuildCount()

  return (
    <LandingPageContainer
      title="Remnant 2 Toolkit"
      description={
        <>
          <div className="mt-6 text-lg leading-8 text-gray-300">
            <Link
              href="/community-builds"
              className="underline hover:text-primary-500"
            >
              Search the community&apos;s{' '}
              <span className="text-2xl font-bold text-primary-500">
                {totalBuildCount}
              </span>{' '}
              submitted builds
            </Link>
            ,{' '}
            <Link
              href={session?.user?.id ? '/builder/create' : '/builder'}
              className="underline hover:text-primary-500"
            >
              create your own builds
            </Link>
            ,{' '}
            <Link href="/tracker" className="underline hover:text-primary-500">
              track your collectibles
            </Link>
            , and more!
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            <span className="font-bold text-primary-500">100% free</span> and{' '}
            <span className="font-bold text-primary-500">open source</span>{' '}
            toolkit for Remnant 2. No ads, no tracking, no BS.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            <span className="font-bold text-primary-500">
              No login required
            </span>{' '}
            to start creating builds, searching community builds, tracking your
            collectibles, or searching for detailed item information.
          </p>
        </>
      }
    >
      <div className="mt-8 hidden sm:col-span-1 sm:mt-0 md:block">
        <LandingPageCard
          {...NAV_ITEMS.featuredBuilds}
          icon={
            <NAV_ITEMS.featuredBuilds.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />
        <LandingPageCard
          {...NAV_ITEMS.itemLookup}
          icon={
            <NAV_ITEMS.itemLookup.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />
      </div>
      <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        <div className="md:hidden">
          <LandingPageCard
            {...NAV_ITEMS.featuredBuilds}
            icon={
              <NAV_ITEMS.featuredBuilds.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
            }
          />
        </div>
        <LandingPageCard
          {...NAV_ITEMS.communityBuilds}
          icon={
            <NAV_ITEMS.communityBuilds.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />
        <div className="md:hidden">
          <LandingPageCard
            {...NAV_ITEMS.itemLookup}
            icon={
              <NAV_ITEMS.itemLookup.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
            }
          />
        </div>
        <LandingPageCard
          {...NAV_ITEMS.itemTracker}
          icon={
            <NAV_ITEMS.itemTracker.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.itemQuiz}
          icon={
            <NAV_ITEMS.itemQuiz.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.createBuild}
          icon={
            <NAV_ITEMS.createBuild.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        {session?.user?.id ? (
          <LandingPageCard
            {...NAV_ITEMS.loadouts}
            href={`/profile/${session?.user?.id}/loadouts?t=${Date.now()}`}
            icon={
              <NAV_ITEMS.loadouts.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
            }
          />
        ) : null}

        <LandingPageCard
          {...NAV_ITEMS.worldSaveArchive}
          icon={
            <NAV_ITEMS.worldSaveArchive.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.bossTracker}
          icon={
            <NAV_ITEMS.bossTracker.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.discordInvite}
          target="_blank"
          icon={
            <NAV_ITEMS.discordInvite.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.supportR2TK}
          icon={
            <NAV_ITEMS.supportR2TK.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.vashCalculator}
          icon={
            <NAV_ITEMS.vashCalculator.icon 
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />

        <LandingPageCard
          {...NAV_ITEMS.wiki}
          icon={
            <NAV_ITEMS.wiki.icon 
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
          }
        />
      </div>
    </LandingPageContainer>
  )
}
