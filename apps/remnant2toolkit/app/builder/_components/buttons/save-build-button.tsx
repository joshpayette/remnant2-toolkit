'use client';

import { BaseButton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { createBuild } from '@/app/(builds)/_actions/create-build';
import { updateBuild } from '@/app/(builds)/_actions/update-build';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { isErrorResponse } from '@/app/(utils)/is-error-response';
import { LoadingButton } from '@/app/builder/_components/buttons/loading-button';

interface Props {
  buildState: BuildState;
  editMode: boolean;
}

export function SaveBuildButton({ buildState, editMode }: Props) {
  const router = useRouter();

  const [saveInProgress, setSaveInProgress] = useState(false);

  const { status } = useSession();

  if (status === 'loading') return <LoadingButton />;
  if (status === 'unauthenticated') {
    return (
      <BaseButton
        type="submit"
        className="sm:w-full"
        aria-label="Sign In to Save Build"
        color="red"
        onClick={() => signIn()}
      >
        Sign In to Save Build
      </BaseButton>
    );
  }

  function handleResponse(response: BuildActionResponse) {
    if (isErrorResponse(response)) {
      console.error(response.errors);
      toast.error(`Error saving build. ${response.errors?.join(' ')}`);
      setSaveInProgress(false);
    } else {
      toast.success(response.message);
      setSaveInProgress(false);
      router.push(`/builder/${response.buildId}`);
    }
  }

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return saveInProgress ? (
      <LoadingButton />
    ) : (
      <BaseButton
        color="green"
        aria-label="Save Edits"
        className="sm:w-full"
        onClick={async () => {
          setSaveInProgress(true);
          const response = await updateBuild(JSON.stringify(buildState));
          handleResponse(response);
        }}
      >
        Save Edits
      </BaseButton>
    );
  }

  return (
    <>
      {saveInProgress ? (
        <LoadingButton />
      ) : (
        <BaseButton
          color="green"
          aria-label="Save Build"
          className="sm:w-full"
          onClick={async () => {
            setSaveInProgress(true);
            const response = await createBuild(JSON.stringify(buildState));
            handleResponse(response);
          }}
        >
          Save Build
        </BaseButton>
      )}
    </>
  );
}
