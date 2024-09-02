'use client';

import { BaseButton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { DeleteBuildAlert } from '@/app/(builds)/_components/delete-build-alert';
import { handleDeleteBuild } from '@/app/(builds)/_libs/handlers/handle-delete-build';

interface Props {
  buildId: string;
}

export function DeleteBuildButton({ buildId }: Props) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <DeleteBuildAlert
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onDelete={async () => {
          setDeleteAlertOpen(false);
          await handleDeleteBuild({ buildId });
          if (session?.user?.id) {
            router.push(`/profile/${session.user.id}/created-builds`);
          }
        }}
      />
      <BaseButton
        color="red"
        aria-label="Delete build."
        onClick={() => setDeleteAlertOpen(true)}
        className="sm:w-full"
      >
        Delete Build
      </BaseButton>
    </>
  );
}
