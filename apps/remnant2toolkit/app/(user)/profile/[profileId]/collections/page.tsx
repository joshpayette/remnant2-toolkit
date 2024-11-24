import { prisma } from '@repo/db';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_constants/nav-items';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getAvatarById } from '@/app/(user)/profile/_lib/get-avatar-by-id';
import { getBuildCollections } from '@/app/(user)/profile/[profileId]/collections/_actions/get-build-collections';
import { BuildCollectionsList } from '@/app/(user)/profile/[profileId]/collections/_components/build-collections-list';
import { CONFIG } from '@/app/config';

export async function generateMetadata({
  params: { profileId },
}: {
  params: { profileId: string };
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!user) {
    return {
      title: 'Error loading user collections',
      description: `There was an error loading this user's collections. The user may no longer exist.`,
      openGraph: {
        title: 'Error loading user collections',
        description: `There was an error loading this user's collections. The user may no longer exist.`,
        url: `https://remnant2toolkit.com/profile/${profileId}/collections`,
        images: [
          {
            url: OG_IMAGE_URL,
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading user collections',
        description: `There was an error loading this user's collections. The user may no longer exist.`,
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
        bio: CONFIG.user.defaultBio,
      },
      update: {},
    });
  }

  const avatarId = profileData?.avatarId;
  const avatar = getAvatarById(avatarId, profileId);

  const title = `${user.displayName ?? user.name} ${
    NAV_ITEMS.collections.label
  } - ${SITE_TITLE}`;

  const description = NAV_ITEMS.collections.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${profileId}/collections`,
      images: [
        {
          url: `https://d2sqltdcj8czo5.cloudfront.net${avatar.imagePath}`,
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
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const collectionsResponse = await getBuildCollections(profileId);
  if (isErrorResponse(collectionsResponse)) {
    return (
      <PageHeader
        title="Error loading user collections"
        subtitle={collectionsResponse.errors?.join(' ')}
      />
    );
  }

  const { collections } = collectionsResponse;

  return (
    <div className="mb-4 flex w-full flex-col items-center justify-center">
      <div className="border-b-primary-500 flex w-full flex-row items-center justify-center border-b py-2">
        <h2 className="flex w-full items-center justify-start text-2xl">
          {NAV_ITEMS.collections.label}
        </h2>
      </div>
      <BuildCollectionsList collections={collections} />
    </div>
  );
}
