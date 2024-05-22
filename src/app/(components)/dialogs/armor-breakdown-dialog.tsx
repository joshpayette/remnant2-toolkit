import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { ListItem } from '@/app/(components)/builder/stats/list-item'
import { Section } from '@/app/(components)/builder/stats/section'
import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState } from '@/app/(types)/builds'

function getArmorStepLabel(buildState: BuildState, item: TraitItem) {
  const amount =
    buildState.items.trait.find((t) => t.name === item.name)?.amount ?? 0

  return (
    <>
      <span className="font-bold text-surface-solid">{item.name}</span>{' '}
      <span className="text-gray-300">
        {`(${amount * (item.armorStep ?? 0)})`}
      </span>
    </>
  )
}

function getArmorIncreaseLabel(item: Item) {
  return (
    <>
      <span className="font-bold text-surface-solid">{item.name}</span>{' '}
      <span className="text-gray-300">({item.armor})</span>
    </>
  )
}

function getArmorPercentLabel(item: Item) {
  return (
    <>
      <span className="font-bold text-surface-solid">
        {item.name}{' '}
        {item.category === 'relicfragment' && 'Mythic Relic Fragment'}
      </span>{' '}
      <span className="text-gray-300">
        ({((item.armorPercent ?? 0) * 100).toFixed(2)}%)
      </span>
    </>
  )
}

function getArmorPercentStepLabel(item: TraitItem) {
  return (
    <>
      <span className="font-bold text-surface-solid">{item.name}</span>{' '}
      <span className="text-gray-300">
        ({item.armorStepPercent}% per point)
      </span>
    </>
  )
}

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
  breakdown: {
    equippedArmorIncreaseItems: Item[]
    equippedArmorPercentItems: Item[]
    equippedArmorStepItems: TraitItem[]
    equippedArmorStepPercentItems: TraitItem[]
    totalArmorIncrease: number
    totalArmorPercent: number
    totalArmorStep: number
    totalArmorStepPercent: number
  }
}

export function ArmorBreakdownDialog({
  open,
  buildState,
  breakdown,
  onClose,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="sm">
      <BaseDialogTitle>Armor Breakdown</BaseDialogTitle>
      <BaseDialogDescription>
        View a breakdown of items contributing to this armor total.<br></br>ArmorDR = Armor / (Armor+200) 
      </BaseDialogDescription>
      <BaseDialogBody>
        <div className="text-left text-sm">
          {(breakdown.equippedArmorIncreaseItems.length > 0 ||
            breakdown.equippedArmorStepItems.length > 0) && (
            <Section
              total={
                breakdown.totalArmorIncrease + breakdown.totalArmorStep
              }
              listItems={
                <>
                  {breakdown.equippedArmorIncreaseItems.map((item) => (
                    <ListItem key={item.id}>
                      {getArmorIncreaseLabel(item)}
                    </ListItem>
                  ))}
                  {breakdown.equippedArmorStepItems.map((item) => (
                    <ListItem key={item.id}>
                      {getArmorStepLabel(buildState, item)}
                    </ListItem>
                  ))}
                </>
              }
            />
          )}

          {(breakdown.equippedArmorPercentItems.length > 0 ||
            breakdown.equippedArmorStepPercentItems.length > 0) && (
            <Section
              isPercent={true}
              total={
                (breakdown.totalArmorPercent +
                  breakdown.totalArmorStepPercent) *
                100
              }
              listItems={
                <>
                  {breakdown.equippedArmorPercentItems.map((item) => (
                    <ListItem key={item.id}>
                      {getArmorPercentLabel(item)}
                    </ListItem>
                  ))}
                  {breakdown.equippedArmorStepPercentItems.map((item) => (
                    <ListItem key={item.id}>
                      {getArmorPercentStepLabel(item)}
                    </ListItem>
                  ))}
                </>
              }
            />
          )}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
