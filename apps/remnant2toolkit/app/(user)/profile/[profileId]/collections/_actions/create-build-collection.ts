'use server';

import { prisma } from '@repo/db';
import { urlNoCache } from '@repo/utils';

import { badWordFilter } from '@/app/_libs/bad-word-filter';
import { type ErrorResponse } from '@/app/_types/error-response';
import { MAX_COLLECTION_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

export async function createBuildCollection({
  collectionName,
  collectionDescription,
  buildIds,
}: {
  collectionName: string;
  collectionDescription: string;
  buildIds: string[];
}): Promise<
  | ErrorResponse
  | { message: string; collection: BuildCollectionWithBuilds | undefined }
> {
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return { errors: ['You must be logged in.'] };
  }

  try {
    const cleanCollectionName = badWordFilter.clean(collectionName);
    const cleanCollectionDescription = badWordFilter.clean(
      collectionDescription.slice(0, MAX_COLLECTION_DESCRIPTION_LENGTH),
    );

    const createdCollection = await prisma.buildCollection.create({
      data: {
        name: cleanCollectionName,
        description: cleanCollectionDescription,
        createdById: session.user.id,
        BuildsToBuildCollections: {
          create: buildIds.map((id) => ({
            build: {
              connect: { id },
            },
          })),
        },
      },
      include: {
        BuildsToBuildCollections: {
          include: {
            build: true,
          },
        },
      },
    });

    const buildLink = `${urlNoCache(
      `https://remnant2toolkit.com/profile/${session.user.id}/collections/${createdCollection.id}`,
    )}`;

    const shouldSendWebhook = process.env.WEBHOOK_DISABLED !== 'true';
    if (shouldSendWebhook) {
      const newBuildCollectionParams = {
        content: `New build collection created! ${buildLink}`,
      };
      const newBuildWebhookResponse = await fetch(
        `${process.env.WEBHOOK_MOD_QUEUE}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBuildCollectionParams),
        },
      );
      if (!newBuildWebhookResponse.ok) {
        console.error('Error in sending build moderation webhook to Discord!');
      }
    }

    return {
      message: 'Build collection created successfully.',
      collection: {
        ...createdCollection,
        builds: buildIds.map((id) => ({ id })),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['An error occurred while creating the build collection.'],
    };
  }
}
