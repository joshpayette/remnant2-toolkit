import { Build } from '@/types'

export default function TextBuild({ build }: { build: Build }) {
  return (
    <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
      <h3 className="col-span-full mb-2 mt-8 border-b border-b-green-900 pb-2 text-left text-2xl font-bold text-green-400">
        {build.name}
      </h3>
      <h4>Test Build</h4>
    </div>
  )
}
