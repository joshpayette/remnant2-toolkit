'use server';

import { BaseLink } from '@repo/ui';

import { NAV_ITEMS } from '../_constants/nav-items';
import { getTotalBuildCount } from '../(builds)/_actions/get-total-build-count';
import { getSession } from '../(user)/_auth/services/sessionService';

export async function LandingPageHeaderDescription() {
  const session = await getSession();
  const totalBuildCount = await getTotalBuildCount();

  return (
    <>
      <p className="text-lg leading-8 text-gray-300">
        <BaseLink
          href={NAV_ITEMS.communityBuilds.href}
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
          href={NAV_ITEMS.itemTracker.href}
          className="hover:text-primary-500 underline"
        >
          track your collectibles
        </BaseLink>
        , and more!
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        <span className="text-primary-500 font-bold">100% free</span> and{' '}
        <span className="text-primary-500 font-bold">open source</span> toolkit
        for Remnant 2. No ads, no tracking, no BS.
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        <span className="text-primary-500 font-bold">No login required</span> to
        start creating builds, searching community builds, tracking your
        collectibles, or searching for detailed item information.
      </p>
    </>
  );
}
