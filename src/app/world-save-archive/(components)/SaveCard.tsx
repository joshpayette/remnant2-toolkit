import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

import { getDownloadUrl } from '@/app/world-save-archive/(lib)/getDownloadUrl'
import { BOSS_AFFIXES } from '@/app/world-save-archive/constants'
import { FilteredSave } from '@/app/world-save-archive/types'
import { Tooltip } from '@/features/ui/Tooltip'

interface Props {
  saveItem: FilteredSave
}

export function SaveCard({ saveItem }: Props) {
  return (
    <div className="flex w-[200px] max-w-[200px] flex-col items-center justify-center border-2 border-primary-700">
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${saveItem.imagePath}`}
        alt={saveItem.bossName}
        width={200}
        height={200}
      />
      <div className="flex h-full w-full flex-col items-center justify-between gap-y-2 bg-gray-900 py-2">
        <div className="px-2">
          <h3 className="mb-2 text-center text-lg font-bold text-white">
            {saveItem.bossName}
          </h3>
          <div className="mb-4 flex items-center justify-center gap-x-2">
            {saveItem.bossAffixes.map((affix) => (
              <Tooltip
                key={`${uuidv4()}}`}
                content={
                  BOSS_AFFIXES.find(
                    (a) => a.name.toLowerCase() === affix.toLowerCase(),
                  )?.description
                }
              >
                <button className="rounded-sm bg-accent1-500 px-2 py-1 text-xs text-black">
                  {affix}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
        <Link
          href={getDownloadUrl(saveItem.bossName, saveItem.bossAffixes)}
          className="flex items-center justify-center gap-x-1 rounded-md bg-primary-500 px-2 py-1 font-bold text-black hover:underline"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download
        </Link>
      </div>
    </div>
  )
}
