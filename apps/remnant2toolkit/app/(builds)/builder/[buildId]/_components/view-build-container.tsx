'use client';

import { useState } from 'react';

import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import { ViewBuild } from '@/app/(builds)/builder/[buildId]/_components/view-build';
import { TabbedBuildsDisplay } from '@/app/(builds)/builder/linked/_components/tabbed-builds-display';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

interface Props {
  buildVariants?: LinkedBuildItem[];
  mainBuildVariant: LinkedBuildItem;
}

export function ViewBuildContainer({ buildVariants, mainBuildVariant }: Props) {
  const [currentBuildVariant, setCurrentBuildVariant] =
    useState<LinkedBuildItem | null>(mainBuildVariant);

  const currentBuildState: BuildState = cleanUpBuildState(
    dbBuildToBuildState(currentBuildVariant?.build || mainBuildVariant.build),
  );

  return (
    <>
      {currentBuildVariant && (
        <TabbedBuildsDisplay
          activeBuild={currentBuildVariant}
          linkedBuild={{
            linkedBuilds: buildVariants || [],
          }}
          onChangeCurrentLinkedBuild={setCurrentBuildVariant}
          title="Build Variants"
        />
      )}
      <VideoThumbnail buildState={currentBuildState} />
      <ViewBuild buildState={currentBuildState} />
    </>
  );
}
