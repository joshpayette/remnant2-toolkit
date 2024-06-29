import { StarIcon } from '@heroicons/react/24/solid'
import { BuildTags } from '@repo/db'
import { BaseInput } from '@repo/ui/base/input'
import { Link } from '@repo/ui/base/link'
import { cn } from '@repo/ui/classnames'
import { useCallback, useMemo, useState } from 'react'

import { FeaturedBuildBadge } from '@/app/(components)/builder/badges/featured-build-badge'
import { NewBuildBadge } from '@/app/(components)/builder/badges/new-build-badge'
import { PopularBuildBadge } from '@/app/(components)/builder/badges/popular-build-badge'
import { ItemButton } from '@/app/(components)/buttons/item-button'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { ItemSelectDialog } from '@/app/(components)/dialogs/item-select-dialog'
import { Logo } from '@/app/(components)/logo'
import {
  DEFAULT_TRAIT_AMOUNT,
  MAX_BUILD_TAGS,
} from '@/app/(data)/builds/constants'
import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { perkItems } from '@/app/(data)/items/perk-items'
import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState, ItemCategory } from '@/app/(types)/builds'
import { formatUpdatedAt } from '@/app/(utils)/builds/format-updated-at'
import {
  ArchetypeName,
  getArchetypeComboName,
} from '@/app/(utils)/builds/get-archetype-combo-name'
import { getConcoctionSlotCount } from '@/app/(utils)/builds/get-concoction-slot-count'
import { getItemListForSlot } from '@/app/(utils)/builds/get-item-list-for-slot'
import { isBuildNew } from '@/app/(utils)/builds/is-build-new'
import { isBuildPopular } from '@/app/(utils)/builds/is-build-popular'
import { getArrayOfLength } from '@/app/(utils)/get-array-of-length'
import { stripUnicode } from '@/app/(utils)/strip-unicode'

import { MemberFeatures } from './member-features'
import { Stats } from './stats/stats'
import { Traits } from './traits'

type BuilderProps = {
  buildState: BuildState
  isScreenshotMode: boolean
  showControls: boolean
  showCreatedBy?: boolean
  showMemberFeatures?: boolean
  totalUpvotes?: number
} & (
  | { isEditable: false; onUpdateBuildState?: never }
  | {
      isEditable: true
      onUpdateBuildState: ({
        category,
        value,
        scroll,
      }: {
        category: string
        value: string | Array<string | undefined> | BuildTags[]
        scroll?: boolean
      }) => void
    }
)

// #region Component

export function Builder({
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
  showCreatedBy = true,
  showMemberFeatures = true,
  onUpdateBuildState,
}: BuilderProps) {
  const concoctionSlotCount = getConcoctionSlotCount(buildState)
  const { isPopular, popularLevel } = isBuildPopular(buildState.totalUpvotes)
  const isNew = isBuildNew(buildState.createdAt) && showCreatedBy

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    category: ItemCategory | null
    index?: number
  }>({
    category: null,
  })

  /** If the item category is null, modal is closed */
  const isItemSelectModalOpen = Boolean(selectedItemSlot.category)

  // Tracks the item that the user is viewing information for
  const [infoItem, setInfoItem] = useState<Item | null>(null)
  const itemInfoOpen = Boolean(infoItem)

  /**
   * Returns a list of items that match the selected slot
   * This is passed to the ItemSelect modal to display the correct items
   */
  const itemListForSlot = useMemo(
    () => getItemListForSlot(buildState, selectedItemSlot),
    [selectedItemSlot, buildState],
  )

  /**
   * Fires when the user changes an item in the build.
   *
   * If the item is null, the item is removed from the build
   * and from the query string.
   *
   * If the item is not null, the item is added to the build
   * and the query string is updated.
   */
  const handleSelectItem = useCallback(
    (selectedItem: Item | null) => {
      if (!selectedItemSlot.category) return
      if (!onUpdateBuildState) return

      /**
       * The item index is used to determine which item in the array of items
       * for slots like rings and archetypes
       */
      const specifiedIndex = selectedItemSlot.index
      const isIndexSpecified = specifiedIndex !== undefined

      // If the item is null, remove the item from the build
      // and from the query string
      // If the item can be multiple, such as rings,
      // then remove the item at the specified index
      if (!selectedItem) {
        if (isIndexSpecified) {
          const buildItems = buildState.items[selectedItemSlot.category]

          if (!Array.isArray(buildItems)) return

          // We can't filter here because we want to preserve the index
          // If we filtered, the second archetype would become the first archetype
          // if you removed the first archetype
          const newBuildItems = buildItems.map((item, index) =>
            index === specifiedIndex ? null : item,
          )
          const newItemIds = newBuildItems.map((i) => i?.id ?? '')
          onUpdateBuildState({
            category: selectedItemSlot.category,
            value: newItemIds,
          })
        } else {
          onUpdateBuildState({
            category: selectedItemSlot.category,
            value: '',
          })
        }

        setSelectedItemSlot({ category: null })
        return
      }

      const categoryItemOrItems = buildState.items[selectedItemSlot.category]

      // If the item can be multiple, such as rings,
      // then add the item at the specified index
      if (Array.isArray(categoryItemOrItems)) {
        const buildItems = categoryItemOrItems

        const itemAlreadyInBuild = buildItems.find(
          (i) => i?.id === selectedItem.id,
        )
        if (itemAlreadyInBuild) return

        /** Used to add the new item to the array of items for this slot */
        const newBuildItems = [...buildItems]

        const specifiedIndex = selectedItemSlot.index
        const isIndexSpecified = specifiedIndex !== undefined

        isIndexSpecified
          ? (newBuildItems[specifiedIndex] = selectedItem)
          : newBuildItems.push(selectedItem)

        // If the item is a trait, then we need to add the amount
        if (selectedItemSlot.category === 'trait') {
          const newTraitItemParams = TraitItem.toParams(
            newBuildItems as TraitItem[],
          )

          onUpdateBuildState({ category: 'trait', value: newTraitItemParams })
          setSelectedItemSlot({ category: null })
          return
        }

        // If we got here, add the item to the build
        const newItemIds = newBuildItems.map((i) =>
          i?.optional ? `${i?.id}${OPTIONAL_ITEM_SYMBOL}` : i?.id,
        )
        onUpdateBuildState({
          category: selectedItem.category,
          value: newItemIds,
        })
        setSelectedItemSlot({ category: null })
        return
      }

      // If the item is not null, add the item to the build
      const buildItem = categoryItemOrItems

      const itemAlreadyInBuild = buildItem?.id === selectedItem.id
      if (itemAlreadyInBuild) return

      onUpdateBuildState({
        category: selectedItem.category,
        value: selectedItem.id,
      })
      setSelectedItemSlot({ category: null })
    },
    [buildState.items, selectedItemSlot, onUpdateBuildState],
  )

  function handleToggleOptional(selectedItem: Item, optional: boolean) {
    if (!isEditable) return
    if (!onUpdateBuildState) return

    const categoryItemOrItems = buildState.items[selectedItem.category]
    if (!categoryItemOrItems) return

    if (Array.isArray(categoryItemOrItems)) {
      const newBuildItems = (categoryItemOrItems as Item[]).map((item) => {
        if (item?.id === selectedItem?.id) {
          return { ...item, optional }
        }
        return item
      })

      const newItemIds = newBuildItems.map((i) =>
        i?.optional ? `${i?.id}${OPTIONAL_ITEM_SYMBOL}` : i?.id,
      )

      onUpdateBuildState({
        category: selectedItem.category,
        value: newItemIds,
      })
      return
    }

    const newBuildItem = { ...categoryItemOrItems, optional }
    onUpdateBuildState({
      category: selectedItem.category,
      value: newBuildItem.optional
        ? `${newBuildItem.id}${OPTIONAL_ITEM_SYMBOL}`
        : newBuildItem.id,
    })
  }

  function handleChangeBuildLink(newBuildLink: string) {
    if (!isEditable) return
    if (!onUpdateBuildState) return
    onUpdateBuildState({ category: 'buildLink', value: newBuildLink })
  }

  function handleChangeDescription(description: string) {
    if (!isEditable) return
    if (!onUpdateBuildState) return
    onUpdateBuildState({ category: 'description', value: description })
  }

  function handleToggleIsPublic(isPublic: boolean) {
    if (!isEditable) return
    if (!onUpdateBuildState) return
    onUpdateBuildState({
      category: 'isPublic',
      value: isPublic ? 'true' : 'false',
    })
  }

  function handleToggleIsPatchAffected(isPatchAffected: boolean) {
    if (!isEditable) return
    if (!onUpdateBuildState) return
    onUpdateBuildState({
      category: 'isPatchAffected',
      value: isPatchAffected ? 'true' : 'false',
    })
  }

  function handleChangeBuildTags(tags: BuildTags[]) {
    if (!isEditable) return
    if (!onUpdateBuildState) return

    onUpdateBuildState({
      category: 'tags',
      value:
        tags.length > MAX_BUILD_TAGS ? tags.slice(0, MAX_BUILD_TAGS) : tags,
    })
  }

  function handleShowInfo(item: Item) {
    setInfoItem(item)
  }

  function handleItemSlotClick(category: ItemCategory, index?: number) {
    if (!isEditable) return
    setSelectedItemSlot({ category, index })
  }

  function handleChangeBuildName(newBuildName: string) {
    if (!isEditable) return
    if (!onUpdateBuildState) return
    onUpdateBuildState({ category: 'name', value: newBuildName })
  }

  function handleRemoveTrait(traitItem: TraitItem) {
    if (!isEditable) return
    if (!onUpdateBuildState) return

    const newTraitItems = buildState.items.trait.filter(
      (i) => i.name !== traitItem.name,
    )
    const newTraitItemParams = TraitItem.toParams(newTraitItems)
    onUpdateBuildState({ category: 'trait', value: newTraitItemParams })
  }

  function handleUpdateTraitAmount(newTraitItem: TraitItem) {
    if (!isEditable) return
    if (!onUpdateBuildState) return

    const newTraitItems = buildState.items.trait.map((traitItem) => {
      if (traitItem.name === newTraitItem.name) {
        return newTraitItem
      }
      return traitItem
    })

    // validate the amounts
    const validatedTraitItems = newTraitItems.map((traitItem) => {
      let validAmount = traitItem.amount

      // if this is the linked trait to an archetype,
      // the default should be the linked amount
      let defaultAmount = DEFAULT_TRAIT_AMOUNT

      const primaryArchetype = buildState.items.archetype[0]
      const secondaryArchetype = buildState.items.archetype[1]

      // if this is the linked trait for the primary archetype,
      // make sure the amount is not less than the minimum allowed
      if (primaryArchetype?.name) {
        const linkedTrait = primaryArchetype?.linkedItems?.traits?.find(
          (linkedTrait) => linkedTrait.name === traitItem.name,
        )
        if (linkedTrait && traitItem.name === linkedTrait.name) {
          if (validAmount < linkedTrait.amount) {
            validAmount = linkedTrait.amount
            defaultAmount = linkedTrait.amount
          }
        }
      }
      // if this is the linked trait for the secondary archetype
      // make sure the amount is not less than the minimum allowed
      if (secondaryArchetype?.name) {
        const linkedTrait = secondaryArchetype?.linkedItems?.traits?.find(
          (linkedTrait) =>
            linkedTrait.name === traitItem.name && linkedTrait.amount === 10,
        )
        if (linkedTrait && traitItem.name === linkedTrait.name) {
          if (validAmount < linkedTrait.amount) {
            validAmount = linkedTrait.amount
            defaultAmount = linkedTrait.amount
          }
        }
      }

      if (isNaN(validAmount)) validAmount = defaultAmount
      if (validAmount < 1) validAmount = defaultAmount
      if (validAmount > 10) validAmount = defaultAmount

      return {
        ...traitItem,
        amount: validAmount,
      }
    })

    const newTraitItemParams = TraitItem.toParams(validatedTraitItems)
    onUpdateBuildState({ category: 'trait', value: newTraitItemParams })
  }

  const primePerkName =
    buildState.items.archetype[0]?.linkedItems?.perks?.[0]?.name
  const primePerk = perkItems.find((i) => i.name === primePerkName)

  // #region Render

  return (
    <>
      <ItemSelectDialog
        key={selectedItemSlot.category}
        open={isItemSelectModalOpen}
        onClose={() => setSelectedItemSlot({ category: null })}
        onSelectItem={handleSelectItem}
        itemList={itemListForSlot}
        buildSlot={selectedItemSlot.category}
      />

      <ItemInfoDialog
        item={infoItem}
        open={itemInfoOpen}
        onClose={() => setInfoItem(null)}
      />

      {buildState.isPublic === false && !isScreenshotMode && (
        <div className="text-md mb-4 flex flex-col items-center justify-center gap-4 border-2 border-red-500 p-4 font-semibold text-red-500">
          This build is currently marked private. Other users will be unable to
          view it until you mark it public.
        </div>
      )}
      <div
        id="build-container"
        className={cn(
          'bg-background-solid relative w-full grow rounded border-2 p-4',
          !buildState.isMember && 'border-primary-500',
          buildState.isMember &&
            !isScreenshotMode &&
            'border-accent1-300 shadow-accent1-600 shadow-lg',
          buildState.isMember && isScreenshotMode && 'border-primary-500',
          isScreenshotMode && 'pb-[70px]',
        )}
      >
        <div
          id="build-header"
          className={cn(
            'border-b-primary-900 relative mb-4 border-b',
            (isPopular || isNew || buildState.isFeaturedBuild) && 'mb-10 pb-6',
          )}
        >
          <div className="relative flex w-full flex-col items-center justify-center gap-2">
            {isEditable && !isScreenshotMode ? (
              <BaseInput
                id="build-name"
                type="text"
                onChange={(e) => handleChangeBuildName(e.target.value)}
                className="mb-2 w-full text-center "
                placeholder="My Build"
                value={buildState.name}
              />
            ) : (
              <div className="mb-2 flex w-full items-center justify-center gap-2">
                <span className="sr-only">{stripUnicode(buildState.name)}</span>
                <h2
                  aria-hidden="true"
                  className={cn(
                    'text-surface-solid whitespace-normal text-center text-2xl font-bold sm:text-4xl',
                    isScreenshotMode && 'text-4xl',
                  )}
                >
                  {buildState.name}
                </h2>
              </div>
            )}
          </div>
          {showCreatedBy && (
            <div className="mb-2 flex items-center justify-center text-sm text-gray-400">
              <span>
                {`${getArchetypeComboName({
                  archetype1:
                    (buildState.items.archetype[0]?.name.toLowerCase() as ArchetypeName) ||
                    null,
                  archetype2:
                    (buildState.items.archetype[1]?.name.toLowerCase() as ArchetypeName) ||
                    null,
                })}`}{' '}
                Build by{' '}
              </span>
              <Link
                href={`/profile/${buildState.createdById}/created-builds`}
                className="text-primary-500 ml-1 underline"
              >
                {buildState.createdByDisplayName}
              </Link>
              <div className="ml-2 flex flex-row text-sm">
                <StarIcon
                  className={cn(
                    'text-accent1-500 mr-0.5 h-4 w-4',
                    isScreenshotMode ? 'mt-[1.5px]' : 'mt-0.5',
                  )}
                />
                <span
                  className={cn(
                    'text-surface-solid',
                    isScreenshotMode ? 'mb-[2px]' : 'mb-0.5',
                  )}
                >
                  {buildState.totalUpvotes}
                </span>
              </div>
            </div>
          )}
          {buildState.buildLink && (
            <div className="mb-2 flex w-full items-center justify-center text-sm text-gray-300">
              <span className="overflow-y-auto whitespace-pre-wrap text-center">
                {buildState.buildLink}
              </span>
            </div>
          )}
          {buildState.updatedAt && (
            <div className="mb-2 flex items-center justify-center text-sm text-gray-400">
              <p className="text-left text-xs text-gray-400">
                Last Updated:{' '}
                <span className="text-gray-300">
                  {formatUpdatedAt(buildState.updatedAt)}
                </span>
              </p>
            </div>
          )}
          {buildState.isPatchAffected && (
            <div className="mb-2 flex items-center justify-center text-sm text-gray-400">
              <p className="border border-red-500 p-2 text-left text-xs font-bold text-red-500">
                This build might have been affected by a past update. If you
                created this build, please update it and untoggle the
                patch-affected setting.
              </p>
            </div>
          )}
          {(isPopular || isNew || buildState.isFeaturedBuild) && (
            <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-1/2 transform items-center justify-center gap-x-2">
              {isNew ? <NewBuildBadge unoptimized={isScreenshotMode} /> : null}
              {isPopular ? (
                <PopularBuildBadge
                  level={popularLevel}
                  unoptimized={isScreenshotMode}
                />
              ) : null}
              {buildState.isFeaturedBuild ? (
                <FeaturedBuildBadge unoptimized={isScreenshotMode} />
              ) : null}
            </div>
          )}
        </div>

        <div
          id="build-wrapper"
          className={cn(
            'flex w-full flex-col items-center justify-between md:flex-row md:items-start md:gap-x-8',
            isScreenshotMode && 'flex-row items-start gap-x-8',
          )}
        >
          <div
            id="build-left-column"
            className="flex w-full min-w-[300px] max-w-[475px] flex-col"
          >
            <div
              id="archetype-container"
              className={cn(
                'flex flex-row flex-wrap items-start justify-center gap-1',
              )}
            >
              {getArrayOfLength(2).map((archetypeIndex) => (
                <div
                  key={`archetype-${archetypeIndex}`}
                  className={cn(
                    'flex flex-row gap-1',
                    archetypeIndex === 0 ? 'sm:order-1' : 'sm:order-3',
                    isScreenshotMode && archetypeIndex === 1 && 'order-3',
                  )}
                >
                  <ItemButton
                    item={buildState.items.archetype[archetypeIndex] || null}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() =>
                      handleItemSlotClick('archetype', archetypeIndex)
                    }
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  <ItemButton
                    item={buildState.items.skill[archetypeIndex] || null}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() => handleItemSlotClick('skill', archetypeIndex)}
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                </div>
              ))}
              {primePerk && (
                <div
                  className={cn('sm:order-2', isScreenshotMode && 'order-2')}
                >
                  <ItemButton
                    item={primePerk}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={undefined}
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                </div>
              )}
            </div>
            <div
              id="build-items-container"
              className={cn(
                'relative flex w-full items-start justify-between gap-4',
              )}
            >
              <div id="left-column" className={cn('flex-none')}>
                <ItemButton
                  item={buildState.items.helm}
                  isEditable={isEditable}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  onClick={() => handleItemSlotClick('helm')}
                  onItemInfoClick={handleShowInfo}
                  onToggleOptional={handleToggleOptional}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <ItemButton
                  item={buildState.items.torso}
                  isEditable={isEditable}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  onClick={() => handleItemSlotClick('torso')}
                  onItemInfoClick={handleShowInfo}
                  onToggleOptional={handleToggleOptional}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <ItemButton
                  item={buildState.items.legs}
                  isEditable={isEditable}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  onClick={() => handleItemSlotClick('legs')}
                  onItemInfoClick={handleShowInfo}
                  onToggleOptional={handleToggleOptional}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <ItemButton
                  item={buildState.items.gloves}
                  isEditable={isEditable}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  onClick={() => handleItemSlotClick('gloves')}
                  onItemInfoClick={handleShowInfo}
                  onToggleOptional={handleToggleOptional}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <div
                  id="relic-container"
                  className="relative flex items-start justify-start"
                >
                  <ItemButton
                    item={buildState.items.relic}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() => handleItemSlotClick('relic')}
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  <div
                    id="relic-fragment-container"
                    className="absolute left-[66px] top-0 flex w-[160px] flex-col items-start justify-start"
                  >
                    <ItemButton
                      item={buildState.items.relicfragment[0] || null}
                      isEditable={isEditable}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      onClick={() => handleItemSlotClick('relicfragment', 0)}
                      onItemInfoClick={handleShowInfo}
                      onToggleOptional={handleToggleOptional}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                      variant="relic-fragment"
                    />
                    <ItemButton
                      item={buildState.items.relicfragment[1] || null}
                      isEditable={isEditable}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      onClick={() => handleItemSlotClick('relicfragment', 1)}
                      onItemInfoClick={handleShowInfo}
                      onToggleOptional={handleToggleOptional}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                      variant="relic-fragment"
                    />
                    <ItemButton
                      item={buildState.items.relicfragment[2] || null}
                      isEditable={isEditable}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      onClick={() => handleItemSlotClick('relicfragment', 2)}
                      onItemInfoClick={handleShowInfo}
                      onToggleOptional={handleToggleOptional}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                      variant="relic-fragment"
                    />
                  </div>
                </div>
              </div>
              <div
                id="center-column"
                className="relative ml-[13px] flex h-[450px] max-h-[450px] w-full flex-col items-start justify-start overflow-y-auto sm:h-[460px] sm:max-h-[460px]"
              >
                <Stats
                  buildState={buildState}
                  isScreenshotMode={isScreenshotMode}
                />
              </div>
              <div id="right-column" className={cn('flex-none')}>
                <ItemButton
                  item={buildState.items.amulet}
                  isEditable={isEditable}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  onClick={() => handleItemSlotClick('amulet')}
                  onItemInfoClick={handleShowInfo}
                  onToggleOptional={handleToggleOptional}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                {getArrayOfLength(4).map((ringIndex) => (
                  <ItemButton
                    key={`ring-${ringIndex}`}
                    item={buildState.items.ring[ringIndex] || null}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() => handleItemSlotClick('ring', ringIndex)}
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            id="build-right-column"
            className="flex w-full flex-col items-center justify-start"
          >
            <div
              id="guns-row"
              className={cn(
                'mb-4 flex w-full flex-row items-start justify-center gap-2 min-[855px]:flex-nowrap',
                !isScreenshotMode && 'flex-wrap',
              )}
            >
              {getArrayOfLength(3).map((weaponIndex) => (
                <div
                  key={`gun-${weaponIndex}`}
                  className={cn(
                    'flex flex-col items-start justify-center',
                    weaponIndex === 1 && 'order-2 sm:order-none',
                  )}
                >
                  <ItemButton
                    item={buildState.items.weapon[weaponIndex] || null}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() => handleItemSlotClick('weapon', weaponIndex)}
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                    variant="weapon"
                  />
                  <div className="flex w-full grow items-start justify-around gap-4">
                    {(weaponIndex === 1 &&
                      !buildState.items.mod[weaponIndex]) ||
                    buildState.items.weapon[weaponIndex]?.isRusty ? (
                      <div className="h-[66px] w-[66px]" />
                    ) : (
                      <ItemButton
                        item={buildState.items.mod[weaponIndex] || null}
                        isEditable={isEditable}
                        isScreenshotMode={isScreenshotMode}
                        manualWordBreaks={true}
                        onClick={
                          // if mod is linked to the weapon, don't allow editing
                          (buildState.items.weapon[weaponIndex]?.linkedItems
                            ?.mod?.name &&
                            buildState.items.weapon[weaponIndex]?.linkedItems
                              ?.mod?.name ===
                              buildState.items.mod[weaponIndex]?.name) ||
                          weaponIndex === 1
                            ? undefined
                            : () => handleItemSlotClick('mod', weaponIndex)
                        }
                        onItemInfoClick={handleShowInfo}
                        onToggleOptional={handleToggleOptional}
                        tooltipDisabled={itemInfoOpen}
                        unoptimized={isScreenshotMode}
                      />
                    )}

                    <ItemButton
                      item={buildState.items.mutator[weaponIndex] || null}
                      isEditable={isEditable}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      onClick={() =>
                        handleItemSlotClick('mutator', weaponIndex)
                      }
                      onItemInfoClick={handleShowInfo}
                      onToggleOptional={handleToggleOptional}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div id="trait-row" className="w-full">
              <Traits
                buildState={buildState}
                showControls={showControls}
                isEditable={isEditable}
                isScreenshotMode={isScreenshotMode}
                tooltipDisabled={itemInfoOpen}
                onAddTrait={() => handleItemSlotClick('trait')}
                onItemInfoClick={handleShowInfo}
                onRemoveTrait={(traitItem) => handleRemoveTrait(traitItem)}
                onUpdateAmount={(newTraitItem) =>
                  handleUpdateTraitAmount(newTraitItem)
                }
              />
            </div>

            <div id="concoction-consumable-container" className="w-full">
              {buildState.items.concoction.every((i) => !i) &&
              !isEditable ? null : (
                <div
                  id="concoction-container"
                  className={cn(
                    'mt-4 flex w-full flex-row flex-wrap items-start justify-start gap-x-2 gap-y-0 sm:justify-start',
                    isScreenshotMode && 'justify-start',
                  )}
                >
                  <ItemButton
                    item={buildState.items.concoction[0] || null}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() => handleItemSlotClick('concoction', 0)}
                    onItemInfoClick={handleShowInfo}
                    onToggleOptional={handleToggleOptional}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  {getArrayOfLength(concoctionSlotCount).map((index) => {
                    // Add 1 to the index because we already rendered the first slot
                    const concoctionIndex = index + 1
                    return (
                      <ItemButton
                        key={`concoction-${concoctionIndex}`}
                        item={
                          buildState.items.concoction[concoctionIndex] || null
                        }
                        isEditable={isEditable}
                        isScreenshotMode={isScreenshotMode}
                        manualWordBreaks={true}
                        onClick={() =>
                          handleItemSlotClick('concoction', concoctionIndex)
                        }
                        onItemInfoClick={handleShowInfo}
                        onToggleOptional={handleToggleOptional}
                        tooltipDisabled={itemInfoOpen}
                        unoptimized={isScreenshotMode}
                      />
                    )
                  })}
                </div>
              )}

              {buildState.items.consumable.every((i) => !i) &&
              !isEditable ? null : (
                <div
                  id="consumable-container"
                  className={cn(
                    'mt-4 flex w-full flex-row flex-wrap items-start justify-between gap-x-2 gap-y-0 sm:justify-start',
                    isScreenshotMode && 'justify-start',
                  )}
                >
                  {getArrayOfLength(4).map((consumableIndex) => (
                    <ItemButton
                      key={`consumable-${consumableIndex}`}
                      item={
                        buildState.items.consumable[consumableIndex] || null
                      }
                      isEditable={isEditable}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      onClick={() =>
                        handleItemSlotClick('consumable', consumableIndex)
                      }
                      onItemInfoClick={handleShowInfo}
                      onToggleOptional={handleToggleOptional}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {showMemberFeatures ? (
          <div
            id="member-features-row"
            className="mt-2 flex w-full items-start justify-center"
          >
            <MemberFeatures
              buildLink={buildState.buildLink}
              buildTags={buildState.buildTags ?? []}
              description={buildState.description}
              isEditable={isEditable}
              isPatchAffected={buildState.isPatchAffected}
              isPublic={buildState.isPublic}
              isScreenshotMode={isScreenshotMode}
              onChangeBuildLink={handleChangeBuildLink}
              onChangeBuildTags={handleChangeBuildTags}
              onChangeDescription={handleChangeDescription}
              onChangeIsPublic={handleToggleIsPublic}
              onChangeIsPatchAffected={handleToggleIsPatchAffected}
            />
          </div>
        ) : null}

        {isScreenshotMode && (
          <div className="absolute bottom-[10px] right-[10px]">
            <Logo showUrl unoptimized={isScreenshotMode} />
          </div>
        )}
      </div>
    </>
  )
}
