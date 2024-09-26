'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const searchParams = useSearchParams();
  const variantIndex = searchParams.get('variant');

  const [activeBuildVariant, setActiveBuildVariant] = useState(
    variantIndex && buildVariants[parseInt(variantIndex)]
      ? buildVariants[parseInt(variantIndex)]
      : buildVariants[0],
  );

  useEffect(() => {
    if (variantIndex && buildVariants[parseInt(variantIndex)]) {
      setActiveBuildVariant(buildVariants[parseInt(variantIndex)]);
    } else {
      setActiveBuildVariant(buildVariants[0]);
    }
  }, [buildVariants, variantIndex]);

  if (!buildVariants[0]) {
    return null;
  }
  if (!activeBuildVariant) {
    return null;
  }

  const activeVariantHasLink =
    Boolean(activeBuildVariant.buildLink) ||
    Boolean(activeBuildVariant.videoUrl);

  const mainBuildHasLink =
    Boolean(buildVariants[0].buildLink) || Boolean(buildVariants[0].videoUrl);

  const activeVariantIndex = buildVariants.findIndex(
    (variant) => variant.buildId === activeBuildVariant.buildId,
  );

  return (
    <>
      {activeVariantHasLink || mainBuildHasLink ? (
        <VideoThumbnail
          buildState={
            activeVariantHasLink ? activeBuildVariant : buildVariants[0]
          }
        />
      ) : null}
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
        activeVariantIndex={activeVariantIndex}
        mainBuildState={buildVariants[0]}
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
