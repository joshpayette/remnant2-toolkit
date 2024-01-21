import { Item } from '@/app/(types)'
import { BuildState } from '@/app/(types)/build'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import Image from 'next/image'

function getItemsByKey(
  buildState: BuildState,
  key:
    | 'armor'
    | 'armorPercent'
    | 'health'
    | 'healthPercent'
    | 'weight'
    | 'weightPercent'
    | 'fireResistance'
    | 'fireResistancePercent'
    | 'blightResistance'
    | 'blightResistancePercent'
    | 'shockResistance'
    | 'shockResistancePercent'
    | 'bleedResistance'
    | 'bleedResistancePercent'
    | 'toxinResistance'
    | 'toxinResistancePercent',
) {
  const items: Item[] = []
  buildState.items.helm !== null &&
    buildState.items.helm[key] &&
    items.push(buildState.items.helm)
  buildState.items.torso !== null &&
    buildState.items.torso[key] &&
    items.push(buildState.items.torso)
  buildState.items.legs !== null &&
    buildState.items.legs[key] &&
    items.push(buildState.items.legs)
  buildState.items.gloves !== null &&
    buildState.items.gloves[key] &&
    items.push(buildState.items.gloves)
  buildState.items.amulet !== null &&
    buildState.items.amulet[key] &&
    items.push(buildState.items.amulet)
  buildState.items.relic !== null &&
    buildState.items.relic[key] &&
    items.push(buildState.items.relic)
  buildState.items.ring &&
    buildState.items.ring.forEach((ring) => {
      ring?.[key] && items.push(ring)
    })
  buildState.items.relicfragment &&
    buildState.items.relicfragment.forEach((fragment) => {
      fragment?.[key] && items.push(fragment)
    })
  buildState.items.weapon &&
    buildState.items.weapon.forEach((weapon) => {
      weapon?.[key] && items.push(weapon)
    })
  buildState.items.mutator &&
    buildState.items.mutator.forEach((mutator) => {
      mutator?.[key] && items.push(mutator)
    })
  buildState.items.mod &&
    buildState.items.mod.forEach((mod) => {
      mod?.[key] && items.push(mod)
    })
  buildState.items.trait &&
    buildState.items.trait.forEach((trait) => {
      trait?.[key] && items.push(trait)
    })
  buildState.items.concoction &&
    buildState.items.concoction.forEach((concoction) => {
      concoction?.[key] && items.push(concoction)
    })
  buildState.items.consumable &&
    buildState.items.consumable.forEach((consumable) => {
      consumable?.[key] && items.push(consumable)
    })

  return items
}

function getItemsWithStep(
  buildState: BuildState,
  key: 'armorStep' | 'healthStep',
) {
  const items: TraitItem[] = []
  buildState.items.trait &&
    buildState.items.trait.forEach((trait) => {
      trait?.[key] && items.push(trait)
    })
  return items
}

function getTotalArmor(buildState: BuildState) {
  // all equipped items that increase armor
  const equippedArmorIncreaseItems = getItemsByKey(buildState, 'armor')
  // all equipped items that increase armor by a percentage
  const equippedArmorPercentItems = getItemsByKey(buildState, 'armorPercent')
  // all equipped items that increase
  const equippedArmorStepItems = getItemsWithStep(buildState, 'armorStep')

  const totalArmorIncrease = equippedArmorIncreaseItems.reduce(
    (acc, item) => acc + (item.armor ?? 0),
    0,
  )
  const totalArmorPercent = equippedArmorPercentItems.reduce(
    (acc, item) => acc + (item.armorPercent ?? 0),
    0,
  )
  const totalArmorStep = equippedArmorStepItems.reduce(
    (acc, item) => acc + (item.armorStep * item.amount ?? 0),
    0,
  )

  const combinedPercent = totalArmorPercent + totalArmorStep
  const totalArmorIncreasePercent = totalArmorIncrease * combinedPercent
  const totalArmor = totalArmorIncrease + totalArmorIncreasePercent
  return totalArmor.toFixed(2)
}

function getTotalWeight(buildState: BuildState) {
  const itemsWithWeight = getItemsByKey(buildState, 'weight')
  const itemsWithWeightPercent = getItemsByKey(buildState, 'weightPercent')

  const totalItemWeight = itemsWithWeight.reduce(
    (acc, item) => acc + (item?.weight ?? 0),
    0,
  )

  const totalItemWeightPercent = itemsWithWeightPercent.reduce(
    (acc, item) => acc + (item?.weightPercent ?? 0),
    0,
  )

  const totalWeight =
    totalItemWeightPercent > 0
      ? totalItemWeight * totalItemWeightPercent
      : totalItemWeight
  return totalWeight.toFixed(2)
}

function getTotalResistances(
  buildState: BuildState,
  resistance: 'fire' | 'blight' | 'shock' | 'bleed' | 'toxin',
) {
  const itemsWithResistance = getItemsByKey(
    buildState,
    `${resistance}Resistance`,
  )
  const itemsWithResistancePercent = getItemsByKey(
    buildState,
    `${resistance}ResistancePercent`,
  )

  const totalItemResistance = itemsWithResistance.reduce(
    (acc, item) => acc + (item?.[`${resistance}Resistance`] ?? 0),
    0,
  )
  const totalItemResistancePercent = itemsWithResistancePercent.reduce(
    (acc, item) => acc + (item?.[`${resistance}ResistancePercent`] ?? 0),
    0,
  )

  const totalResistanceIncrease =
    totalItemResistance * totalItemResistancePercent
  const totalResistance = totalItemResistance + totalResistanceIncrease
  return totalResistance
}

interface Props {
  buildState: BuildState
}

export default function Stats({ buildState }: Props) {
  const totalArmor = getTotalArmor(buildState)
  const totalWeight = getTotalWeight(buildState)
  const totalFireResistance = getTotalResistances(buildState, 'fire')
  const totalBlightResistance = getTotalResistances(buildState, 'blight')
  const totalShockResistance = getTotalResistances(buildState, 'shock')
  const totalBleedResistance = getTotalResistances(buildState, 'bleed')
  const totalToxinResistance = getTotalResistances(buildState, 'toxin')

  return (
    <dl className="flex w-full flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Armor</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalArmor}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Weight</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalWeight}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/bleed_resistance.png`}
              alt="Bleed Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalBleedResistance}
            </span>
          </div>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/fire_resistance.png`}
              alt="Fire Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalFireResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/shock_resistance.png`}
              alt="Shock Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalShockResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/toxin_resistance.png`}
              alt="Toxin Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalToxinResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/blight_resistance.png`}
              alt="Blight Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalBlightResistance}
            </span>
          </p>
        </div>
      </dd>
    </dl>
  )
}
