import { DEFAULT_BIO } from '@repo/constants';
import { prisma } from '@repo/db';
import { type Metadata, type ResolvingMetadata } from 'next';
import { revalidatePath } from 'next/cache';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { getIsLoadoutPublic } from '@/app/(builds)/_actions/get-is-loadout-public';
import {
  ALL_TRACKABLE_ITEMS,
  TOTAL_TRACKABLE_ITEM_COUNT,
} from '@/app/(items)/item-tracker/_constants/trackable-items';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { ProfileHeader } from '@/app/(user)/profile/_components/profile-header';
import { ProfileNavbar } from '@/app/(user)/profile/_components/profile-navbar';
import { ProfileStats } from '@/app/(user)/profile/_components/profile-stats';
import { DEFAULT_DISPLAY_NAME } from '@/app/(user)/profile/_constants/default-display-name';
import { getAvatarById } from '@/app/(user)/profile/_lib/get-avatar-by-id';
import { getProfileStats } from '@/app/(user)/profile/_lib/get-profile-stats';

export async function generateMetadata(
  { params: { profileId } }: { params: { profileId: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
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
        url: `https://remnant2toolkit.com/profile/${profileId}`,
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

  const {
    buildsCreated,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    userProfile,
    discoveredItemIds,
    totalBuildsViewCount,
  } = await getProfileStats({ profileId });

  // const previousOGImages = (await parent).openGraph?.images || []
  // const previousTwitterImages = (await parent).twitter?.images || []
  const userName = userData.displayName ?? userData.name;
  const title = `${userName} Profile - ${SITE_TITLE}`;

  const avatarId = profileData.avatarId;
  const avatar = getAvatarById(avatarId, profileId);

  const uniqueItemIds = Array.from(
    new Set(discoveredItemIds.map((item) => item.itemId)),
  );
  const discoveredItemIdCount = uniqueItemIds.filter((itemId) =>
    ALL_TRACKABLE_ITEMS.some((i) => i.id === itemId),
  ).length;

  const itemsDiscovered =
    discoveredItemIdCount > TOTAL_TRACKABLE_ITEM_COUNT
      ? TOTAL_TRACKABLE_ITEM_COUNT
      : discoveredItemIdCount;

  const description = profileData.bio
    ? `Community Builds: ${buildsCreated}, Favorites Earned: ${favoritesEarned}, Users' Loadouts: ${loadoutCounts}` +
      '\r\n' +
      `Featured: ${featuredBuilds}, Gimmick: ${gimmickBuilds}, Beginner: ${beginnerBuilds}, Base Game: ${baseGameBuilds}` +
      '\r\n' +
      `Total Build Views: ${
        totalBuildsViewCount._sum?.viewCount ?? 0
      }, Items Discovered: ${itemsDiscovered}/${TOTAL_TRACKABLE_ITEM_COUNT}, Item Quiz Score: ${userProfile?.topItemQuizScore}` +
      `\r\n` +
      `\r\n` +
      `${profileData.bio}`
    : `View ${userName}'s profile on ${SITE_TITLE}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${profileId}`,
      images: [
        {
          url: `https://d2sqltdcj8czo5.cloudfront.net/remnant2${avatar.imagePath}`,
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

export default async function Layout({
  children,
  params: { profileId },
}: {
  children: React.ReactNode;
  params: { profileId: string };
}) {
  const session = await getSession();
  const isEditable = session?.user?.id === profileId;

  const user = await prisma.user.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!user) {
    return (
      <>
        <PageHeader title="User Profile Not Found" />
        <p className="text-lg text-red-500">
          The user or user profile you are looking for could not be found.
        </p>
      </>
    );
  }

  let profile = await prisma.userProfile.findFirst({
    where: {
      userId: profileId,
    },
  });

  if (!profile) {
    profile = await prisma.userProfile.upsert({
      where: {
        userId: profileId,
      },
      create: {
        userId: profileId,
        bio: DEFAULT_BIO,
      },
      update: {},
    });
    revalidatePath(`/profile/${profileId}`);
  }

  const isLoadoutPublic = await getIsLoadoutPublic(profileId);

  return (
    <div className="w-full">
      <header>
        <ProfileNavbar
          isEditable={isEditable}
          isLoadoutPublic={isLoadoutPublic}
          showPrivateLinks={session?.user?.id === profileId}
          profileId={profileId}
        />

        <div className="flex flex-col items-start justify-start gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-start sm:px-6 lg:px-8">
          <ProfileHeader
            avatarId={profile.avatarId}
            bio={profile.bio}
            displayName={user.displayName || user.name || DEFAULT_DISPLAY_NAME}
            isEditable={isEditable}
            profileId={profileId}
          />
        </div>

        <ProfileStats profileId={profileId} isEditable={isEditable} />
      </header>
      <div className="border-surface-solid/10 border-t pt-4">{children}</div>
    </div>
  );
}
