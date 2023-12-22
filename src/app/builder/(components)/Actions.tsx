import ToCsvButton from '@/app/(components)/ToCsvButton'
import useQueryString from '@/app/builder/(hooks)/useBuildSearchParams'
import Link from 'next/link'
import { buildToCsvData } from '../(lib)/utils'
import { Button } from './Button'
import SaveBuildButton from './SaveBuildButton'

export default function Actions({
  showControls,
  showLabels,
  onCopyBuildUrl,
  onExportAsImage,
  onToggleControls,
  onToggleLabels,
}: {
  showControls: boolean
  showLabels: boolean
  onCopyBuildUrl: () => void
  onExportAsImage: () => void
  onToggleControls: () => void
  onToggleLabels: () => void
}) {
  const { currentBuildState } = useQueryString()

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(currentBuildState)

  return (
    <div id="actions" className="flex flex-col gap-2">
      <SaveBuildButton />
      <Button.ExportImage onClick={onExportAsImage} />
      <Button.CopyBuildUrl onClick={onCopyBuildUrl} />
      <ToCsvButton
        data={csvBuildData.filter((item) => item?.name !== '')}
        filename={`remnant2_builder_${currentBuildState.name}`}
      />

      <hr className="my-4 border-gray-900" />

      <Button.ShowLabels onClick={onToggleLabels} showLabels={showLabels} />
      <Button.ShowControls
        onClick={onToggleControls}
        showControls={showControls}
      />
      <Button.NewBuild />
    </div>
  )
}
