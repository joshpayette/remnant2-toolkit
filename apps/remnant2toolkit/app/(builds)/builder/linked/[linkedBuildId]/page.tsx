import { isErrorResponse } from '@/app/_utils/is-error-response';
import { getLinkedBuild } from '@/app/(builds)/builder/linked/_actions/get-linked-build';
import { PageClient } from '@/app/(builds)/builder/linked/[linkedBuildId]/page.client';

export default async function Page({
  params: { linkedBuildId },
}: {
  params: { linkedBuildId: string };
}) {
  const buildData = await getLinkedBuild(linkedBuildId);
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors);
    return (
      <p className="text-red text-center">
        There was an error loading this linked build. It may have been removed.
      </p>
    );
  }
  const { linkedBuildState } = buildData;

  if (!linkedBuildState) {
    return (
      <p className="text-red text-center">
        There was an error loading this linked build. It may have been removed.
      </p>
    );
  }

  // return <PageClient build={build} />
  return <PageClient linkedBuildState={linkedBuildState} />;
}
