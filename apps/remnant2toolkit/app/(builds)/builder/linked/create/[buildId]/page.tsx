import { PageHeader } from '@/app/_components/page-header';
import { isErrorResponse } from '@/app/_utils/is-error-response';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import PageClient from '@/app/(builds)/builder/linked/create/[buildId]/page.client';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export default async function Page({
  params: { buildId },
}: {
  params: { buildId: string };
}) {
  if (!buildId) {
    return (
      <p className="text-center text-red-500">
        At least one build id is required to link builds.
      </p>
    );
  }

  const buildData = await getBuild(buildId);
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors);
    return (
      <p className="text-red text-center">
        There was an error loading this build.
      </p>
    );
  }

  const session = await getSession();
  if (!session || !session.user) {
    return (
      <p className="text-red text-center">
        You must be logged in to link builds.
      </p>
    );
  }

  const userId = session.user.id;
  const { build } = buildData;

  if (!build.isPublic) {
    return (
      <p className="text-red text-center">
        This build is not public and cannot be linked to other builds.
      </p>
    );
  }

  if (session.user?.id !== build.createdById) {
    return (
      <p className="text-red text-center">
        You must be the creator of the build to link it to other builds.
      </p>
    );
  }

  return (
    <>
      <PageHeader
        title="Link Builds"
        subtitle="Link multiple variations of a build together in one convenient URL."
      />
      <PageClient initialBuild={build} userId={userId} />
    </>
  );
}
