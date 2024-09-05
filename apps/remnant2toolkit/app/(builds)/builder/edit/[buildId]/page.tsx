import { PageHeader } from '@/app/_components/page-header';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import { EditBuild } from '@/app/(builds)/builder/edit/[buildId]/edit-build';

export default async function Page({
  params: { buildId },
}: {
  params: { buildId: string };
}) {
  const buildData = await getBuild(buildId);

  if (isErrorResponse(buildData)) {
    console.info(buildData.errors);
    return (
      <p className="text-red text-center">
        There was an error loading this build. It may have been removed.
      </p>
    );
  }
  const { build } = buildData;

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Edit your builds and share them with your friends and the community."
      />
      <EditBuild build={build} />
    </div>
  );
}
