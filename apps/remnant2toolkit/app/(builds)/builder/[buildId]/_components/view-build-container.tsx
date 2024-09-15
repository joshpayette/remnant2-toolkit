'use client';

import { useState } from 'react';

import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import { ViewBuild } from '@/app/(builds)/builder/[buildId]/_components/view-build';
import { TabbedBuildsDisplay } from '@/app/(builds)/builder/linked/_components/tabbed-builds-display';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

interface Props {
  buildVariants: LinkedBuildItem[];
}

export function ViewBuildContainer({ buildVariants }: Props) {
  const [currentBuildVariant, setCurrentBuildVariant] =
    useState<LinkedBuildItem>(buildVariants[0] as LinkedBuildItem);

  return (
    <>
      {buildVariants.length > 1 && (
        <TabbedBuildsDisplay
          activeBuild={currentBuildVariant}
          linkedBuild={{
            linkedBuilds: buildVariants || [],
          }}
          onChangeActiveBuild={setCurrentBuildVariant}
          title="Build Variants"
        />
      )}
      <VideoThumbnail buildState={currentBuildVariant.build} />
      <ViewBuild buildState={currentBuildVariant.build} />
    </>
  );
}
