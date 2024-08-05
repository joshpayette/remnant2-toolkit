import { Link } from '@repo/ui/base/link'
import { BaseTextLink } from '@repo/ui/base/text'

import { getQualityBuildFeed } from '@/app/(actions)/builds/get-quality-build-feed'
import { getTotalBuildCount } from '@/app/(actions)/builds/get-total-build-count'
import { LandingPageCard } from '@/app/(components)/cards/landing-page-card'
import { LandingPageContainer } from '@/app/(components)/landing-page-container'
import { getSession } from '@/app/(features)/auth/services/sessionService'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { QualityBuildsFeed } from '@/app/quality-builds-feed'

export default async function Page() {
  const session = await getSession()

  const [totalBuildCount, qualityBuilds] = await Promise.all([
    getTotalBuildCount(),
    getQualityBuildFeed(),
  ])

  return (
    <>
      <LandingPageContainer
        title="Remnant 2 Toolkit"
        description={
          <>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              <Link
                href="/community-builds"
                className="hover:text-primary-500 underline"
              >
                Search the community&apos;s{' '}
                <span className="text-primary-500 text-2xl font-bold">
                  {totalBuildCount}
                </span>{' '}
                submitted builds
              </Link>
              ,{' '}
              <Link
                href={session?.user?.id ? '/builder/create' : '/builder'}
                className="hover:text-primary-500 underline"
              >
                create your own builds
              </Link>
              ,{' '}
              <Link
                href="/tracker"
                className="hover:text-primary-500 underline"
              >
                track your collectibles
              </Link>
              , and more!
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              <span className="text-primary-500 font-bold">100% free</span> and{' '}
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
            <p className="mt-6 text-lg leading-8">
              <BaseTextLink
                href="https://patreon.com/JoshPayette"
                target="_blank"
              >
                <span className="text-accent1-400">
                  Click here to read the recent updates and changes to the
                  toolkit.
                </span>
              </BaseTextLink>
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
        <div className="col-span-full mt-8 hidden w-full sm:mt-0 md:block">
          <QualityBuildsFeed
            builds={qualityBuilds.builds}
            userId={session?.user?.id}
          />
        </div>
        <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
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
          <div className="md:hidden">
            <QualityBuildsFeed
              userId={session?.user?.id}
              builds={qualityBuilds.builds}
            />
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
    </>
  )
}
