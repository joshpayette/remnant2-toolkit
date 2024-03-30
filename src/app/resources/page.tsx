import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

import { NAV_ITEMS } from '@/features/navigation/constants'

export default async function Page() {
  return (
    <div className="relative isolate w-full max-w-7xl overflow-hidden bg-gray-900 py-24">
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/resources-bg1.jpg`}
        alt="Resource page background"
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
      <div className="mx-auto grid w-full grid-cols-3 px-6 lg:px-8">
        <div className="col-span-full mx-auto max-w-2xl sm:mx-8 lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Remnant 2 Toolkit Resources
          </h1>
          <div className="mt-6 text-lg leading-8 text-gray-300">
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {NAV_ITEMS.resources.description}
            </p>
          </div>
        </div>
        <div className="col-span-full mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          <Link
            href={NAV_ITEMS.itemQuiz.href}
            key={NAV_ITEMS.itemQuiz.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <NAV_ITEMS.itemQuiz.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.itemQuiz.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.itemQuiz.description}
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
            href={NAV_ITEMS.worldSaveArchive.href}
            key={NAV_ITEMS.worldSaveArchive.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <NAV_ITEMS.worldSaveArchive.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.worldSaveArchive.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.worldSaveArchive.description}
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
            href={NAV_ITEMS.ampVsRes.href}
            key={NAV_ITEMS.ampVsRes.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <NAV_ITEMS.ampVsRes.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.ampVsRes.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.ampVsRes.description}
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
            href={NAV_ITEMS.hardcoreVeteran.href}
            key={NAV_ITEMS.hardcoreVeteran.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <NAV_ITEMS.hardcoreVeteran.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.hardcoreVeteran.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.hardcoreVeteran.description}
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
            href={NAV_ITEMS.enemyResistances.href}
            key={NAV_ITEMS.enemyResistances.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <NAV_ITEMS.enemyResistances.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.enemyResistances.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.enemyResistances.description}
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
            href={NAV_ITEMS.wiki.href}
            key={NAV_ITEMS.wiki.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <Image
              src={NAV_ITEMS.wiki.icon}
              width={11}
              height={20}
              alt={`${NAV_ITEMS.wiki.label}, ${NAV_ITEMS.wiki.description}`}
              className="mr-2 h-7 w-5 flex-none text-primary-600"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.wiki.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.wiki.description}
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
            href={NAV_ITEMS.r2ag.href}
            key={NAV_ITEMS.r2ag.label}
            className="flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-white/5 p-6 ring-1 ring-inset ring-white/10 hover:border-primary-500"
          >
            <NAV_ITEMS.r2ag.icon
              className="h-7 w-7 flex-none text-primary-500"
              aria-hidden="true"
            />
            <div className="relative w-full">
              <p className="text-lg font-bold leading-7">
                {NAV_ITEMS.r2ag.label}
              </p>
              <div className="mt-2 text-gray-300 ">
                {NAV_ITEMS.r2ag.description}
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
  )
}
