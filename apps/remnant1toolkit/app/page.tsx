import { BaseButton } from '@repo/ui/base/button'
import { BaseText } from '@repo/ui/base/text'

import { getSession } from '@/app/(features)/auth/services/sessionService'

export default async function Page() {
  const session = await getSession()

  return (
    <div>
      {session?.user?.name ? (
        <BaseText>Signed in as {session.user?.name}</BaseText>
      ) : (
        <BaseText>Not signed in</BaseText>
      )}
      {!session?.user?.name && (
        <BaseButton href="/api/auth/signin">Sign in</BaseButton>
      )}
    </div>
  )
}
