import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'
import { isErrorResponse } from '@/types'
import {
  addReportForBuild,
  createBuild,
  removeReportForBuild,
} from '../../../app/builder/actions'
import { getArrayOfLength } from '@/lib/utils'
import {
  getConcoctionSlotCount,
  getRandomItem,
  initialBuildState,
} from '../lib/build'
import { BuildState } from '@/features/build/types'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { GenericItem } from '@/features/items/types/GenericItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { remnantItems } from '@/features/items/data'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { TraitItem } from '@/features/items/types/TraitItem'

export default function useBuildActions() {
  const router = useRouter()

  // iOS does not automatically download images, so we need to
  // make a clickable link available
  const [imageLink, setImageLink] = useState<string | null>(null)

  // Need to show a loading indicator when exporting the image
  const [imageExportLoading, setImageExportLoading] = useState(false)

  // Used to inform the UI when a screenshot is being taken
  // so that it can resize on mobile devices, show logo, and more.
  const [isScreenshotMode, setIsScreenshotMode] = useState<{
    el: HTMLDivElement | null
    imageFileName: string
  } | null>(null)

  function handleClearImageLink() {
    setImageLink(null)
  }

  function handleCopyBuildUrl(url: string | null, message?: string) {
    if (!url) {
      toast.error('Could not copy build url. Try again.')
      return
    }
    const defaultMessage =
      'Build url copied to clipboard. Sign in next time for a shorter URL!'
    copy(url)
    toast.success(!message ? defaultMessage : message)
  }

  async function handleDuplicateBuild(buildState: BuildState) {
    const newBuildState = JSON.parse(JSON.stringify(buildState)) as BuildState
    newBuildState.name = `${buildState.name} (copy)`
    newBuildState.isPublic = false
    const response = await createBuild(JSON.stringify(newBuildState))
    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error duplicating build. Please try again later.')
    } else {
      toast.success(response.message)
      router.push(`/builder/${response.buildId}`)
    }
  }

  function handleRandomBuild(): BuildState {
    const randomBuild: BuildState = JSON.parse(
      JSON.stringify(initialBuildState),
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
    }) as GenericItem
    randomBuild.items.relic = randomRelic

    // relic fragments
    getArrayOfLength(3).forEach((_, index) => {
      const randomRelicFragment = getRandomItem(randomBuild, {
        category: 'relicfragment',
        index,
      }) as GenericItem
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
        const linkedMod = remnantItems.find(
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
        category: 'archtype',
        index,
      }) as GenericItem
      if (!randomArchtype) {
        throw new Error(`Could not find random archtype for ${index}`)
      }
      randomBuild.items.archtype[index] = randomArchtype

      // archtype skills
      const randomSkill = getRandomItem(randomBuild, {
        category: 'skill',
        index,
      }) as GenericItem
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
    }) as GenericItem
    randomBuild.items.amulet = randomAmulet

    // rings
    getArrayOfLength(4).forEach((_, index) => {
      const randomRing = getRandomItem(randomBuild, {
        category: 'ring',
        index,
      }) as GenericItem
      randomBuild.items.ring[index] = randomRing
    })
    // Traits
    // First assign the primary archtype traits
    const primaryArchtype = randomBuild.items.archtype[0] as GenericItem
    primaryArchtype.linkedItems?.traits?.forEach((trait, index) => {
      const traitItem = remnantItems.find(
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

    const allTraits = remnantItems.filter(
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
      }) as GenericItem
      randomBuild.items.consumable[index] = randomConsumable
    })
    // Concotions
    // do this last to determine concoction count
    // add 1 to the concoction count to account for the default slot
    getArrayOfLength(getConcoctionSlotCount(randomBuild) + 1).forEach(
      (_, index) => {
        console.info('selectingConcoction')
        const randomConcoction = getRandomItem(randomBuild, {
          category: 'concoction',
          index,
        }) as GenericItem
        randomBuild.items.concoction[index] = randomConcoction
      },
    )

    return randomBuild
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
      const image = canvas.toDataURL('image/png', 1.0)
      setImageLink(image)
      setIsScreenshotMode(null)

      // Need a fakeLink to trigger the download
      // This does not work for ios
      const fakeLink = window.document.createElement('a')
      fakeLink.download = imageFileName
      fakeLink.href = image
      document.body.appendChild(fakeLink)
      fakeLink.click()
      document.body.removeChild(fakeLink)
      fakeLink.remove()
    }
    setImageExportLoading(true)
    setTimeout(exportImage, 1000)
  }, [isScreenshotMode, router])

  async function handleReportBuild(build: BuildState, newReported: boolean) {
    // prompt for the reason
    const reason = newReported
      ? prompt('Please enter a reason for reporting this build.')
      : null

    if (newReported && !reason) {
      toast.error('You must enter a reason for reporting this build.')
      return
    }

    const response = newReported
      ? await addReportForBuild(
          JSON.stringify({
            buildId: build.buildId,
            reason,
          }),
        )
      : await removeReportForBuild(JSON.stringify({ buildId: build.buildId }))

    return response
  }

  function handleScrollToDetailedView(el: HTMLDivElement | null) {
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    handleClearImageLink,
    handleCopyBuildUrl,
    handleDuplicateBuild,
    handleRandomBuild,
    handleImageExport,
    handleReportBuild,
    handleScrollToDetailedView,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
    imageLink,
    imageExportLoading,
  }
}
