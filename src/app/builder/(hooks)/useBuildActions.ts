import { useState } from 'react'
import { toast } from 'react-toastify'
import copy from 'clipboard-copy'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import useBuildScreenshot from './useBuildScreenshot'
import useBuildSearchParams from './useBuildSearchParams'
import { useRouter } from 'next/navigation'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { BuildState } from '@/app/(types)'
import { GenericItem } from '@/app/(types)/GenericItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'
import { TraitItem } from '@/app/(types)/TraitItem'

export default function useBuildActions() {
  // Hooks for monitoring the URL query string
  const router = useRouter()

  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const [showLabels, setShowLabels] = useState(builderStorage.showLabels)
  function handleToggleLabels() {
    setShowLabels(!showLabels)
    setBuilderStorage({
      ...builderStorage,
      showLabels: !showLabels,
    })
  }

  const [showControls, setShowControls] = useState(builderStorage.showControls)
  function handleToggleControls() {
    setShowControls(!showControls)
    setBuilderStorage({
      ...builderStorage,
      showControls: !showControls,
    })
  }

  function handleCopyBuildUrl() {
    copy(window.location.href)
    toast.success('Copied Build URL to clipboard')
  }

  function handleEditBuild(buildState: BuildState) {
    const { items } = buildState

    let editBuildUrl = `/builder?`
    editBuildUrl += `name=${buildState.name}`

    editBuildUrl += items.helm && `&helm=${ArmorItem.toParams(items.helm)}`
    editBuildUrl += items.torso && `&torso=${ArmorItem.toParams(items.torso)}`
    editBuildUrl +=
      items.gloves && `&gloves=${ArmorItem.toParams(items.gloves)}`
    editBuildUrl += items.legs && `&legs=${ArmorItem.toParams(items.legs)}`

    editBuildUrl +=
      items.relic && `&relic=${GenericItem.toParamsFromSingle(items.relic)}`
    editBuildUrl +=
      items.relicfragment &&
      `&relicfragment=${GenericItem.toParamsFromArray(items.relicfragment)}`

    editBuildUrl +=
      items.weapon && `&weapon=${WeaponItem.toParams(items.weapon)}`
    editBuildUrl +=
      items.mod && `&mod=${GenericItem.toParamsFromArray(items.mod)}`
    editBuildUrl +=
      items.mutator && `&mutator=${MutatorItem.toParams(items.mutator)}`

    editBuildUrl +=
      items.amulet && `&amulet=${GenericItem.toParamsFromSingle(items.amulet)}`
    editBuildUrl +=
      items.ring && `&ring=${GenericItem.toParamsFromArray(items.ring)}`

    editBuildUrl +=
      items.archtype &&
      `&archtype=${GenericItem.toParamsFromArray(items.archtype)}`
    editBuildUrl +=
      items.skill && `&skill=${GenericItem.toParamsFromArray(items.skill)}`

    editBuildUrl +=
      items.concoction &&
      `&concoction=${GenericItem.toParamsFromArray(items.concoction)}`
    editBuildUrl +=
      items.consumable &&
      `&consumable=${GenericItem.toParamsFromArray(items.consumable)}`

    editBuildUrl += items.trait && `&trait=${TraitItem.toParams(items.trait)}`

    router.push(editBuildUrl)
  }

  return {
    showLabels,
    setShowLabels,
    handleToggleLabels,
    showControls,
    setShowControls,
    handleToggleControls,
    handleCopyBuildUrl,
    handleEditBuild,
  }
}
