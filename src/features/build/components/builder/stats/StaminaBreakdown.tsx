import { Item } from '@/features/items/types'
import { TraitItem } from '@/features/items/types/TraitItem'
import { Dialog } from '@/features/ui/Dialog'

import { BuildState } from '../../../types'
import { ListItem } from './ListItem'
import { Section } from './Section'

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
  breakdown: {
    equippedStaminaIncreaseItems: Item[]
    equippedStaminaPercentItems: Item[]
    equippedStaminaStepItems: TraitItem[]
    equippedStaminaStepPercentItems: TraitItem[]
    totalStaminaIncrease: number
    totalStaminaPercent: number
    totalStaminaStep: number
    totalStaminaStepPercent: number
  }
}

export function StaminaBreakdownDialog({
  buildState,
  open,
  breakdown,
  onClose,
}: Props) {
  function getStaminaStepLabel(item: TraitItem) {
    const amount =
      buildState.items.trait.find((t) => t.name === item.name)?.amount ?? 0

    return (
      <>
        <span className="font-bold text-white">{item.name}</span>{' '}
        <span className="text-gray-300">
          {`(${amount * item.staminaStep})`}
        </span>
      </>
    )
  }

  function getStaminaIncreaseLabel(item: Item) {
    return (
      <>
        <span className="font-bold text-white">{item.name}</span>{' '}
        <span className="text-gray-300">({item.stamina})</span>
      </>
    )
  }

  function getStaminaPercentLabel(item: Item) {
    return (
      <>
        <span className="font-bold text-white">
          {item.name}{' '}
          {item.category === 'relicfragment' && 'Mythic Relic Fragment'}
        </span>{' '}
        <span className="text-gray-300">
          ({((item.staminaPercent ?? 0) * 100).toFixed(2)}%)
        </span>
      </>
    )
  }

  function getStaminaPercentStepLabel(item: TraitItem) {
    return (
      <>
        <span className="font-bold text-white">{item.name}</span>{' '}
        <span className="text-gray-300">
          ({item.staminaStepPercent} stamina per point)
        </span>
      </>
    )
  }

  return (
    <Dialog
      title="Stamina Breakdown"
      open={open}
      onClose={onClose}
      maxWidthClass="max-w-sm"
    >
      <div className="text-left text-xs">
        <h2 className="col-span-full mb-2 text-xs font-semibold text-purple-500">
          Base Stamina:{' '}
          <span className="text-sm font-bold text-purple-400">100</span>
        </h2>
        {(breakdown.equippedStaminaIncreaseItems.length > 0 ||
          breakdown.equippedStaminaStepItems.length > 0) && (
          <Section
            total={breakdown.totalStaminaIncrease + breakdown.totalStaminaStep}
            listItems={
              <>
                {breakdown.equippedStaminaIncreaseItems.map((item) => (
                  <ListItem key={item.id}>
                    {getStaminaIncreaseLabel(item)}
                  </ListItem>
                ))}
                {breakdown.equippedStaminaStepItems.map((item) => (
                  <ListItem key={item.id}>{getStaminaStepLabel(item)}</ListItem>
                ))}
              </>
            }
          />
        )}

        {(breakdown.equippedStaminaPercentItems.length > 0 ||
          breakdown.equippedStaminaStepPercentItems.length > 0) && (
          <Section
            isPercent={true}
            total={
              (breakdown.totalStaminaPercent +
                breakdown.totalStaminaStepPercent) *
              100
            }
            listItems={
              <>
                {breakdown.equippedStaminaPercentItems.map((item) => (
                  <ListItem key={item.id}>
                    {getStaminaPercentLabel(item)}
                  </ListItem>
                ))}
                {breakdown.equippedStaminaStepPercentItems.map((item) => (
                  <ListItem key={item.id}>
                    {getStaminaPercentStepLabel(item)}
                  </ListItem>
                ))}
              </>
            }
          />
        )}
      </div>
    </Dialog>
  )
}
