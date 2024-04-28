import { ItemButton } from '@/app/(components)/buttons/item-button'
import { Enemy } from '@/app/(data)/enemies/types'

interface Props {
  boss: Enemy & { discovered: boolean }
  onClick: (bossId: string) => void
}

export function BossTrackerCard({ boss, onClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <ItemButton
        item={boss}
        isEditable={false}
        isToggled={boss.discovered}
        onClick={() => onClick(boss.id)}
        size="xl"
        loadingType="lazy"
      />
    </div>
  )
}
