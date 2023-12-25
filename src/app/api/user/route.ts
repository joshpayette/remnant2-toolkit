import { getServerSession } from '@/app/(lib)/auth'
import badwordFilter from '@/app/(lib)/badword-filter'
import { z } from 'zod'
import { prisma } from '@/app/(lib)/db'

export async function PATCH(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return Response.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  const unsafeUserState = await req.json()
  const userStateParsed = z
    .object({
      displayName: z.string(),
    })
    .safeParse(unsafeUserState)

  if (!userStateParsed.success) {
    console.error(
      'Invalid user state!',
      userStateParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json({ message: 'Invalid user state!' }, { status: 400 })
  }

  const userState = userStateParsed.data
  const displayName = badwordFilter.clean(userState.displayName)

  const dbResponse = await prisma?.user.update({
    where: { id: session.user.id },
    data: { displayName },
  })

  if (!dbResponse) {
    return Response.json({ message: 'Error updating user!' }, { status: 500 })
  }

  return Response.json(
    { message: 'Successfully updated user!' },
    { status: 200 },
  )
}
