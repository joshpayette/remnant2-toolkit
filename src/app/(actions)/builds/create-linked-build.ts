'use server'

import { LinkedBuild } from '@prisma/client'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'
import { validateLinkedBuild } from '@/app/(validators)/validate-linked-build'

type Props = {
  name: string
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

  try {
    // Create the linked build
    const newLinkedBuild = await prisma.linkedBuild.create({
      data: {
        createdBy: { connect: { id: userId } },
        createdAt: new Date(),
        name: linkedBuild.name,
        LinkedBuildItems: {
          create: linkedBuild.linkedBuildItems.map((linkedBuildItem) => ({
            createdAt: new Date(),
            label: linkedBuildItem.label,
            buildId: linkedBuildItem.buildId,
          })),
        },
      },
    })

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
