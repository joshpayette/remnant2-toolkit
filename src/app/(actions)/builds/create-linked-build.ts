'use server'

import { LinkedBuild } from '@prisma/client'

import { MAX_LINKED_BUILD_DESCRIPTION_LENGTH } from '@/app/(data)/builds/constants'
import { getServerSession } from '@/app/(utils)/auth'
import { cleanBadWords } from '@/app/(utils)/bad-word-filter'
import { prisma } from '@/app/(utils)/db'
import { validateLinkedBuild } from '@/app/(validators)/validate-linked-build'

type Props = {
  name: string
  description: string
  linkedBuildItems: Array<{
    label: string
    buildId: string
  }>
}

export default async function createLinkedBuild(linkedBuild: Props): Promise<{
  status: 'error' | 'success'
  message: string
  linkedBuild?: LinkedBuild
}> {
  const session = await getServerSession()
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

  try {
    // Create the linked build
    const newLinkedBuild = await prisma.linkedBuild.create({
      data: {
        createdBy: { connect: { id: userId } },
        createdAt: new Date(),
        name:
          linkedBuild.name && linkedBuild.name !== ''
            ? cleanBadWords(linkedBuild.name)
            : '',
        description:
          linkedBuild.description && linkedBuild.description !== ''
            ? cleanBadWords(linkedBuild.description)
            : '',
        LinkedBuildItems: {
          create: linkedBuild.linkedBuildItems.map((linkedBuildItem) => ({
            createdAt: new Date(),
            label: cleanBadWords(linkedBuildItem.label),
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
