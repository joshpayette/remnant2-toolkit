import { permanentRedirect } from 'next/navigation'

import { PageHeader } from '@/app/(components)/page-header'

export default async function Page() {
  // permanentRedirect('/community-builds')

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <PageHeader
        title="Builds By Collection Removed"
        subtitle="The builds by collection feature will no longer be avaiable."
      />

      <div className="mt-4 max-w-2xl text-left">
        <p className="text-lg text-gray-300">
          The team have decided to indefinitely shelve this feature. This is a
          feature I wanted to deliver since the launch of the toolkit. I am sure
          this decision will be disappointing for those who use it, but I will
          detail the reasoning below:
        </p>
        <ul className="mt-4 list-disc text-lg text-gray-300">
          <li>
            This particular page causes an extreme amount of database usage,
            which slows database performance elsewhere on the site. This is
            largely due to the complexity of the queries required to generate
            the data, as well as the overhead of having to store and update the
            item tracker data for each user.
          </li>
          <li>
            All attempted workarounds to improve performance and make the
            process more reliable have not been successful.
          </li>
          <li>
            The ongoing performance of this single feature risks incurring even
            more costs for the toolkit. It is already responsible for a large
            chunk of the existing out of pocket cost.
          </li>
          <li>
            The feature is not used by the vast majority of the Toolkit user
            base. In the lifetime of the toolkit, traffic to this feature
            accounts for less than 1% of all traffic.
          </li>
        </ul>

        <p className="mt-4 text-lg text-gray-300">
          I am sorry for the inconvenience this may cause. I hope that the time
          and cost freed up by this change will enable the team to focus on
          other features that will be more beneficial to the community as a
          whole.
        </p>
      </div>
    </div>
  )
}
