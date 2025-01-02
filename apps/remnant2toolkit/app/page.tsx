import { BaseLink, getImageUrl, LeaderBoard, Skeleton } from '@repo/ui';
import Image from 'next/image';
import { Suspense } from 'react';

import { getFavoritesLeaderboard } from '@/app/_components/get-favorites-leaderboard';
import { LandingPageCard } from '@/app/_components/landing-page-card';
import { LandingPageCardDisabled } from '@/app/_components/landing-page-card-disabled';
import { LandingPageContainer } from '@/app/_components/landing-page-container';
import { NAV_ITEMS } from '@/app/_constants/nav-items';
import { QualityBuildFeed } from '@/app/(builds)/_components/quality-build-feed';
import { getLeaderBoard as getItemQuizLeaderBoard } from '@/app/(items)/item-quiz/_actions/get-leader-board';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { LandingPageHeaderDescription } from './_components/landing-page-header-description';
import { GenesisCodeDisplay } from './(features)/_genesis-code/_components/genesis-code-display';

export default async function Page() {
  const session = await getSession();

  return (
    <div className="grid grid-cols-4 gap-x-4">
      <div className="col-span-full w-full xl:col-span-3">
        <LandingPageContainer
          description={
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <LandingPageHeaderDescription />
            </Suspense>
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

          <div id="genesis" className="col-span-full mt-8 w-full">
            <GenesisCodeDisplay />
          </div>
          <div className="col-span-full mt-8 hidden w-full md:block">
            <QualityBuildFeed />
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
              <QualityBuildFeed />
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
            ) : (
              <LandingPageCardDisabled
                {...NAV_ITEMS.loadouts}
                disabledReason="An account is required to use the Loadouts feature."
                icon={
                  <NAV_ITEMS.loadouts.icon
                    className="text-primary-500 h-7 w-7 flex-none"
                    aria-hidden="true"
                  />
                }
              />
            )}

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
              {...NAV_ITEMS.wiki}
              icon={
                <NAV_ITEMS.wiki.icon
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
              {...NAV_ITEMS.supportR2TK}
              icon={
                <NAV_ITEMS.supportR2TK.icon
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
              {...NAV_ITEMS.discordInvite}
              target="_blank"
              icon={null}
            />
          </div>
        </LandingPageContainer>
      </div>
      <div className="col-span-full mt-8 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10 xl:col-span-1 xl:mt-0 xl:flex xl:flex-col xl:items-center xl:justify-start xl:gap-x-0 xl:gap-y-10">
        <div className="xl:order-2">
          <LeaderBoard
            fetchAction={getFavoritesLeaderboard}
            headerLink="/community-builds"
            itemCount={10}
            title="Top Favorite Counts"
          />
        </div>
        <div className="xl:order-3">
          <LeaderBoard
            fetchAction={getItemQuizLeaderBoard}
            headerLink="/item-quiz"
            itemCount={10}
            title="Top Item Quiz Scores"
          />
        </div>
        <div className="col-span-full flex w-full flex-col items-center justify-start md:col-span-1">
          <h3 className="text-primary-500 mb-4 text-xl font-bold">
            Latest Post
          </h3>
          <BaseLink
            href="https://www.patreon.com/posts/one-year-118154393?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
            target="_blank"
          >
            <Image
              src={getImageUrl('/patreon-posts/2024-12-17.png')}
              width={253}
              height={450}
              alt="One-year anniversary + Giveaway!"
            />
          </BaseLink>
        </div>
      </div>
    </div>
  );
}
