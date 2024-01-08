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
import { pageInfo as sadderallsRichieRichPageInfo } from './build/sadderalls-richie-rich/metadata'
import { pageInfo as dotsrusLikesDotsPageInfo } from './build/dotsrus-likes-dots/metadata'
import { pageInfo as sheenShotsAcidicBerserkerPageInfo } from './build/sheenshots-acidic-berserker/metadata'
import { pageInfo as sheenShotsRageLoopPageInfo } from './build/sheenshots-rage-loop/metadata'
import { pageInfo as senorservezasRoninMeleePageInfo } from './build/senorcervezas-ronin-melee/metadata'
import { pageInfo as sheenShotsHotSwapperPageInfo } from './build/sheenshots-hot-swapper/metadata'
import { pageInfo as boltJamisonsFargazerMagePageInfo } from './build/bolt-jamisons-fargazer-mage/metadata'
import { pageInfo as sheenShotsCorruptedGuardianPageInfo } from './build/sheenshots-corrupted-guardian/metadata'
import { pageInfo as senorcervezasInciernaryKingPageInfo } from './build/senorcervezas-incendiary-king/metadata'
import { pageInfo as chaosGamingsTankualist } from './build/chaos-gamings-tankualist/metadata'

const builds = [
  senorcervezasInciernaryKingPageInfo,
  chaosGamingsTankualist,
  boltJamisonsFargazerMagePageInfo,
  dotsrusLikesDotsPageInfo,
  senorservezasRoninMeleePageInfo,
  dudleysEldritchKnightPageInfo,
  sheenShotsCorruptedGuardianPageInfo,
  sheenShotsHotSwapperPageInfo,
  sheenShotsRageLoopPageInfo,
  sadderallsRichieRichPageInfo,
  senorcervezasMemeBuildPageInfo,
  mrNachoCoopElementalPageInfo,
  boltJamisonsPyroPageInfo,
  boltJamisonsBleedCritPageInfo,
  senorcervezasBuffMasterPageInfo,
  senorcervezasGrayHealthPageInfo,
  senorcervezasBossMelterPageInfo,
  dudleysBloodHunterPageInfo,
  mrNachosNightfallBuildPageInfo,
  mrNachosEGGBuildPageInfo,
  sheenShotsAcidicBerserkerPageInfo,
  archonUnlockPageInfo,
  rootDoctorPageInfo,
  speedFarmingPageInfo,
] as PageInfo[]

export default function Page() {
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
            className="flex flex-col items-center justify-center gap-2 border border-purple-500 bg-black p-4"
          >
            <h2 className="text-center text-2xl">
              <Link
                href={`featured-builds/build/${build.slug}`}
                className=" font-bold text-purple-500 hover:text-purple-300 hover:underline"
              >
                {build.title}
              </Link>
            </h2>

            <div className="flex grow flex-col items-center gap-2 bg-black">
              {build.classes && (
                <p className="rounded-lg bg-black p-2 text-sm">
                  Classes:{' '}
                  <span className="text-green-500">
                    {build.classes?.map((c) => c).join(', ')}
                  </span>
                </p>
              )}
              <p className="text-md text-left text-gray-200">
                {build.description}
              </p>
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
