'use server'

import { LinkedBuild } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/app/(utils)/auth'
import { cleanBadWords } from '@/app/(utils)/bad-word-filter'
import { prisma } from '@/app/(utils)/db'
import { validateLinkedBuild } from '@/app/(validators)/validate-linked-build'

type Props = {
  id: string
  createdById: string
  name: string
  description: string
  linkedBuildItems: Array<{
    label: string
    buildId: string
  }>
}

export default async function updatedLinkedBuild(linkedBuild: Props): Promise<{
  status: 'error' | 'success'
  message: string
  linkedBuild?: LinkedBuild
}> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return { status: 'error', message: 'You must be logged in.' }
  }
  const userId = session.user.id

  // If the user didn't create the build, return an error
  if (userId !== linkedBuild.createdById) {
    return {
      status: 'error',
      message: 'You must be the creator of the build to update it.',
    }
  }

  const validatedLinkedBuild = validateLinkedBuild(linkedBuild)
  if (!validatedLinkedBuild.success) {
    return { status: 'error', message: 'Invalid linked build.' }
  }

  try {
    // delete all linked build items
    await prisma.linkedBuildItems.deleteMany({
      where: {
        linkedBuildId: linkedBuild.id,
      },
    })

    // Create the linked build
    const updatedLinkedBuild = await prisma.linkedBuild.update({
      where: {
        id: linkedBuild.id,
      },
      data: {
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
            label: linkedBuildItem.label,
            buildId: linkedBuildItem.buildId,
          })),
        },
      },
    })

    revalidatePath(`/builder/linked/edit/${linkedBuild.id}`)

    return {
      status: 'success',
      message: 'Linked build created.',
      linkedBuild: updatedLinkedBuild,
    }
  } catch (e) {
    console.error(e)
    return { status: 'error', message: 'Failed to create linked build.' }
  }
}
