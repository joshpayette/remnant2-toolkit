import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import { CreateLinkedBuild } from '@/app/(builds)/builder/linked/create/[buildId]/created-linked-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.linkedBuilds.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.linkedBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/builder/linked/create`,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}

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
      <div className="flex w-full flex-col gap-y-8">
        <CreateLinkedBuild initialBuild={build} userId={userId} />
      </div>
    </>
  );
}
