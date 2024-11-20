import { DEFAULT_BIO } from '@repo/constants';
import { prisma } from '@repo/db';
import { BaseText } from '@repo/ui';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { getBuildCollection } from '@/app/(user)/profile/[profileId]/collections/_actions/get-build-collection';
import { BuildCollectionBuildList } from '@/app/(user)/profile/[profileId]/collections/[collectionId]/_components/build-collection-build-list';

export async function generateMetadata({
  params: { profileId, collectionId },
}: {
  params: { profileId: string; collectionId: string };
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!user) {
    return {
      title: 'Error loading user collection',
      description: `There was an error loading this user's collection. The user may no longer exist.`,
      openGraph: {
        title: 'Error loading user collection',
        description: `There was an error loading this user's collection. The user may no longer exist.`,
        url: `https://remnant2toolkit.com/profile/${profileId}/collection`,
        images: [
          {
            url: OG_IMAGE_URL,
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading user collection',
        description: `There was an error loading this user's collection. The user may no longer exist.`,
      },
    };
  }

  let profileData = await prisma.userProfile.findFirst({
    where: {
      userId: profileId,
    },
  });

  if (!profileData) {
    profileData = await prisma.userProfile.upsert({
      where: {
        userId: profileId,
      },
      create: {
        userId: profileId,
        bio: DEFAULT_BIO,
      },
      update: {},
    });
  }

  const collectionResponse = await prisma.buildCollection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collectionResponse) {
    return {
      title: 'Error loading user collection',
      description: `There was an error loading this user's collection. The user may no longer exist.`,
      openGraph: {
        title: 'Error loading user collection',
        description: `There was an error loading this user's collection. The user may no longer exist.`,
        url: `https://remnant2toolkit.com/profile/${profileId}/collection`,
        images: [
          {
            url: OG_IMAGE_URL,
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading user collection',
        description: `There was an error loading this user's collection. The user may no longer exist.`,
      },
    };
  }

  const title = `${collectionResponse.name} (Build Collection) - ${SITE_TITLE}`;

  const description =
    collectionResponse.description ||
    'A collection of builds on Remnant 2 Toolkit';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${profileId}/collection/${collectionId}`,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 150,
          height: 150,
        },
      ],
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Page({
  params: { profileId, collectionId },
}: {
  params: { profileId: string; collectionId: string };
}) {
  const session = await getSession();

  const collectionResponse = await getBuildCollection(collectionId, profileId);
  if (isErrorResponse(collectionResponse)) {
    return (
      <PageHeader
        title="Error loading collection"
        subtitle={collectionResponse.errors?.join(' ')}
      />
    );
  }

  const { builds, collection } = collectionResponse;

  const isEditable = session?.user?.id === profileId;

  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <div className="border-b-primary-500 flex w-full flex-col items-center justify-center border-b py-2">
          <h2 className="mb-2 flex w-full items-center justify-center text-2xl font-bold">
            {collection.name}
          </h2>
          <BaseText className="max-w-lg whitespace-pre-wrap">
            {collection.description || 'No build collection description set.'}
          </BaseText>
        </div>
      </div>
      <BuildCollectionBuildList
        builds={builds}
        isEditable={isEditable}
        collection={collection}
      />
    </>
  );
}
