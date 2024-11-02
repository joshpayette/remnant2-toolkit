'use client';

import { BaseButton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { createBuild } from '@/app/(builds)/_actions/create-build';
import { updateBuild } from '@/app/(builds)/_actions/update-build';
import { QualityBuildCheckDialog } from '@/app/(builds)/_components/quality-build-check-dialog';
import { isBuildQualityBuild } from '@/app/(builds)/_libs/is-build-quality-build';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { LoadingButton } from '@/app/(builds)/builder/_components/loading-button';

interface Props {
  buildVariants: BuildState[];
  editMode: boolean;
}

export function SaveBuildButton({ buildVariants, editMode }: Props) {
  const router = useRouter();
  const [saveInProgress, setSaveInProgress] = useState(false);
  const { status } = useSession();

  const [isQualityDialogOpen, setIsQualityDialogOpen] = useState(false);

  async function saveBuild() {
    setSaveInProgress(true);

    const createBuildResponse = await createBuild({
      buildVariantsStringified: buildVariants.map((variant) => {
        const anyVariantIsPrivate = buildVariants.some(
          (variant) => !variant.isPublic,
        );
        if (anyVariantIsPrivate) {
          variant.isPublic = false;
        }
        return JSON.stringify(variant);
      }),
    });

    if (isErrorResponse(createBuildResponse)) {
      console.error(createBuildResponse.errors);
      toast.error(
        `Error saving build. ${createBuildResponse.errors?.join(' ')}`,
      );
      setSaveInProgress(false);
      return;
    }

    if (!createBuildResponse.buildId) {
      console.error('Error saving build. Build ID not found.');
      toast.error('Error saving build. Please try again later.');
      setSaveInProgress(false);
      return;
    }

    toast.success('Build created successfully!');
    setSaveInProgress(false);
    router.push(`/builder/${createBuildResponse.buildId}`);
  }

  async function saveBuildEdits() {
    if (!buildVariants || buildVariants.length === 0 || !buildVariants[0]) {
      console.error('Error saving edits. Build variants not found.');
      toast.error('Error saving edits. Please try again later.');
      return;
    }

    setSaveInProgress(true);

    const updateBuildResponse = await updateBuild({
      buildVariantsStringified: buildVariants.map((variant) => {
        const hasBuildLink = Boolean(variant.buildLink);
        if (!hasBuildLink) {
          variant.videoUrl = '';
        }
        const isAnyVariantPrivate = buildVariants.some(
          (variant) => !variant.isPublic,
        );
        if (isAnyVariantPrivate) {
          variant.isPublic = false;
        }
        return JSON.stringify(variant);
      }),
    });

    if (isErrorResponse(updateBuildResponse)) {
      console.error(updateBuildResponse.errors);
      toast.error(
        `Error saving edits. ${updateBuildResponse.errors?.join(' ')}`,
      );
      setSaveInProgress(false);
      return;
    }

    if (!updateBuildResponse.buildId) {
      console.error('Error saving edits. Build ID not found.');
      toast.error('Error saving edits. Please try again later.');
      setSaveInProgress(false);
      return;
    }

    toast.success('Build updated successfully!');
    setSaveInProgress(false);
    router.push(`/builder/${updateBuildResponse.buildId}`);
  }

  function handleCloseQualityDialog(
    action: 'save' | 'edit',
    buildType: 'new' | 'update',
  ) {
    if (action === 'save') {
      if (buildType === 'new') {
        saveBuild();
      } else {
        saveBuildEdits();
      }
    }
    setIsQualityDialogOpen(false);
  }

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

  const mainBuild = buildVariants[0];
  const qualityCheckResults = mainBuild ? isBuildQualityBuild(mainBuild) : [];
  const shouldShowQualityDialog =
    qualityCheckResults.length > 0 && mainBuild && mainBuild.isPublic;

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return (
      <>
        <QualityBuildCheckDialog
          open={isQualityDialogOpen}
          qualityBuildCheckResults={qualityCheckResults}
          onClose={(action) => handleCloseQualityDialog(action, 'update')}
        />
        <BaseButton
          color="green"
          aria-label="Save Edits"
          className="lg:w-full"
          onClick={
            shouldShowQualityDialog
              ? () => setIsQualityDialogOpen(true)
              : saveBuildEdits
          }
        >
          Save Edits
        </BaseButton>
      </>
    );
  }

  // If the build is new, show a save button
  return (
    <>
      <QualityBuildCheckDialog
        open={isQualityDialogOpen}
        qualityBuildCheckResults={qualityCheckResults}
        onClose={(action) => handleCloseQualityDialog(action, 'new')}
      />
      <BaseButton
        color="green"
        aria-label="Save Build"
        className="lg:w-full"
        onClick={
          shouldShowQualityDialog
            ? () => setIsQualityDialogOpen(true)
            : saveBuild
        }
      >
        Save Build
      </BaseButton>
    </>
  );
}
