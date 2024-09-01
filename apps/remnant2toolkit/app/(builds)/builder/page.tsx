import { BaseLink } from '@repo/ui';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { CreateUrlBuild } from '@/app/(builds)/builder/create-url-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Build Creation Tool - Remnant 2 Toolkit`;
  const description = NAV_ITEMS.createBuild.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/create`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/og-image-sm.jpg',
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Page() {
  const session = await getSession();

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      />

      {session?.user ? (
        <div className="text-surface-solid my-4 max-w-lg rounded-md border border-red-500 px-2 py-1 text-left">
          <h3 className="text-center text-2xl font-bold">
            Features limited on this page!
          </h3>
          <p className="mt-2">
            This page uses the URL to store your build, and is intended for
            unauthenticated users, or as a landing page for builds imported from
            other tools.
          </p>
          <p className="mt-2">
            To access{' '}
            <strong className="text-accent1-500">all enhanced features</strong>,
            you should either:
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>
              Click the <strong className="text-accent1-500">Save Build</strong>{' '}
              button to save it to the database, enabling the enhanced features.
            </li>
            <li>
              <BaseLink
                href="/builder/create"
                className="text-accent1-500 hover:text-accent1-300 font-bold underline"
              >
                Click here to visit the enhanced version of the Builder
                directly.
              </BaseLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-surface-solid mb-2 rounded-md border border-red-500 px-2 py-1 text-left">
          <h3 className="text-center text-lg font-bold">
            You are not signed in, so your features are limited.
          </h3>
          <p className="mt-2">
            Sign in with Discord or Reddit to get the following features:
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>Have your builds searchable by the community</li>
            <li>
              Allow your builds to be favorited and added to user loadouts
            </li>
            <li>Add build descriptions and reference URLs</li>
            <li>Mark builds public or private</li>
            <li>Shorter URLs when sharing your build</li>
            <li>Get better and more specific social media previews</li>
          </ul>
        </div>
      )}
      <CreateUrlBuild />
    </div>
  );
}
