import { BaseButton, cn, EyeIcon } from '@repo/ui';
import { usePathname, useRouter } from 'next/navigation';

import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

interface Props {
  collection: BuildCollectionWithBuilds;
}

export function BuildCollectionCard({ collection }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="divide-primary-800 border-primary-500 bg-background-solid col-span-1 flex flex-col divide-y rounded-lg border text-center shadow">
      <div className="flex flex-1 flex-col p-4 text-left">
        <h3 className={cn('text-md whitespace-pre-wrap font-medium')}>
          {collection.name}
        </h3>
        <div className="mt-0 flex flex-grow flex-col justify-start text-xs">
          <div className="text-xs text-gray-400">
            {collection.description || 'No collection description set.'}
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-between text-sm">
          # of Builds: {collection.builds.length}
        </div>
        <div className="mt-2 flex items-center justify-end gap-x-2 text-sm">
          <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
            <BaseButton
              plain
              aria-label="View Build Collection"
              onClick={() => router.push(`${pathname}/${collection.id}`)}
            >
              <div className="flex flex-col items-center justify-center text-cyan-500">
                <EyeIcon className="h-4 w-4" /> View
              </div>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}
