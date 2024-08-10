import { BaseLink } from '@repo/ui/base/link'
import { LeaderBoard } from '@repo/ui/leader-board/components'
import { getImageUrl } from '@repo/ui/utils/get-image-url'
import Image from 'next/image'

import { LandingPageCard } from '@/app/(components)/cards/landing-page-card'
import { LandingPageContainer } from '@/app/(components)/landing-page-container'
import { getSession } from '@/app/(features)/auth/services/sessionService'
import { getQualityBuildFeed } from '@/app/(features)/builds/actions/get-quality-build-feed'
import { getTotalBuildCount } from '@/app/(features)/builds/actions/get-total-build-count'
import { getLeaderBoard as getItemQuizLeaderBoard } from '@/app/(features)/item-quiz/actions/get-leader-board'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { getFavoritesLeaderboard } from '@/app/get-favorites-leaderboard'
import { QualityBuildsFeed } from '@/app/quality-builds-feed'

export default async function Page() {
  const session = await getSession()

  const [totalBuildCount, qualityBuilds] = await Promise.all([
    getTotalBuildCount(),
    getQualityBuildFeed(),
  ])

  return (
    <div className="grid w-full grid-cols-4 gap-x-4">
      <div className="col-span-full w-full xl:col-span-3">
        <LandingPageContainer
          title="Remnant 2 Toolkit"
          description={
            <>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                <BaseLink
                  href="/community-builds"
                  className="hover:text-primary-500 underline"
                >
                  Search the community&apos;s{' '}
                  <span className="text-primary-500 text-2xl font-bold">
                    {totalBuildCount}
                  </span>{' '}
                  submitted builds
                </BaseLink>
                ,{' '}
                <BaseLink
                  href={session?.user?.id ? '/builder/create' : '/builder'}
                  className="hover:text-primary-500 underline"
                >
                  create your own builds
                </BaseLink>
                ,{' '}
                <BaseLink
                  href="/tracker"
                  className="hover:text-primary-500 underline"
                >
                  track your collectibles
                </BaseLink>
                , and more!
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                <span className="text-primary-500 font-bold">100% free</span>{' '}
                and{' '}
                <span className="text-primary-500 font-bold">open source</span>{' '}
                toolkit for Remnant 2. No ads, no tracking, no BS.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                <span className="text-primary-500 font-bold">
                  No login required
                </span>{' '}
                to start creating builds, searching community builds, tracking
                your collectibles, or searching for detailed item information.
              </p>
            </>
          }
        >
          <div className="mt-8 hidden sm:col-span-1 sm:mt-0 md:block">
            <LandingPageCard
              {...NAV_ITEMS.featuredBuilds}
              icon={
                <NAV_ITEMS.featuredBuilds.icon
                  className="text-primary-500 h-7 w-7 flex-none"
                  aria-hidden="true"
                />
              }
            />
            <LandingPageCard
              {...NAV_ITEMS.itemLookup}
              icon={
                <NAV_ITEMS.itemLookup.icon
                  className="text-primary-500 h-7 w-7 flex-none"
                  aria-hidden="true"
                />
              }
            />
          </div>
          <div className="col-span-full mt-8 hidden w-full md:block">
            <QualityBuildsFeed builds={qualityBuilds.builds} />
          </div>
          <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            <div className="md:hidden">
              <LandingPageCard
                {...NAV_ITEMS.featuredBuilds}
                icon={
                  <NAV_ITEMS.featuredBuilds.icon
                    className="text-primary-500 h-7 w-7 flex-none"
                    aria-hidden="true"
                  />
                }
              />
            </div>
            <LandingPageCard
              {...NAV_ITEMS.communityBuilds}
              icon={
                <NAV_ITEMS.communityBuilds.icon
                  className="text-primary-500 h-7 w-7 flex-none"
                  aria-hidden="true"
                />
              }
            />
            <div className="col-span-full md:hidden">
              <QualityBuildsFeed builds={qualityBuilds.builds} />
            </div>
            <div className="md:hidden">
              <LandingPageCard
                {...NAV_ITEMS.itemLookup}
                icon={
                  <NAV_ITEMS.itemLookup.icon
                    className="text-primary-500 h-7 w-7 flex-none"
                    aria-hidden="true"
                  />
                }
              />
            </div>
            <LandingPageCard
              {...NAV_ITEMS.itemTracker}
              icon={
                <NAV_ITEMS.itemTracker.icon
                  className="text-primary-500 h-7 w-7 flex-none"
                  aria-hidden="true"
                />
              }
            />

            <LandingPageCard
              {...NAV_ITEMS.itemQuiz}
              icon={
                <NAV_ITEMS.itemQuiz.icon
                  className="text-primary-500 h-7 w-7 flex-none"
                  aria-hidden="true"
                />
              }
            />

            <LandingPageCard
              {...NAV_ITEMS.createBuild}
              icon={
                <NAV_ITEMS.createBuild.icon
                  className="text-primary-500 h-7 w-7 flex-none"
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
                    className="text-primary-500 h-7 w-7 flex-none"
                    aria-hidden="true"
                  />
                }
              />
            ) : null}

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
              {...NAV_ITEMS.discordInvite}
              target="_blank"
              icon={
                <NAV_ITEMS.discordInvite.icon
                  className="text-primary-500 h-7 w-7 flex-none"
                  aria-hidden="true"
                />
              }
            />

            <LandingPageCard
              {...NAV_ITEMS.supportR2TK}
              icon={
                <NAV_ITEMS.supportR2TK.icon
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
          </div>
        </LandingPageContainer>
      </div>
      <div className="col-span-full mt-8 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10 xl:col-span-1 xl:mt-0 xl:flex xl:flex-col xl:items-center xl:justify-start xl:gap-x-0 xl:gap-y-10">
        <LeaderBoard
          fetchAction={getFavoritesLeaderboard}
          itemCount={10}
          title="Top Favorite Counts"
        />
        <LeaderBoard
          fetchAction={getItemQuizLeaderBoard}
          itemCount={10}
          title="Top Item Quiz Scores"
        />
        <div className="col-span-full flex w-full flex-col items-center justify-start md:col-span-1">
          <h3 className="text-primary-500 mb-4 text-xl font-bold">
            Latest Patreon Post
          </h3>
          <BaseLink
            href="https://www.patreon.com/posts/final-dlc-plus-109411608"
            target="_blank"
          >
            <Image
              src={getImageUrl('remnant2/patreon-posts/2024-08-03.jpg')}
              width={253}
              height={450}
              alt="First DLC announced, plus some Toolkit updates!"
            />
          </BaseLink>
        </div>
      </div>
    </div>
  )
}
