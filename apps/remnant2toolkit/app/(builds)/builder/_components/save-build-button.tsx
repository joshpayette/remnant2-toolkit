'use client';

import { BaseButton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import {
  createBuild,
  linkBuildVariants,
} from '@/app/(builds)/_actions/create-build';
import { updateBuild } from '@/app/(builds)/_actions/update-build';
import { type SuccessResponse } from '@/app/(builds)/_types/success-response';
import { LoadingButton } from '@/app/(builds)/builder/_components/loading-button';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

interface Props {
  buildVariants: LinkedBuildItem[];
  editMode: boolean;
}

export function SaveBuildButton({ buildVariants, editMode }: Props) {
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

  // function handleResponse(response: BuildActionResponse) {
  //   if (isErrorResponse(response)) {
  //     console.error(response.errors);
  //     toast.error(`Error saving build. ${response.errors?.join(' ')}`);
  //     setSaveInProgress(false);
  //     return;
  //   }

  //   toast.success(response.message);
  //   setSaveInProgress(false);
  //   router.push(`/builder/${response.buildId}`);
  // }

  if (saveInProgress) {
    return <LoadingButton />;
  }

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return (
      <BaseButton
        color="green"
        aria-label="Save Edits"
        className="sm:w-full"
        onClick={async () => {
          // TODO
          // setSaveInProgress(true);
          // const response = await updateBuild(JSON.stringify(buildState));
          // handleResponse(response);
        }}
      >
        Save Edits
      </BaseButton>
    );
  }

  // If the build is new, show a save button
  return (
    <BaseButton
      color="green"
      aria-label="Save Build"
      className="sm:w-full"
      onClick={async () => {
        setSaveInProgress(true);

        // Need to createBuild for each build variant,
        // then iterate over the responses

        const responses = await Promise.all(
          buildVariants.map((variant) => {
            return createBuild(JSON.stringify(variant.build));
          }),
        );

        // if any of the responses are errors, handle them
        if (responses.some(isErrorResponse)) {
          responses.forEach((response) => {
            if (isErrorResponse(response)) {
              console.error(response.errors);
              toast.error(`Error saving build. ${response.errors?.join(' ')}`);
              // remove the response from the array
              responses.splice(responses.indexOf(response), 1);
            }
          });
        }

        // all variants except the first need to be linked
        const variantResponses = responses.slice(1);
        const variantIds = variantResponses.map(
          (response) => (response as SuccessResponse).buildId as string,
        );

        const mainBuildId = (responses[0] as SuccessResponse).buildId as string;

        const _response = await linkBuildVariants({
          mainBuildId,
          variantIds,
        });

        toast.success('Build created successfully!');
        setSaveInProgress(false);
        router.push(`/builder/${mainBuildId}`);
      }}
    >
      Save Build
    </BaseButton>
  );
}
