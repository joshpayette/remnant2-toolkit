import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

import { getServerSession } from '@/features/auth/lib'
import { getTotalBuildCount } from '@/features/build/actions/getTotalBuildCount'
import { NAV_ITEMS } from '@/features/navigation/constants'

export default async function Page() {
  const session = await getServerSession()
  const totalBuildCount = await getTotalBuildCount()

  return (
    <>
      <div className="relative isolate w-full max-w-7xl overflow-hidden bg-gray-900 py-24">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/home-bg.webp`}
          alt="Home page background"
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
          loading="eager"
        />
        <div className="absolute left-0 top-0 -z-[5] h-full w-full bg-black/80" />
        <div className="sm:transform-g1 hidden w-full sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:blur-3xl">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#9646ff] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#9646ff] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto w-full px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Remnant 2 Toolkit
            </h1>
            <div className="mt-6 text-lg leading-8 text-gray-300">
              <Link
                href="/community-builds"
                className="hover:text-primary-500 hover:underline"
              >
                Search the community&apos;s{' '}
                <span className="text-2xl font-bold text-primary-500">
                  {totalBuildCount}
                </span>{' '}
                submitted builds
              </Link>
              ,{' '}
              <Link
                href="/builder"
                className="hover:text-primary-500 hover:underline"
              >
                create your own builds
              </Link>
              ,{' '}
              <Link
                href="/tracker"
                className="hover:text-primary-500 hover:underline"
              >
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
              to start creating builds, searching community builds, tracking
              your collectibles, or searching for detailed item information.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            <Link
              href={NAV_ITEMS.createBuild.href}
              key={NAV_ITEMS.createBuild.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.createBuild.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.createBuild.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.createBuild.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.featuredBuilds.href}
              key={NAV_ITEMS.featuredBuilds.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.featuredBuilds.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.featuredBuilds.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.featuredBuilds.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.communityBuilds.href}
              key={NAV_ITEMS.communityBuilds.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.communityBuilds.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.communityBuilds.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.communityBuilds.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={`/profile/${session?.user?.id}/loadouts`}
              key={NAV_ITEMS.loadouts.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.loadouts.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.loadouts.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.loadouts.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.itemTracker.href}
              key={NAV_ITEMS.itemTracker.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.itemTracker.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.itemTracker.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.itemTracker.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.bossTracker.href}
              key={NAV_ITEMS.bossTracker.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.bossTracker.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.bossTracker.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.bossTracker.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.itemLookup.href}
              key={NAV_ITEMS.itemLookup.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.itemLookup.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.itemLookup.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.itemLookup.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.supportR2TK.href}
              key={NAV_ITEMS.supportR2TK.label}
              className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.supportR2TK.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.supportR2TK.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.supportR2TK.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={NAV_ITEMS.changeLog.href}
              key={NAV_ITEMS.changeLog.label}
              className="flex min-h-[200px] w-full flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
            >
              <NAV_ITEMS.changeLog.icon
                className="h-7 w-7 flex-none text-primary-500"
                aria-hidden="true"
              />
              <div className="relative w-full">
                <p className="text-lg font-bold leading-7">
                  {NAV_ITEMS.changeLog.label}
                </p>
                <div className="mt-2 text-gray-300 ">
                  {NAV_ITEMS.changeLog.description}
                </div>
                <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
                  <ArrowRightIcon
                    className="h-6 w-6 text-primary-500 hover:text-primary-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
