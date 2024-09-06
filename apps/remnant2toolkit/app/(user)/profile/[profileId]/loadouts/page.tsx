import { DEFAULT_BIO } from '@repo/constants';
import { prisma } from '@repo/db';
import { type Metadata } from 'next';

import { OG_IMAGE_URL } from '@/app/_constants/meta';
import { getIsLoadoutPublic } from '@/app/(builds)/_actions/get-is-loadout-public';
import { getLoadoutList } from '@/app/(builds)/_actions/get-loadout-list';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { getAvatarById } from '@/app/(user)/profile/_utils/get-avatar-by-id';
import { ImportLoadouts } from '@/app/(user)/profile/[profileId]/loadouts/_components/import-loadouts';
import { LoadoutGrid } from '@/app/(user)/profile/[profileId]/loadouts/_components/loadout-grid';
import { LoadoutPublicCheckbox } from '@/app/(user)/profile/[profileId]/loadouts/_components/loadout-public-checkbox';

export async function generateMetadata({
  params: { userId },
}: {
  params: { userId: string };
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      title: 'Error loading user loadouts',
      description: `There was an error loading this user's loadouts. The user may no longer exist.`,
      openGraph: {
        title: 'Error loading user loadouts',
        description: `There was an error loading this user's loadouts. The user may no longer exist.`,
        url: `https://remnant2toolkit.com/profile/${userId}/loadouts`,
        images: [
          {
            url: OG_IMAGE_URL,
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading user loadouts',
        description: `There was an error loading this user's loadouts. The user may no longer exist.`,
      },
    };
  }

  let profileData = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
  });

  if (!profileData) {
    profileData = await prisma.userProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        bio: DEFAULT_BIO,
      },
      update: {},
    });
  }

  const avatarId = profileData?.avatarId;
  const avatar = getAvatarById(avatarId);

  if (!profileData?.isLoadoutPublic) {
    return {
      title: 'User Loadouts Private',
      description: `This user has not made their loadouts public.`,
      openGraph: {
        title: 'User Loadouts Private',
        description: `This user has not made their loadouts public.`,
        url: `https://remnant2toolkit.com/profile/${userId}/loadouts`,
        images: [
          {
            url: `https://d2sqltdcj8czo5.cloudfront.net${avatar.imagePath}`,
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'User Loadouts Private',
        description: `This user has not made their loadouts public.`,
      },
    };
  }

  const loadoutsBuilds = await getLoadoutList(userId);
  const loadoutNames = loadoutsBuilds.map(
    (build) =>
      `${build.name} by ${build.createdByDisplayName ?? build.createdByName}`,
  );

  const title = `${user.displayName ?? user.name} Loadouts - Remnant2Toolkit`;

  let description = '';
  for (let i = 0; i < loadoutNames.length; i++) {
    description += `${i + 1}. ${loadoutNames[i]}\r\n`;
    description += ``;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${userId}/loadout`,
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
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const session = await getSession();
  const isLoadoutPublic = await getIsLoadoutPublic(profileId);
  const existingLoadouts = await getLoadoutList(profileId);
  const isEditable = session?.user?.id === profileId;

  if (session?.user?.id !== profileId && !isLoadoutPublic) {
    return (
      <p className="text-red-500">You are not authorized to view this page.</p>
    );
  }

  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <div className="border-b-primary-500 flex w-full flex-row items-center justify-center border-b py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Loadouts
          </h2>
          {isEditable ? (
            <LoadoutPublicCheckbox isLoadoutPublic={isLoadoutPublic} />
          ) : null}
        </div>
      </div>
      <div className="mb-8 flex w-full items-center justify-end">
        <ImportLoadouts existingLoadouts={existingLoadouts} />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <LoadoutGrid isEditable={isEditable} profileId={profileId} />
      </div>
    </>
  );
}