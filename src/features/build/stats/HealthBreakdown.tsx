import { Item } from '@/features/items/types'
import { TraitItem } from '@/features/items/types/TraitItem'
import { Dialog } from '@/features/ui/Dialog'

import { BuildState } from '../types'
import { ListItem } from './ListItem'
import { Section } from './Section'

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
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
}

export function HealthBreakdownDialog({
  buildState,
  open,
  breakdown,
  onClose,
}: Props) {
  function getHealthStepLabel(item: TraitItem) {
    const amount = buildState.items.trait.find((t) => t.name === item.name)
      ?.amount

    return (
      <>
        <span className="font-bold text-white">{item.name}</span>{' '}
        <span className="text-gray-300">
          ({amount} points x {item.healthStep} health per point)
        </span>
      </>
    )
  }

  function getHealthIncreaseLabel(item: Item) {
    return (
      <>
        <span className="font-bold text-white">{item.name}</span>{' '}
        <span className="text-gray-300">({item.health} health)</span>
      </>
    )
  }

  function getHealthPercentLabel(item: Item) {
    return (
      <>
        <span className="font-bold text-white">
          {item.name} {item.category === 'relicfragment' && 'Relic Fragment'}
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

  return (
    <Dialog
      title="Health Breakdown"
      open={open}
      onClose={onClose}
      maxWidthClass="max-w-sm"
    >
      <div className="text-left text-xs">
        <h2 className="col-span-full mb-2 text-xs font-semibold text-purple-500">
          Base Health Amount:{' '}
          <span className="text-sm font-bold text-purple-400">100</span>
        </h2>
        {(breakdown.equippedHealthIncreaseItems.length > 0 ||
          breakdown.equippedHealthStepItems.length > 0) && (
          <Section
            label="Items that increase health by a fixed amount"
            total={breakdown.totalHealthIncrease + breakdown.totalHealthStep}
            listItems={
              <>
                {breakdown.equippedHealthIncreaseItems.map((item) => (
                  <ListItem key={item.id}>
                    {getHealthIncreaseLabel(item)}
                  </ListItem>
                ))}
                {breakdown.equippedHealthStepItems.map((item) => (
                  <ListItem key={item.id}>{getHealthStepLabel(item)}</ListItem>
                ))}
              </>
            }
          />
        )}

        {(breakdown.equippedHealthPercentItems.length > 0 ||
          breakdown.equippedHealthStepPercentItems.length > 0) && (
          <Section
            label="Items that increase health by a percentage"
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
            label="Items that cap health"
            totalLabel="Total Cap"
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
    </Dialog>
  )
}
