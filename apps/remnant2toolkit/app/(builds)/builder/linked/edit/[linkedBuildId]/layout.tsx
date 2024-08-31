'use server';

import { type Metadata } from 'next';
import React from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { getSession } from '@/app/(features)/auth/services/sessionService';
import { getLinkedBuild } from '@/app/(features)/linked-builds/actions/get-linked-build';
import { NAV_ITEMS } from '@/app/(types)/navigation';
import { isErrorResponse } from '@/app/(utils)/is-error-response';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Build Linking Tool - Remnant 2 Toolkit`;
  const description = NAV_ITEMS.linkedBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/linked/edit`,
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

export default async function Layout({
  children,
  params: { linkedBuildId },
}: {
  children: React.ReactNode;
  params: { linkedBuildId: string };
}) {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Login Required!"
          subtitle="This feature requires you to be logged in, as it saves information to the database."
        />
      </div>
    );
  }

  // If build doesn't exist, show error message
  const buildData = await getLinkedBuild(linkedBuildId);

  if (isErrorResponse(buildData)) {
    console.info(buildData.errors);
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Something went wrong!"
          subtitle="The build either can't be found or is marked private."
        />
      </div>
    );
  }

  // if the build is not public, show error message
  const { linkedBuildState } = buildData;
  if (!linkedBuildState) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Linked build not found!"
          subtitle="The linked build id provided is not found."
        />
      </div>
    );
  }

  // if the user is not the creator of the build, show error message
  if (session.user?.id !== linkedBuildState.createdById) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Unauthorized Access!"
          subtitle="You must be the creator of the build to link it to other builds."
        />
      </div>
    );
  }

  return <>{children}</>;
}
