import useBuildSearchParams from '../(hooks)/useBuildSearchParams'
import { buttonClasses } from './Button'
import { cn } from '@/app/(lib)/utils'

export default function SaveBuildButton() {
  const { currentBuildState } = useBuildSearchParams()

  async function handleSaveBuild() {
    // const response = await fetch('/api/build', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({}),
    // })
    // const data = await response.json()
    // console.log(data)
  }

  return (
    <button
      type="submit"
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      onClick={handleSaveBuild}
    >
      Save Build
    </button>
  )
}
