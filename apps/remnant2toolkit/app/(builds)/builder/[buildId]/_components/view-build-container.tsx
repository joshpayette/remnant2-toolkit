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
  const mainBuildVariant = buildVariants[0] as LinkedBuildItem;

  const [activeBuildVariant, setActiveBuildVariant] =
    useState<LinkedBuildItem>(mainBuildVariant);

  return (
    <>
      <VideoThumbnail buildState={mainBuildVariant.build} />
      {buildVariants.length > 1 && (
        <TabbedBuildsDisplay
          activeBuild={activeBuildVariant}
          linkedBuild={{
            linkedBuilds: buildVariants || [],
          }}
          onChangeActiveBuild={setActiveBuildVariant}
          title="Build Variants"
        />
      )}
      <ViewBuild
        activeBuildState={activeBuildVariant.build}
        buildVariantCount={buildVariants.length}
        mainBuildState={mainBuildVariant.build}
      />
    </>
  );
}
