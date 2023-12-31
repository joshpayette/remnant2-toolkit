'use server'

import { z } from 'zod'
import { getServerSession } from '../(lib)/auth'
import { ErrorResponse } from '../(types)'
import { badWordFilter } from '../(lib)/badword-filter'
import { prisma } from '../(lib)/db'

export async function updateUserDisplayName(
  data: string,
): Promise<ErrorResponse | { message: string; updatedDisplayName?: string }> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // data validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      displayName: z
        .string()
        .min(1, { message: 'Display name is required.' })
        .max(50, {
          message: 'Display name cannot be longer than 50 characters.',
        }),
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }

  const { displayName: dirtyDisplayName } = validatedData.data

  try {
    const displayName = badWordFilter(dirtyDisplayName)

    const dbResponse = await prisma.user.update({
      where: { id: session.user.id },
      data: { displayName },
    })

    if (!dbResponse) {
      return {
        errors: ['Error updating user!'],
      }
    }

    return {
      message: 'Successfully updated user!',
      updatedDisplayName: dbResponse.displayName ?? '',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error updating user!'],
    }
  }
}
