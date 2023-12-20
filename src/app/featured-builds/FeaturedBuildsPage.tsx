import Link from 'next/link'
import PageHeader from '../(components)/PageHeader'
import { type PageInfo } from '../(types)'
import { pageInfo as boltJamisonsPyroPageInfo } from './build/bolt-jamisons-pyro/metadata'
import { pageInfo as rootDoctorPageInfo } from './build/root-doctor/metadata'
import { pageInfo as speedFarmingPageInfo } from './build/speed-farming/metadata'
import { pageInfo as boltJamisonsBleedCritPageInfo } from './build/bolt-jamisons-bleed-crit/metadata'
import { pageInfo as mrNachosNightfallBuildPageInfo } from './build/mr-nachos-nightfall-build/metadata'
import { pageInfo as mrNachosEGGBuildPageInfo } from './build/mr-nachos-egg-build/metadata'
import { pageInfo as dudleysBloodHunterPageInfo } from './build/dudleys-blood-hunter/metadata'
import { pageInfo as dudleysEldritchKnightPageInfo } from './build/dudleys-eldritch-knight/metadata'
import { pageInfo as senorcervezasBossMelterPageInfo } from './build/senorcervezas-boss-melter/metadata'
import { pageInfo as senorcervezasGrayHealthPageInfo } from './build/senorcervezas-easy-mode-gray-health/metadata'
import { pageInfo as senorcervezasBuffMasterPageInfo } from './build/senorcervezas_buff_master_support/metadata'
import { pageInfo as archonUnlockPageInfo } from './build/archon-unlock/metadata'
import { pageInfo as mrNachoCoopElementalPageInfo } from './build/mr-nacho-senorcerveza-coop-elemental-dots/metadata'
import { pageInfo as senorcervezasMemeBuildPageInfo } from './build/senorcervezas-160k-dps-meme/metadata'

const builds = [
  senorcervezasMemeBuildPageInfo,
  mrNachoCoopElementalPageInfo,
  senorcervezasBuffMasterPageInfo,
  senorcervezasGrayHealthPageInfo,
  senorcervezasBossMelterPageInfo,
  dudleysEldritchKnightPageInfo,
  dudleysBloodHunterPageInfo,
  mrNachosNightfallBuildPageInfo,
  mrNachosEGGBuildPageInfo,
  boltJamisonsBleedCritPageInfo,
  boltJamisonsPyroPageInfo,
  archonUnlockPageInfo,
  rootDoctorPageInfo,
  speedFarmingPageInfo,
] as PageInfo[]

export default function FeaturedBuildsPage() {
  return (
    <>
      <PageHeader
        title="Featured Builds"
        subtitle="A collection of builds aggregated from various sources."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {builds.map((build) => (
          <div
            key={build.slug}
            className="flex flex-col items-center justify-center gap-2 border border-purple-500 p-4"
          >
            <h2 className="text-center text-2xl">
              <Link
                href={`featured-builds/build/${build.slug}`}
                className=" font-bold text-purple-500 hover:text-purple-300 hover:underline"
              >
                {build.title}
              </Link>
            </h2>

            <div className="flex grow flex-col items-center gap-2">
              {build.classes && (
                <p className="rounded-lg bg-black p-2 text-sm">
                  Classes:{' '}
                  <span className="text-green-500">
                    {build.classes?.map((c) => c).join(', ')}
                  </span>
                </p>
              )}
              <p className="text-md text-gray-100">{build.description}</p>
            </div>

            <Link
              href={`featured-builds/build/${build.slug}`}
              className="w-full font-bold text-green-500 hover:text-green-300 hover:underline"
            >
              View Build
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
