import { PageHeader } from '@/app/_components/page-header';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import { dbBuildToBuildVariants } from '@/app/(builds)/_libs/db-build-to-build-variants';
import { EditBuild } from '@/app/(builds)/builder/edit/[buildId]/edit-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export default async function Page({
  params: { buildId },
}: {
  params: { buildId: string };
}) {
  const session = await getSession();
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
  const buildVariants = await dbBuildToBuildVariants(build);

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Edit your builds and share them with your friends and the community."
      />
      <EditBuild
        initialBuildVariants={buildVariants}
        enableMemberFeatures={Boolean(session)}
      />
    </div>
  );
}
