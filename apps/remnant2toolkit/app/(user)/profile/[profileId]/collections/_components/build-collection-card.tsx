import { BaseButton, cn, EditIcon, EyeIcon, Tooltip } from '@repo/ui';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { deleteBuildCollection } from '@/app/(user)/profile/[profileId]/collections/_actions/delete-build-collection';
import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

interface Props {
  collection: BuildCollectionWithBuilds;
  isEditable: boolean;
}

export function BuildCollectionCard({ collection, isEditable }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // TODO Prompt for confirmation first
  async function handleDeleteCollection(collectionId: string) {
    const response = await deleteBuildCollection(collectionId);
    if (isErrorResponse(response)) {
      toast.error('Failed to delete build collection');
      console.error(response.errors);
      return;
    }
    toast.success('Build collection deleted');
  }

  return (
    <div className="divide-primary-800 border-primary-500 bg-background-solid col-span-1 flex flex-col divide-y rounded-lg border text-center shadow">
      <div className="flex flex-1 flex-col p-4 text-left">
        <h3 className={cn('text-md whitespace-pre-wrap font-medium')}>
          {collection.name}
        </h3>
        <div className="mt-0 flex flex-grow flex-col justify-start text-xs">
          <div className="text-xs text-gray-400">{collection.description}</div>
        </div>
        <div className="mt-4 flex flex-row justify-between">
          # of Builds: {collection.builds.length}
        </div>
        <div className="mt-2 flex items-center justify-end gap-x-2 text-sm">
          <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
            <Tooltip content="View Build Collection">
              <BaseButton
                plain
                aria-label="View Build Collection"
                onClick={() => router.push(`${pathname}/${collection.id}`)}
              >
                <div className="flex flex-col items-center justify-center text-cyan-500">
                  <EyeIcon className="h-4 w-4" /> View
                </div>
              </BaseButton>
            </Tooltip>
            {isEditable && (
              <>
                <Tooltip content="Edit Build Collection">
                  <BaseButton
                    plain
                    onClick={() =>
                      router.push(`${pathname}/${collection.id}/edit`)
                    }
                    aria-label="Edit Build"
                  >
                    <div className="text-accent1-500 flex flex-col items-center justify-center">
                      <EditIcon className="h-4 w-4" /> Edit
                    </div>
                  </BaseButton>
                </Tooltip>
                <Tooltip content="Delete Build Collection">
                  <BaseButton
                    plain
                    aria-label="Delete Build Collection"
                    onClick={() => handleDeleteCollection(collection.id)}
                  >
                    <div className="flex flex-col items-center justify-center text-red-500">
                      <EyeIcon className="h-4 w-4" /> Delete
                    </div>
                  </BaseButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
