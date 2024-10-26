import { DescriptionWithTokens } from '@/app/_components/description-with-tokens';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import { incrementViewCount } from '@/app/(builds)/_actions/increment-view-count';
import { dbBuildToBuildVariants } from '@/app/(builds)/_libs/db-build-to-build-variants';
import { ViewBuildContainer } from '@/app/(builds)/builder/[buildId]/_components/view-build-container';

export default async function Page({
  params: { buildId },
}: {
  params: { buildId: string };
}) {
  const mainBuildResponse = await getBuild(buildId);

  if (isErrorResponse(mainBuildResponse)) {
    console.info(mainBuildResponse.errors);
    return (
      <p className="text-red text-center">
        There was an error loading this build. It may have been removed.
      </p>
    );
  }
  const { build } = mainBuildResponse;
  await incrementViewCount({ buildId: build.id });

  // const buildVariants = await dbBuildToBuildVariants(build);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="height-full flex w-full flex-col items-center justify-center whitespace-pre-wrap">
        <DescriptionWithTokens
          description={build.description || ''}
          highlightBuildTokens={true}
          highlightExternalTokens={false}
          highlightItems={true}
        />
      </div>
    </div>
  );
}
