'use server';

import { type BuildCollection, prisma } from '@repo/db';
import { urlNoCache } from '@repo/utils';
import { diffTrimmedLines } from 'diff';

import { badWordFilter } from '@/app/_libs/bad-word-filter';
import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { validateEnv } from '@/app/_libs/validate-env';
import { type ErrorResponse } from '@/app/_types/error-response';
import { MAX_COLLECTION_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';
import { isPermittedBuilder } from '@/app/(builds)/_libs/permitted-builders';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function editBuildCollection({
  collectionId,
  collectionName,
  collectionDescription,
  buildIds,
}: {
  collectionId: string;
  collectionName: string;
  collectionDescription: string;
  buildIds: string[];
}): Promise<
  ErrorResponse | { message: string; collection: BuildCollection | undefined }
> {
  const env = validateEnv();

  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return { errors: ['You must be logged in.'] };
  }

  try {
    // Get the existing build collection
    const existingCollection = await prisma.buildCollection.findFirst({
      where: {
        id: collectionId,
        createdById: session.user.id,
      },
      select: { name: true, description: true },
    });

    // Check if all buildIds exist
    const existingBuilds = await prisma.build.findMany({
      where: {
        id: { in: buildIds },
      },
      select: { id: true },
    });

    const existingBuildIds = existingBuilds.map((build) => build.id);

    const cleanCollectionName = badWordFilter.clean(collectionName);
    const cleanCollectionDescription = badWordFilter.clean(
      collectionDescription.slice(0, MAX_COLLECTION_DESCRIPTION_LENGTH),
    );

    const updatedCollection = await prisma.buildCollection.update({
      where: {
        id: collectionId,
        createdById: session.user.id,
      },
      data: {
        name: cleanCollectionName,
        description: cleanCollectionDescription,
        BuildsToBuildCollections: {
          deleteMany: {},
          create: existingBuildIds.map((id) => ({
            build: {
              connect: { id },
            },
          })),
        },
      },
    });

    const buildLink = `${urlNoCache(
      `https://remnant2toolkit.com/profile/${session.user.id}/collections/${collectionId}`,
    )}`;

    const isCollectionNameChanged =
      existingCollection?.name !== cleanCollectionName &&
      !isPermittedBuilder(session.user.id);
    if (isCollectionNameChanged && !env.WEBHOOK_DISABLED) {
      await sendWebhook({
        webhook: 'modQueue',
        params: {
          embeds: [
            {
              title: `Build Collection Name Changed`,
              color: 0x00ff00,
              fields: [
                {
                  name: 'Changes',
                  value: `New Build Collection Name: ${updatedCollection.name}`,
                },
                {
                  name: 'Build Collection Link',
                  value: buildLink,
                },
              ],
            },
          ],
        },
      });
    }

    const isCollectionDescriptionChanged =
      existingCollection?.description !== updatedCollection.description &&
      (updatedCollection.description || '').trim().length > 0 &&
      !isPermittedBuilder(session.user.id) &&
      !env.WEBHOOK_DISABLED;
    if (isCollectionDescriptionChanged) {
      const diff = diffTrimmedLines(
        existingCollection?.description || '',
        updatedCollection.description || '',
        {
          ignoreCase: true,
        },
      );

      const content = diff
        ?.map((part) => {
          if (part.added) {
            return `${part.value.replace(/\n/g, '')}`.trim();
          }
        })
        .join('\n');

      await sendWebhook({
        webhook: 'modQueue',
        params: {
          embeds: [
            {
              title: `Build Collection Description Changed`,
              color: 0x00ff00,
              fields: [
                {
                  name: 'Description Changes',
                  value: content,
                },
                {
                  name: 'Build Collection Link',
                  value: buildLink,
                },
              ],
            },
          ],
        },
      });
    }

    return {
      message: 'Build collection updated successfully.',
      collection: updatedCollection,
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['An error occurred while updating the build collection.'],
    };
  }
}
