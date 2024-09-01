import { type Metadata, type ResolvingMetadata } from 'next';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getLinkedBuild } from '@/app/(builds)/builder/linked/_actions/get-linked-build';
import { ViewLinkedBuild } from '@/app/(builds)/builder/linked/[linkedBuildId]/view-linked-build';

export async function generateMetadata(
  { params: { linkedBuildId } }: { params: { linkedBuildId: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const buildData = await getLinkedBuild(linkedBuildId);
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors);
    return {
      title: 'Error loading build',
      description:
        'There was an error loading this linked build. It may have been removed',
      openGraph: {
        title: 'Error loading build',
        description:
          'There was an error loading this linked build. It may have been removed',
        url: `https://remnant2toolkit.com/builder/linked/${linkedBuildId}`,
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
        title: 'Error loading build',
        description:
          'There was an error loading this build. It may have been removed',
      },
    };
  }

  const { linkedBuildState } = buildData;

  if (!linkedBuildState) {
    return {
      title: 'Error loading build',
      description:
        'There was an error loading this linked build. It may have been removed',
      openGraph: {
        title: 'Error loading build',
        description:
          'There was an error loading this linked build. It may have been removed',
        url: `https://remnant2toolkit.com/builder/linked/${linkedBuildId}`,
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
        title: 'Error loading build',
        description:
          'There was an error loading this build. It may have been removed',
      },
    };
  }

  const title = `${linkedBuildState.name} by ${linkedBuildState.createdByDisplayName}`;
  const description =
    linkedBuildState.description && linkedBuildState.description !== ''
      ? linkedBuildState.description
      : NAV_ITEMS.linkedBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/linked/${linkedBuildState.id}`,
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

  return <ViewLinkedBuild linkedBuildState={linkedBuildState} />;
}
