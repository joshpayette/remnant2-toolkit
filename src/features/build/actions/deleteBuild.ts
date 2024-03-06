'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

import { BUILD_REVALIDATE_PATHS } from '../constants'
import { BuildActionResponse } from '../types'

export async function deleteBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      errors: ['You must be logged in.'],
    }
  }

  // build validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      buildId: z.string(),
    })
    .safeParse(unvalidatedData)

  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }

  const { buildId } = validatedData.data

  try {
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      include: {
        createdBy: true,
      },
    })
    if (!build) {
      return {
        errors: ['Build not found!'],
      }
    }

    if (build.createdBy.id !== session.user.id) {
      return {
        errors: [
          'You must be logged in as the build creator to delete a build.',
        ],
      }
    }

    const dbResponse = await prisma.build.delete({
      where: {
        id: build.id,
      },
    })

    // check for errors in dbResponse
    if (!dbResponse) {
      return {
        errors: ['Error in deleting build!'],
      }
    }

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path)
    }

    return {
      message: 'Build successfully deleted!',
      buildId: dbResponse.id,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in deleting build!'],
    }
  }
}
