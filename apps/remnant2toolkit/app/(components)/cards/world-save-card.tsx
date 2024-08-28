import { BaseButton } from '@repo/ui';
import { getImageUrl } from '@repo/ui';
import { DownloadIcon } from '@repo/ui';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import { FilteredWorldSave } from '@/app/(components)/filters/world-saves/types';
import { getDownloadUrl } from '@/app/(components)/filters/world-saves/utils';
import { Tooltip } from '@/app/(components)/tooltip';
import { RELEASE_TO_NAME } from '@/app/(data)/releases/constants';
import { ALL_BOSS_AFFIXES } from '@/app/(data)/world-saves/constants';

interface Props {
  saveItem: FilteredWorldSave;
}

export function WorldSaveCard({ saveItem }: Props) {
  return (
    <div className="border-primary-700 flex w-[200px] max-w-[200px] flex-col items-center justify-center border-2">
      <Image
        src={getImageUrl(saveItem.imagePath)}
        alt={saveItem.bossName}
        width={200}
        height={200}
      />
      <div className="flex h-full w-full flex-col items-center justify-between gap-y-2 bg-gray-900 py-2">
        <div className="px-2">
          <h3 className="text-surface-solid mb-2 text-center text-lg font-bold">
            {saveItem.bossName}
          </h3>
          <div className="mb-2 flex items-center justify-center gap-x-2">
            {saveItem.bossAffixes.map((affix) => (
              <Tooltip
                key={`${uuidv4()}}`}
                content={
                  ALL_BOSS_AFFIXES.find(
                    (a) => a.name.toLowerCase() === affix.toLowerCase(),
                  )?.description
                }
              >
                <button className="bg-accent1-500 text-background-solid rounded-sm px-2 py-1 text-xs">
                  {affix}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
        <BaseButton
          color="cyan"
          href={getDownloadUrl(saveItem.bossName, saveItem.bossAffixes)}
        >
          <DownloadIcon className="h-5 w-5" />
          Download
        </BaseButton>
        <Tooltip
          content={`Using this save requires the ${
            RELEASE_TO_NAME[saveItem.release]
          } DLC.`}
        >
          <button className="rounded-sm px-1 py-0.5 text-xs text-gray-300">
            Requires {RELEASE_TO_NAME[saveItem.release]}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
