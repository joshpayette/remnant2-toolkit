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

function getHealthStepLabel(buildState: BuildState, item: TraitItem) {
  const amount =
    buildState.items.trait.find((t) => t.name === item.name)?.amount ?? 0

  return (
    <>
      <span className="font-bold text-white">{item.name}</span>{' '}
      <span className="text-gray-300">{`(${
        amount * (item.healthStep ?? 0)
      })`}</span>
    </>
  )
}

function getHealthIncreaseLabel(item: Item) {
  return (
    <>
      <span className="font-bold text-white">{item.name}</span>{' '}
      <span className="text-gray-300">({item.health})</span>
    </>
  )
}

function getHealthPercentLabel(item: Item) {
  return (
    <>
      <span className="font-bold text-white">
        {item.category === 'relicfragment'
          ? `Mythic ${item.name} Relic Fragment`
          : item.name}
      </span>{' '}
      <span className="text-gray-300">
        ({((item.healthPercent ?? 0) * 100).toFixed(2)}%)
      </span>
    </>
  )
}

function getHealthPercentStepLabel(item: TraitItem) {
  return (
    <>
      <span className="font-bold text-white">{item.name}</span>{' '}
      <span className="text-gray-300">
        ({item.healthStepPercent} health per point)
      </span>
    </>
  )
}

function getHealthCapLabel(item: Item) {
  return (
    <>
      <span className="font-bold text-white">{item.name}</span>{' '}
      <span className="text-gray-300">({(item.healthCap ?? 0) * 100}%)</span>
    </>
  )
}

interface Props {
  open: boolean
  buildState: BuildState
  breakdown: {
    equippedHealthIncreaseItems: Item[]
    equippedHealthPercentItems: Item[]
    equippedHealthStepItems: TraitItem[]
    equippedHealthStepPercentItems: TraitItem[]
    equippedHealthCapItems: Item[]
    totalHealthCapReduction: number
    totalHealthIncrease: number
    totalHealthPercent: number
    totalHealthStep: number
    totalHealthStepPercent: number
  }
  onClose: () => void
}

export function HealthBreakdownDialog({
  open,
  buildState,
  breakdown,
  onClose,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="sm">
      <BaseDialogTitle>Health Breakdown</BaseDialogTitle>
      <BaseDialogDescription>
        View a breakdown of items contributing to this health total.
      </BaseDialogDescription>

      <BaseDialogBody>
        <div className="text-left text-sm">
          <h3 className="text-md col-span-full my-2 font-semibold text-white">
            Base Health{' '}
            <span className="text-md font-bold text-white">100</span>
          </h3>

          {(breakdown.equippedHealthIncreaseItems.length > 0 ||
            breakdown.equippedHealthStepItems.length > 0) && (
            <Section
              total={breakdown.totalHealthIncrease + breakdown.totalHealthStep}
              listItems={
                <>
                  {breakdown.equippedHealthIncreaseItems.map((item) => (
                    <ListItem key={item.id}>
                      {getHealthIncreaseLabel(item)}
                    </ListItem>
                  ))}
                  {breakdown.equippedHealthStepItems.map((item) => (
                    <ListItem key={item.id}>
                      {getHealthStepLabel(buildState, item)}
                    </ListItem>
                  ))}
                </>
              }
            />
          )}

          {(breakdown.equippedHealthPercentItems.length > 0 ||
            breakdown.equippedHealthStepPercentItems.length > 0) && (
            <Section
              isPercent={true}
              total={
                (breakdown.totalHealthPercent +
                  breakdown.totalHealthStepPercent) *
                100
              }
              listItems={
                <>
                  {breakdown.equippedHealthPercentItems.map((item) => (
                    <ListItem key={item.id}>
                      {getHealthPercentLabel(item)}
                    </ListItem>
                  ))}
                  {breakdown.equippedHealthStepPercentItems.map((item) => (
                    <ListItem key={item.id}>
                      {getHealthPercentStepLabel(item)}
                    </ListItem>
                  ))}
                </>
              }
            />
          )}

          {breakdown.equippedHealthCapItems.length > 0 && (
            <Section
              isPercent={true}
              total={breakdown.totalHealthCapReduction * 100}
              listItems={
                <>
                  {breakdown.equippedHealthCapItems.map((item) => (
                    <ListItem key={item.id}>{getHealthCapLabel(item)}</ListItem>
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
