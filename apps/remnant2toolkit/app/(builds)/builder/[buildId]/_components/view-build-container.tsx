'use client';

import { useState } from 'react';

import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import { ViewBuild } from '@/app/(builds)/builder/[buildId]/_components/view-build';
import { TabbedBuildsDisplay } from '@/app/(builds)/builder/linked/_components/tabbed-builds-display';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';
import { type LinkedBuildState } from '@/app/(builds)/builder/linked/_types/linked-build-state';

interface Props {
  buildState: BuildState;
  linkedBuildStates?: LinkedBuildState[];
}

export function ViewBuildContainer({ buildState, linkedBuildStates }: Props) {
  const currentLinkedBuildState = linkedBuildStates?.[0] || null;
  const linkedBuildItems = currentLinkedBuildState?.linkedBuildItems;
  const [currentLinkedBuild, setCurrentLinkedBuild] =
    useState<LinkedBuildItem | null>(linkedBuildItems?.[0] || null);

  const currentBuildState: BuildState = currentLinkedBuild
    ? cleanUpBuildState(dbBuildToBuildState(currentLinkedBuild.build))
    : buildState;

  return (
    <>
      {currentLinkedBuildState && currentLinkedBuild && (
        <TabbedBuildsDisplay
          buildInfo={currentLinkedBuild}
          linkedBuildState={currentLinkedBuildState}
          onChangeCurrentLinkedBuild={setCurrentLinkedBuild}
        />
      )}
      <VideoThumbnail buildState={currentBuildState} />
      <ViewBuild buildState={currentBuildState} />
    </>
  );
}
