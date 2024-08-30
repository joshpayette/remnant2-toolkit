'use client';

import { BaseButton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import { DeleteBuildAlert } from '@/app/(components)/alerts/delete-build-alert';

interface Props {
  buildId: string;
}

export function DeleteBuildButton({ buildId }: Props) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const { handleDeleteBuild } = useBuildActions();

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
