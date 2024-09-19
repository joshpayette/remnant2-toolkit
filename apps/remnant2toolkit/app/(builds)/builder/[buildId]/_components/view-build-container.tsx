'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import { ViewBuild } from '@/app/(builds)/builder/[buildId]/_components/view-build';
import { TabbedBuildsDisplay } from '@/app/(builds)/builder/linked/_components/tabbed-builds-display';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

interface Props {
  buildVariants: LinkedBuildItem[];
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
