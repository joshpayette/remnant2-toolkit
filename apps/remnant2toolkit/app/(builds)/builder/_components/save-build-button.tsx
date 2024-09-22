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
import { type UpdateBuildCategory } from '@/app/(builds)/_libs/update-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type SuccessResponse } from '@/app/(builds)/_types/success-response';
import { LoadingButton } from '@/app/(builds)/builder/_components/loading-button';
import { sendWebhook } from '@/app/(user)/_auth/moderation/send-webhook';

import { deleteBuildVariants } from '../../_actions/delete-build-variants';

type Props = {
  buildVariants: BuildState[];
} & (
  | {
      editMode: boolean;
      areVariantsAddedOrDeleted: boolean;
      variantChanges: Array<{
        category: UpdateBuildCategory;
        buildId: string;
      }>;
    }
  | {
      editMode?: never;
      areVariantsAddedOrDeleted?: never;
      variantChanges?: never;
    }
);

export function SaveBuildButton({
  buildVariants,
  editMode,
  areVariantsAddedOrDeleted,
  variantChanges,
}: Props) {
  const router = useRouter();

  const [saveInProgress, setSaveInProgress] = useState(false);

  const { status } = useSession();

  if (status === 'loading') return <LoadingButton />;
  if (status === 'unauthenticated') {
    return (
      <BaseButton
        type="submit"
        className="lg:w-full"
        aria-label="Sign In to Save Build"
        color="red"
        onClick={() => signIn()}
      >
        Sign In to Save Build
      </BaseButton>
    );
  }

  if (saveInProgress) {
    return <LoadingButton />;
  }

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return (
      <BaseButton
        color="green"
        aria-label="Save Edits"
        className="lg:w-full"
        onClick={async () => {
          if (
            !buildVariants ||
            buildVariants.length === 0 ||
            !buildVariants[0]
          ) {
            console.error('Error saving edits. Build variants not found.');
            toast.error('Error saving edits. Please try again later.');
            return;
          }

          setSaveInProgress(true);

          // Update the main build and create the new build variants
          const mainBuildState = buildVariants[0];
          const variantStates = buildVariants
            .slice(1)
            .map((variant) => variant);

          if (!mainBuildState.buildId) {
            console.error('Error saving edits. Build ID not found.');
            toast.error('Error saving edits. Please try again later.');
            return;
          }

          // Delete all build variants except the first one
          const _deleteVariantsResponse = await deleteBuildVariants(
            mainBuildState.buildId,
          );

          // Update the main build, recreate the variants
          const responses = await Promise.all([
            updateBuild(JSON.stringify(mainBuildState)),
            ...variantStates.map((variant) =>
              createBuild(JSON.stringify(variant), false),
            ),
          ]);
          // Flatten the array of responses
          const flatResponses = responses.flat();

          // if any of the responses are errors, handle them
          if (flatResponses.some(isErrorResponse)) {
            flatResponses.forEach((response) => {
              if (isErrorResponse(response)) {
                console.error(response.errors);
                toast.error(
                  `Error saving build. ${response.errors?.join(' ')}`,
                );
                // remove the response from the array
                flatResponses.splice(flatResponses.indexOf(response), 1);
              }
            });
          }

          // all variants except the first need to be linked
          const variantResponses = flatResponses.slice(1);
          const variantIds = variantResponses.map(
            (response) => (response as SuccessResponse).buildId as string,
          );

          const mainBuildId = (responses[0] as SuccessResponse)
            .buildId as string;

          const _response = await linkBuildVariants({
            mainBuildId,
            variantIds,
          });

          if (areVariantsAddedOrDeleted) {
            await sendWebhook({
              webhook: 'modQueue',
              params: {
                embeds: [
                  {
                    title: `Build variants added or deleted for ${mainBuildState.name}`,
                    color: 0x00ff00,
                    fields: [
                      {
                        name: 'Build Link',
                        value: `https://remnant2toolkit.com/builder/${
                          mainBuildState.buildId
                        }?t=${Date.now()}`,
                      },
                    ],
                  },
                ],
              },
            });
          } else {
            const fields: Array<{ name: string; value: string }> = [];
            for (const change of variantChanges) {
              const buildName = buildVariants.find(
                (variant) => variant.buildId === change.buildId,
              )?.name;
              if (buildName) {
                fields.push({
                  name: `Updates to ${change.category}`,
                  value: buildName,
                });
              }
            }
            // add field to the start of the array with the build link
            fields.unshift({
              name: 'Build Link',
              value: `https://remnant2toolkit.com/builder/${
                mainBuildState.buildId
              }?t=${Date.now()}`,
            });

            if (fields.length > 1) {
              await sendWebhook({
                webhook: 'modQueue',
                params: {
                  embeds: [
                    {
                      title: `Build variants updated for ${mainBuildState.name}`,
                      color: 0x00ff00,
                      fields,
                    },
                  ],
                },
              });
            }
          }

          toast.success('Build updated successfully!');
          setSaveInProgress(false);
          router.push(`/builder/${mainBuildId}`);
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
      className="lg:w-full"
      onClick={async () => {
        setSaveInProgress(true);

        // Need to createBuild for each build variant,
        // then iterate over the responses

        const responses = await Promise.all(
          buildVariants.map((variant, index) => {
            // only enable notifications for the first created build
            return createBuild(JSON.stringify(variant), index === 0);
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
