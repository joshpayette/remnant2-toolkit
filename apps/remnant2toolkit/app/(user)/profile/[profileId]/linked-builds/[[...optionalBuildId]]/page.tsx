import { DEFAULT_BIO } from '@repo/constants';
import { prisma } from '@repo/db';
import { type Metadata } from 'next';

import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { getAvatarById } from '@/app/(user)/profile/_utils/get-avatar-by-id';
import { ViewLinkedBuild } from '@/app/(user)/profile/[profileId]/linked-builds/[[...optionalBuildId]]/view-linked-build';

export async function generateMetadata({
  params: { profileId },
}: {
  params: { profileId: string };
}): Promise<Metadata> {
  const userData = await prisma.user.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!userData) {
    console.info('User or profile not found', { profileId, userData });

    return {
      title: 'Error loading profile',
      description:
        'There was an error loading this profile. It may have been removed.',
      openGraph: {
        title: 'Error loading profile',
        description:
          'There was an error loading this profile. It may have been removed.',
        url: `https://remnant2toolkit.com/profile/${profileId}/linked-builds`,
        images: [
          {
            url: OG_IMAGE_URL,
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading profile',
        description:
          'There was an error loading this profile. It may have been removed.',
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

  const userName = userData.displayName ?? userData.name;
  const title = `${userName}'s Linked Builds - ${SITE_TITLE}`;
  const description = '(Deprecated) View Remnant 2 Linked Builds.';

  const avatarId = profileData.avatarId;
  const avatar = getAvatarById(avatarId);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${profileId}/linked-builds`,
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
  params: { profileId, optionalBuildId },
}: {
  params: { profileId: string; optionalBuildId: string[] };
}) {
  const session = await getSession();
  const isEditable = session?.user?.id === profileId;

  const buildId = optionalBuildId ? optionalBuildId[0] : undefined;

  return (
    <div className="mb-4 grid w-full grid-cols-1 gap-2">
      <ViewLinkedBuild
        isEditable={isEditable}
        profileId={profileId}
        buildId={buildId}
      />
    </div>
  );
}
