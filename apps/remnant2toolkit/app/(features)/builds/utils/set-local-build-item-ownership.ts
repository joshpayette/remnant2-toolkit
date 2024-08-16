import type { BuildState } from '@/app/(types)/builds'

/**
 * If the user is not authenticated, we need to determine the item ownership
 * preference based on the localstorage
 */
export function setLocalBuildItemOwnership({
  buildState,
  discoveredItemIds,
  sessionStatus,
}: {
  buildState: BuildState
  discoveredItemIds: string[]
  sessionStatus: 'authenticated' | 'loading' | 'unauthenticated'
}): BuildState {
  // If user is not logged in, determine item ownership preference based on the localstorage
  if (sessionStatus === 'unauthenticated') {
    if (buildState.items.helm) {
      buildState.items.helm.isOwned = discoveredItemIds.includes(
        buildState.items.helm.id,
      )
    }
    if (buildState.items.torso) {
      buildState.items.torso.isOwned = discoveredItemIds.includes(
        buildState.items.torso.id,
      )
    }

    if (buildState.items.legs) {
      buildState.items.legs.isOwned = discoveredItemIds.includes(
        buildState.items.legs.id,
      )
    }

    if (buildState.items.gloves) {
      buildState.items.gloves.isOwned = discoveredItemIds.includes(
        buildState.items.gloves.id,
      )
    }

    if (buildState.items.amulet) {
      buildState.items.amulet.isOwned = discoveredItemIds.includes(
        buildState.items.amulet.id,
      )
    }

    if (buildState.items.relic) {
      buildState.items.relic.isOwned = discoveredItemIds.includes(
        buildState.items.relic.id,
      )
    }

    if (buildState.items.ring) {
      buildState.items.ring.map((ring) => {
        if (!ring) return null
        ring.isOwned = discoveredItemIds.includes(ring.id)
      })
    }

    if (buildState.items.archetype) {
      buildState.items.archetype.map((archetype) => {
        if (!archetype) return null
        archetype.isOwned = discoveredItemIds.includes(archetype.id)
      })
    }

    if (buildState.items.concoction) {
      buildState.items.concoction.map((concoction) => {
        if (!concoction) return null
        concoction.isOwned = discoveredItemIds.includes(concoction.id)
      })
    }

    if (buildState.items.consumable) {
      buildState.items.consumable.map((consumable) => {
        if (!consumable) return null
        consumable.isOwned = discoveredItemIds.includes(consumable.id)
      })
    }

    if (buildState.items.mod) {
      buildState.items.mod.map((mod) => {
        if (!mod) return null
        mod.isOwned = discoveredItemIds.includes(mod.id)
      })
    }

    if (buildState.items.mutator) {
      buildState.items.mutator.map((mutator) => {
        if (!mutator) return null
        mutator.isOwned = discoveredItemIds.includes(mutator.id)
      })
    }

    if (buildState.items.relicfragment) {
      buildState.items.relicfragment.map((fragment) => {
        if (!fragment) return null
        fragment.isOwned = discoveredItemIds.includes(fragment.id)
      })
    }

    if (buildState.items.trait) {
      buildState.items.trait.map((trait) => {
        if (!trait) return null
        trait.isOwned = discoveredItemIds.includes(trait.id)
      })
    }

    if (buildState.items.weapon) {
      buildState.items.weapon.map((weapon) => {
        if (!weapon) return null
        weapon.isOwned = discoveredItemIds.includes(weapon.id)
      })
    }
  }

  return buildState
}
