'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TabbedBuildsDisplay } from '@/app/(builds)/_components/tabbed-builds-display';
import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import { ViewBuild } from '@/app/(builds)/builder/[buildId]/_components/view-build';

interface Props {
  buildVariants: BuildState[];
}

export function ViewBuildContainer({ buildVariants }: Props) {
  const router = useRouter();
  const mainBuildVariant = buildVariants[0];

  const [activeBuildVariant, setActiveBuildVariant] =
    useState(mainBuildVariant);

  if (!mainBuildVariant) {
    return null;
  }
  if (!activeBuildVariant) {
    return null;
  }

  return (
    <>
      <VideoThumbnail buildState={activeBuildVariant} />
      {buildVariants.length > 1 && (
        <TabbedBuildsDisplay
          activeBuild={activeBuildVariant}
          buildVariants={buildVariants}
          onChangeActiveBuild={setActiveBuildVariant}
          title="Build Variants"
        />
      )}
      <ViewBuild
        activeBuildState={activeBuildVariant}
        mainBuildState={mainBuildVariant}
        onDuplicateBuild={() =>
          handleDuplicateBuild({
            buildVariants,
            onDuplicate: (buildId: string) =>
              router.push(`/builder/${buildId}`),
          })
        }
      />
    </>
  );
}
