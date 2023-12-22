import PageHeader from '@/app/(components)/PageHeader'
import { BuildState } from '@/app/(types)'

export default function BuildPage({ build }: { build: BuildState }) {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader title={build.name} subtitle={'Build description here'}>
        &nbsp;
      </PageHeader>
    </div>
  )
}
