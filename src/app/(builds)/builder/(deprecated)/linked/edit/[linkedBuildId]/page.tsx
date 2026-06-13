import { PageHeader } from '@/app/_components/page-header';

export default async function Page() {
  return (
    <>
      <PageHeader
        title="Link Builds"
        subtitle="Link multiple variations of a build together in one convenient URL."
      />
      <div className="flex w-full flex-col gap-y-8">
        Linked builds have been removed in favor of the new build system. Please
        use the new build system to create and share builds and their variants.
      </div>
    </>
  );
}
