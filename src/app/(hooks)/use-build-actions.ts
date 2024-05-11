import html2canvas from 'html2canvas'
import cloneDeep from 'lodash.clonedeep'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { modItems } from '@/app/(data)/items/mod-items'
import { traitItems } from '@/app/(data)/items/trait-items'
import { Item } from '@/app/(data)/items/types'
import { AmuletItem } from '@/app/(data)/items/types/AmuletItem'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { ConcoctionItem } from '@/app/(data)/items/types/ConcoctionItem'
import { ConsumableItem } from '@/app/(data)/items/types/ConsumableItem'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { RelicItem } from '@/app/(data)/items/types/RelicItem'
import { RingItem } from '@/app/(data)/items/types/RingItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { BuildState, ItemCategory } from '@/app/(types)/builds'
import { getConcoctionSlotCount } from '@/app/(utils)/builds/get-concoction-slot-count'
import { getItemListForSlot } from '@/app/(utils)/builds/get-item-list-for-slot'
import { getArrayOfLength } from '@/app/(utils)/get-array-of-length'
import { isErrorResponse } from '@/app/(utils)/is-error-response'

import { addVoteForBuild } from '../(actions)/builds/add-vote-for-build'
import { createBuild } from '../(actions)/builds/create-build'
import { deleteBuild } from '../(actions)/builds/delete-build'
import { removeVoteForBuild } from '../(actions)/builds/remove-vote-for-build'
import { INITIAL_BUILD_STATE } from '../(data)/builds/constants'

function getRandomItem(
  buildState: BuildState,
  selectedItem: {
    category: ItemCategory | null
    index?: number // Used for slots that can have multiple items, such as rings
  },
): Item {
  let items = getItemListForSlot(buildState, selectedItem)
  const randomIndex = Math.floor(Math.random() * items.length)
  const randomItem = items[randomIndex]
  return randomItem
}

export function useBuildActions() {
  const router = useRouter()

  // iOS does not automatically download images, so we need to
  // make a clickable link available
  const [imageDownloadInfo, setImageDownloadInfo] = useState<{
    imageLink: string
    imageName: string
  } | null>(null)

  // Need to show a loading indicator when exporting the image
  const [imageExportLoading, setImageExportLoading] = useState(false)

  // Used to inform the UI when a screenshot is being taken
  // so that it can resize on mobile devices, show logo, and more.
  const [isScreenshotMode, setIsScreenshotMode] = useState<{
    el: HTMLDivElement | null
    imageFileName: string
  } | null>()

  function handleClearImageDownloadInfo() {
    setImageDownloadInfo(null)
  }

  async function handleDeleteBuild({
    buildId,
    onDelete,
  }: {
    buildId: string
    onDelete?: (buildId: string) => void
  }) {
    const response = await deleteBuild(buildId)

    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error deleting build. Please try again later.')
    } else {
      toast.success(response.message)
      if (onDelete) onDelete(buildId)
    }
  }

  async function handleDuplicateBuild(buildState: BuildState) {
    const newBuildState = cloneDeep(buildState)
    newBuildState.name = `${buildState.name} (copy)`
    newBuildState.isPublic = false
    newBuildState.isMember = Boolean(newBuildState.isMember)
    newBuildState.upvoted = Boolean(newBuildState.upvoted)
    newBuildState.totalUpvotes =
      typeof newBuildState.totalUpvotes === 'string'
        ? 0
        : newBuildState.totalUpvotes
    newBuildState.reported = Boolean(newBuildState.reported)
    const response = await createBuild(JSON.stringify(newBuildState))
    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error duplicating build. Please try again later.')
    } else {
      toast.success(response.message)
      router.push(`/builder/${response.buildId}`)
    }
  }

  async function handleFavoriteBuild(
    buildState: BuildState,
    userId: string | undefined,
  ) {
    if (!userId) return

    if (buildState.createdById === userId) {
      toast.error('You cannot vote/unvote for your own build.')
      return
    }

    const newVote = !buildState.upvoted

    const response = newVote
      ? await addVoteForBuild(JSON.stringify({ buildId: buildState.buildId }))
      : await removeVoteForBuild(
          JSON.stringify({ buildId: buildState.buildId }),
        )

    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error voting for build. Please try again later.')
    } else {
      toast.success(
        newVote
          ? 'Successfully favorited build! You can find it in your profile.'
          : 'Successfully removed favorite!',
      )
      router.refresh()
    }
  }

  function handleImageExport(el: HTMLDivElement | null, imageFileName: string) {
    // We do this to trigger the effect below
    setIsScreenshotMode({ el, imageFileName })
  }
  /**
   * Export the build as an image
   * We do this in a useEffect so that the UI can update,
   * allowing us to show the logo, expand the build on mobile for
   * better screenshots, etc.
   */
  useEffect(() => {
    async function exportImage() {
      setImageExportLoading(false)
      if (!isScreenshotMode) return
      const { el, imageFileName } = isScreenshotMode

      if (!el) return

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      const base64Image = canvas.toDataURL('image/png', 1.0).split(',')[1]

      const response = await fetch('/api/imagekit', {
        method: 'POST',
        body: JSON.stringify({
          base64Image,
          imageName: imageFileName,
        }),
      })

      if (!response.ok) {
        toast.error('Failed to upload image to Imgur.')
        return
      }

      const { imageLink } = await response.json()

      setImageDownloadInfo({
        imageLink,
        imageName: imageFileName,
      })
      setIsScreenshotMode(null)
    }
    if (!isScreenshotMode) return
    setImageExportLoading(true)
    setTimeout(exportImage, 1000)
  }, [isScreenshotMode, router])

  function handleRandomBuild(): BuildState {
    const randomBuild: BuildState = JSON.parse(
      JSON.stringify(INITIAL_BUILD_STATE),
    )

    // Randomize the name
    randomBuild.name = 'Random Build'
    randomBuild.description = 'Randomized build from the build generator'
    randomBuild.isPublic = false

    // helm
    const randomHelm = getRandomItem(randomBuild, {
      category: 'helm',
    }) as ArmorItem
    randomBuild.items.helm = randomHelm
    // torso
    const randomTorso = getRandomItem(randomBuild, {
      category: 'torso',
    }) as ArmorItem
    randomBuild.items.torso = randomTorso
    // legs
    const randomLegs = getRandomItem(randomBuild, {
      category: 'legs',
    }) as ArmorItem
    randomBuild.items.legs = randomLegs
    // gloves
    const randomGloves = getRandomItem(randomBuild, {
      category: 'gloves',
    }) as ArmorItem
    randomBuild.items.gloves = randomGloves

    // relic
    const randomRelic = getRandomItem(randomBuild, {
      category: 'relic',
    }) as RelicItem
    randomBuild.items.relic = randomRelic

    // relic fragments
    getArrayOfLength(3).forEach((_, index) => {
      const randomRelicFragment = getRandomItem(randomBuild, {
        category: 'relicfragment',
        index,
      }) satisfies RelicFragmentItem
      randomBuild.items.relicfragment[index] = randomRelicFragment
    })

    // weapons
    getArrayOfLength(3).forEach((_, index) => {
      const randomWeapon = getRandomItem(randomBuild, {
        category: 'weapon',
        index,
      }) as WeaponItem
      randomBuild.items.weapon[index] = randomWeapon
      // weapon mods
      if (randomWeapon.linkedItems?.mod) {
        const linkedMod = modItems.find(
          (item) => item.name === randomWeapon.linkedItems?.mod?.name,
        )
        if (!linkedMod) {
          throw new Error(`Could not find linked mod for ${randomWeapon.name}`)
        }
        randomBuild.items.mod[index] = linkedMod as ModItem
      } else {
        // if the weapon is melee (index 1), no mods can be equipped
        // melee can only have linked mods
        if (index !== 1) {
          const randomMod = getRandomItem(randomBuild, {
            category: 'mod',
            index,
          }) as ModItem
          randomBuild.items.mod[index] = randomMod
        }
      }
      // weapon mutators
      const randomMutator = getRandomItem(randomBuild, {
        category: 'mutator',
        index,
      }) as MutatorItem
      randomBuild.items.mutator[index] = randomMutator
    })

    // archtypes
    getArrayOfLength(2).forEach((_, index) => {
      const randomArchtype = getRandomItem(randomBuild, {
        category: 'archetype',
        index,
      }) as ArchetypeItem
      if (!randomArchtype) {
        throw new Error(`Could not find random archtype for ${index}`)
      }
      randomBuild.items.archetype[index] = randomArchtype

      // archtype skills
      const randomSkill = getRandomItem(randomBuild, {
        category: 'skill',
        index,
      }) as SkillItem
      if (!randomSkill) {
        throw new Error(
          `Could not find random skill for ${randomArchtype.name}`,
        )
      }
      randomBuild.items.skill[index] = randomSkill
    })

    // amulet
    const randomAmulet = getRandomItem(randomBuild, {
      category: 'amulet',
    }) as AmuletItem
    randomBuild.items.amulet = randomAmulet

    // rings
    getArrayOfLength(4).forEach((_, index) => {
      const randomRing = getRandomItem(randomBuild, {
        category: 'ring',
        index,
      }) as RingItem
      randomBuild.items.ring[index] = randomRing
    })
    // Traits
    // First assign the primary archtype traits
    const primaryArchetype = randomBuild.items.archetype[0] as ArchetypeItem
    primaryArchetype.linkedItems?.traits?.forEach((trait, index) => {
      const traitItem = traitItems.find(
        (item) => item.name === trait.name,
      ) as TraitItem
      if (!traitItem) {
        throw new Error(`Could not find trait ${trait.name}`)
      }
      randomBuild.items.trait[index] = {
        ...traitItem,
        amount: trait.amount,
      }
    })
    // Keep assigning traits until we have 110 total points
    let totalTraitPoints = randomBuild.items.trait.reduce(
      (acc: number, currentValue: TraitItem) => acc + currentValue.amount,
      0,
    )

    const allTraits = traitItems.filter(
      (item) => item.category === 'trait',
    ) as TraitItem[]

    while (totalTraitPoints < 110) {
      const randomTrait =
        allTraits[Math.floor(Math.random() * allTraits.length)]

      randomTrait.amount = 10
      if (totalTraitPoints + randomTrait.amount > 110) {
        randomTrait.amount = 110 - totalTraitPoints
      }
      // if the trait is not already in the build, add it
      // otherwise we will just increase the amount
      if (
        !randomBuild.items.trait.find(
          (trait: TraitItem) => trait.name === randomTrait.name,
        )
      ) {
        randomBuild.items.trait.push(randomTrait)
      } else {
        const traitIndex = randomBuild.items.trait.findIndex(
          (trait: TraitItem) => trait.name === randomTrait.name,
        )
        randomBuild.items.trait[traitIndex].amount = randomTrait.amount
      }

      totalTraitPoints = randomBuild.items.trait.reduce(
        (acc: number, currentValue: TraitItem) => acc + currentValue.amount,
        0,
      )
    }

    // consumables
    getArrayOfLength(4).forEach((_, index) => {
      const randomConsumable = getRandomItem(randomBuild, {
        category: 'consumable',
        index,
      }) as ConsumableItem
      randomBuild.items.consumable[index] = randomConsumable
    })
    // Concotions
    // do this last to determine concoction count
    // add 1 to the concoction count to account for the default slot
    getArrayOfLength(getConcoctionSlotCount(randomBuild) + 1).forEach(
      (_, index) => {
        const randomConcoction = getRandomItem(randomBuild, {
          category: 'concoction',
          index,
        }) as ConcoctionItem
        randomBuild.items.concoction[index] = randomConcoction
      },
    )

    return randomBuild
  }

  return {
    handleClearImageDownloadInfo,
    handleDeleteBuild,
    handleDuplicateBuild,
    handleFavoriteBuild,
    handleRandomBuild,
    handleImageExport,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
    imageDownloadInfo,
    imageExportLoading,
  }
}
