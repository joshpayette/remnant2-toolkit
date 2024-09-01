import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getLinkedBuild } from '@/app/(builds)/builder/linked/_actions/get-linked-build';
import { EditLinkedBuild } from '@/app/(builds)/builder/linked/edit/[linkedBuildId]/edit-linked-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Build Linking Tool - Remnant 2 Toolkit`;
  const description = NAV_ITEMS.linkedBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/linked/edit`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/og-image-sm.jpg',
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
  params: { linkedBuildId },
}: {
  params: { linkedBuildId: string };
}) {
  if (!linkedBuildId) {
    return (
      <p className="text-center text-red-500">
        No build ID was provided to link.
      </p>
    );
  }

  const buildData = await getLinkedBuild(linkedBuildId);
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors);
    return (
      <p className="text-red text-center">
        There was an error loading this linked build.
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
  const { linkedBuildState } = buildData;

  if (!linkedBuildState) {
    return (
      <p className="text-red text-center">
        This linked build could not be found.
      </p>
    );
  }

  if (session.user?.id !== linkedBuildState.createdById) {
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
      <EditLinkedBuild
        currentLinkedBuildState={linkedBuildState}
        userId={userId}
      />
    </>
  );
}
