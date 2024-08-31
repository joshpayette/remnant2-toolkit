import { permanentRedirect } from 'next/navigation';

import { PageHeader } from '@/app/_components/page-header';
import { getSession } from '@/app/(features)/auth/services/sessionService';

export default async function Page() {
  const session = await getSession();
  if (!session || !session.user) {
    return (
      <PageHeader
        title="Login Required"
        subtitle="You must be logged in to view this page"
      />
    );
  }

  permanentRedirect(`/profile/${session?.user?.id}?t=${Date.now()}`);
}
