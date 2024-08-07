'use server'

import { LinkedBuild } from '@repo/db'
import { prisma } from '@repo/db'

import { MAX_LINKED_BUILD_DESCRIPTION_LENGTH } from '@/app/(data)/builds/constants'
import { getSession } from '@/app/(features)/auth/services/sessionService'
import { badWordFilter } from '@/app/(utils)/bad-word-filter'
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook'
import { validateLinkedBuild } from '@/app/(validators)/validate-linked-build'

type Props = {
  name: string
  description: string
  linkedBuildItems: Array<{
    label: string
    buildId: string
  }>
}

export async function createLinkedBuild(linkedBuild: Props): Promise<{
  status: 'error' | 'success'
  message: string
  linkedBuild?: LinkedBuild
}> {
  const session = await getSession()
  if (!session || !session.user) {
    return { status: 'error', message: 'You must be logged in.' }
  }
  const userId = session.user.id

  const validatedLinkedBuild = validateLinkedBuild(linkedBuild)
  if (!validatedLinkedBuild.success) {
    return { status: 'error', message: 'Invalid linked build.' }
  }

  // if the description is longer than allowed, truncate it
  if (
    linkedBuild.description &&
    linkedBuild.description.length > MAX_LINKED_BUILD_DESCRIPTION_LENGTH
  ) {
    linkedBuild.description =
      linkedBuild.description.slice(
        0,
        MAX_LINKED_BUILD_DESCRIPTION_LENGTH - 3,
      ) + '...'
  }

  const nameBadWordCheck = badWordFilter.isProfane(linkedBuild.name)
  if (nameBadWordCheck.isProfane) {
    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Create Linked Build, Build Name',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: nameBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    })

    return {
      status: 'error',
      message: `Could not save build with profanity: ${nameBadWordCheck.badWords.join(
        ', ',
      )}`,
    }
  }

  const descriptionBadWordCheck = badWordFilter.isProfane(
    linkedBuild.description,
  )
  if (descriptionBadWordCheck.isProfane) {
    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Create Linked Build, Build Description',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: descriptionBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    })

    return {
      status: 'error',
      message: `Could not save build with profanity: ${descriptionBadWordCheck.badWords.join(
        ', ',
      )}`,
    }
  }

  const linkedBuildItemBadWordCheck = linkedBuild.linkedBuildItems.map(
    (linkedBuildItem) => badWordFilter.isProfane(linkedBuildItem.label),
  )
  const badWordCheck = linkedBuildItemBadWordCheck.find(
    (check) => check.isProfane,
  )
  if (badWordCheck) {
    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Create Linked Build, Build Label',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: badWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    })

    return {
      status: 'error',
      message: `Could not save build with profanity: ${badWordCheck.badWords.join(
        ', ',
      )}`,
    }
  }

  try {
    // Create the linked build
    const newLinkedBuild = await prisma.linkedBuild.create({
      data: {
        createdBy: { connect: { id: userId } },
        createdAt: new Date(),
        name:
          linkedBuild.name && linkedBuild.name !== ''
            ? badWordFilter.clean(linkedBuild.name)
            : '',
        description:
          linkedBuild.description && linkedBuild.description !== ''
            ? badWordFilter.clean(linkedBuild.description)
            : '',
        LinkedBuildItems: {
          create: linkedBuild.linkedBuildItems.map((linkedBuildItem) => ({
            createdAt: new Date(),
            label: badWordFilter.clean(linkedBuildItem.label),
            buildId: linkedBuildItem.buildId,
          })),
        },
      },
    })

    // Trigger webhook to send build to Discord
    if (process.env.NODE_ENV === 'production') {
      const params = {
        content: `New linked build created! https://www.remnant2toolkit.com/builder/linked/${
          newLinkedBuild.id
        }?t=${Date.now()}`,
      }

      const res = await fetch(`${process.env.WEBHOOK_MOD_QUEUE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!res.ok) {
        console.error(
          'Error in sending linked build moderation webhook to Discord!',
        )
      }

      const res2 = await fetch(`${process.env.WEBHOOK_NEW_BUILD_FEED}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!res2.ok) {
        console.error('Error in sending linked build webhook to Discord!')
      }
    }

    return {
      status: 'success',
      message: 'Linked build created.',
      linkedBuild: newLinkedBuild,
    }
  } catch (e) {
    console.error(e)
    return { status: 'error', message: 'Failed to create linked build.' }
  }
}
