import { StarIcon } from '@heroicons/react/24/solid'
import { BuildTags } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'

import { Link } from '@/app/(components)/_base/link'
import { ItemButton } from '@/app/(components)/buttons/item-button'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { ItemSelectDialog } from '@/app/(components)/dialogs/item-select-dialog'
import {
  DEFAULT_TRAIT_AMOUNT,
  MAX_BUILD_TAGS,
} from '@/app/(data)/builds/constants'
import { perkItems } from '@/app/(data)/items/perk-items'
import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState, ItemCategory } from '@/app/(types)/builds'
import { FeaturedBuildBadge } from '@/features/build/components/build-card/FeaturedBuildBadge'
import { NewBuildBadge } from '@/features/build/components/build-card/NewBuildBadge'
import { PopularBuildBadge } from '@/features/build/components/build-card/PopularBuildBadge'
import { formatUpdatedAt } from '@/features/build/lib/formatUpdatedAt'
import {
  ArchetypeName,
  getArchetypeComboName,
} from '@/features/build/lib/getArchetypeComboName'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { getConcoctionSlotCount } from '@/features/build/lib/getConcoctionSlotCount'
import { getItemListForSlot } from '@/features/build/lib/getItemListForSlot'
import { isBuildNew } from '@/features/build/lib/isBuildNew'
import { isBuildPopular } from '@/features/build/lib/isBuildPopular'
import { stripUnicode } from '@/features/build/lib/stripUnicode'
import { Logo } from '@/features/ui/Logo'
import { cn } from '@/lib/classnames'

import { MemberFeatures } from './MemberFeatures'
import { Stats } from './stats/Stats'
import { Traits } from './Traits'

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
          onUpdateBuildState({ category: selectedItemSlot.category, value: '' })
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
        const newItemIds = newBuildItems.map((i) => i?.id)
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

      // if this is the linked trait for the primary archetype,
      // make sure the amount is not less than the minimum allowed
      if (buildState.items.archetype[0]?.name) {
        const linkedTrait =
          buildState.items.archetype[0]?.linkedItems?.traits?.find(
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
      if (buildState.items.archetype[1]?.name) {
        const linkedTrait =
          buildState.items.archetype[1]?.linkedItems?.traits?.find(
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

      return { ...traitItem, amount: validAmount }
    })

    const newTraitItemParams = TraitItem.toParams(validatedTraitItems)
    onUpdateBuildState({ category: 'trait', value: newTraitItemParams })
  }

  const primePerkName =
    buildState.items.archetype[0]?.linkedItems?.perks?.[0].name
  const primePerk = perkItems.find((i) => i.name === primePerkName)

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
          'relative w-full grow rounded border-2 bg-background-container p-4',
          !buildState.isMember && 'border-primary',
          buildState.isMember &&
            !isScreenshotMode &&
            'border-secondary shadow-lg shadow-secondary-container',
          buildState.isMember && isScreenshotMode && 'border-primary',
          isScreenshotMode && 'pb-[70px]',
        )}
      >
        <div
          id="build-header"
          className={cn(
            'relative mb-4 border-b border-b-primary',
            (isPopular || isNew || buildState.isFeaturedBuild) && 'mb-10 pb-6',
          )}
        >
          <div className="relative flex w-full flex-col items-center justify-center gap-2">
            {isEditable && !isScreenshotMode ? (
              <input
                id="build-name"
                type="text"
                onChange={(e) => handleChangeBuildName(e.target.value)}
                className="block w-full rounded-md border-2 border-secondary bg-on-background-variant/5 py-2 text-center text-2xl text-on-background shadow-sm ring-1 ring-inset ring-on-background/10 focus:ring-2 focus:ring-inset focus:ring-secondary"
                placeholder="My Build"
                value={buildState.name}
              />
            ) : (
              <div className="mb-2 flex w-full items-center justify-center gap-2">
                <span className="sr-only">{stripUnicode(buildState.name)}</span>
                <h2
                  aria-hidden="true"
                  className={cn(
                    'whitespace-normal text-center text-2xl font-bold text-on-background sm:text-4xl',
                    isScreenshotMode && 'text-4xl',
                  )}
                >
                  {buildState.name}
                </h2>
              </div>
            )}
          </div>
          {showCreatedBy && (
            <div className="mb-2 flex items-center justify-center text-sm text-on-background-variant">
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
                className="ml-1 text-primary underline"
              >
                {buildState.createdByDisplayName}
              </Link>
              <div className="ml-2 flex flex-row text-sm">
                <StarIcon
                  className={cn(
                    'mr-0.5 h-4 w-4 text-accent1-500',
                    isScreenshotMode ? 'mt-[1.5px]' : 'mt-0.5',
                  )}
                />
                <span
                  className={cn(
                    'text-on-background',
                    isScreenshotMode ? 'mb-[2px]' : 'mb-0.5',
                  )}
                >
                  {buildState.totalUpvotes}
                </span>
              </div>
            </div>
          )}
          {buildState.buildLink && (
            <div className="mb-2 flex w-full items-center justify-center text-sm text-on-background-variant">
              <span className="overflow-y-auto whitespace-pre-wrap text-center">
                {buildState.buildLink}
              </span>
            </div>
          )}
          {buildState.updatedAt && (
            <div className="mb-2 flex items-center justify-center text-sm text-on-background-variant">
              <p className="text-left text-xs text-on-background-variant">
                Last Updated:{' '}
                <span className="text-on-background-variant">
                  {formatUpdatedAt(buildState.updatedAt)}
                </span>
              </p>
            </div>
          )}
          {buildState.isPatchAffected && (
            <div className="mb-2 flex items-center justify-center text-sm text-on-background-variant">
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
                    item={buildState.items.archetype[archetypeIndex]}
                    manualWordBreaks={true}
                    onClick={() =>
                      handleItemSlotClick('archetype', archetypeIndex)
                    }
                    onItemInfoClick={handleShowInfo}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  <ItemButton
                    item={buildState.items.skill[archetypeIndex]}
                    isEditable={isEditable}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    onClick={() => handleItemSlotClick('skill', archetypeIndex)}
                    onItemInfoClick={handleShowInfo}
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
                    onClick={undefined}
                    onItemInfoClick={handleShowInfo}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
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
                  onClick={() => handleItemSlotClick('helm')}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <ItemButton
                  item={buildState.items.torso}
                  isEditable={isEditable}
                  onClick={() => handleItemSlotClick('torso')}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <ItemButton
                  item={buildState.items.legs}
                  isEditable={isEditable}
                  onClick={() => handleItemSlotClick('legs')}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                <ItemButton
                  item={buildState.items.gloves}
                  isEditable={isEditable}
                  onClick={() => handleItemSlotClick('gloves')}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
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
                    onClick={() => handleItemSlotClick('relic')}
                    onItemInfoClick={handleShowInfo}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  <div
                    id="relic-fragment-container"
                    className="absolute left-[66px] top-0 flex w-[160px] flex-col items-start justify-start"
                  >
                    <ItemButton
                      isEditable={isEditable}
                      size="sm"
                      item={buildState.items.relicfragment[0]}
                      onClick={() => handleItemSlotClick('relicfragment', 0)}
                      onItemInfoClick={handleShowInfo}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                    />
                    <ItemButton
                      item={buildState.items.relicfragment[1]}
                      isEditable={isEditable}
                      size="sm"
                      onClick={() => handleItemSlotClick('relicfragment', 1)}
                      onItemInfoClick={handleShowInfo}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
                    />
                    <ItemButton
                      item={buildState.items.relicfragment[2]}
                      isEditable={isEditable}
                      size="sm"
                      onClick={() => handleItemSlotClick('relicfragment', 2)}
                      onItemInfoClick={handleShowInfo}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
                      tooltipDisabled={itemInfoOpen}
                      unoptimized={isScreenshotMode}
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
                  onClick={() => handleItemSlotClick('amulet')}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                  manualWordBreaks={true}
                  tooltipDisabled={itemInfoOpen}
                  unoptimized={isScreenshotMode}
                />
                {getArrayOfLength(4).map((ringIndex) => (
                  <ItemButton
                    key={`ring-${ringIndex}`}
                    item={buildState.items.ring[ringIndex]}
                    isEditable={isEditable}
                    onClick={() => handleItemSlotClick('ring', ringIndex)}
                    onItemInfoClick={handleShowInfo}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
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
                    item={buildState.items.weapon[weaponIndex]}
                    size="wide"
                    isEditable={isEditable}
                    onClick={() => handleItemSlotClick('weapon', weaponIndex)}
                    onItemInfoClick={handleShowInfo}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  <div className="flex w-full grow items-start justify-around gap-4">
                    {(weaponIndex === 1 &&
                      !buildState.items.mod[weaponIndex]) ||
                    buildState.items.weapon[weaponIndex]?.isRusty ? (
                      <div className="h-[66px] w-[66px]" />
                    ) : (
                      <ItemButton
                        item={buildState.items.mod[weaponIndex]}
                        size="md"
                        isEditable={isEditable}
                        onClick={
                          weaponIndex === 1
                            ? undefined
                            : () => handleItemSlotClick('mod', weaponIndex)
                        }
                        onItemInfoClick={handleShowInfo}
                        isScreenshotMode={isScreenshotMode}
                        manualWordBreaks={true}
                        tooltipDisabled={itemInfoOpen}
                        unoptimized={isScreenshotMode}
                      />
                    )}

                    <ItemButton
                      item={buildState.items.mutator[weaponIndex]}
                      size="md"
                      isEditable={isEditable}
                      onClick={() =>
                        handleItemSlotClick('mutator', weaponIndex)
                      }
                      onItemInfoClick={handleShowInfo}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
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
                    item={buildState.items.concoction[0]}
                    isEditable={isEditable}
                    onClick={() => handleItemSlotClick('concoction', 0)}
                    onItemInfoClick={handleShowInfo}
                    isScreenshotMode={isScreenshotMode}
                    manualWordBreaks={true}
                    tooltipDisabled={itemInfoOpen}
                    unoptimized={isScreenshotMode}
                  />
                  {getArrayOfLength(concoctionSlotCount).map((index) => {
                    // Add 1 to the index because we already rendered the first slot
                    const concoctionIndex = index + 1
                    return (
                      <ItemButton
                        key={`concoction-${concoctionIndex}`}
                        item={buildState.items.concoction[concoctionIndex]}
                        isEditable={isEditable}
                        onClick={() =>
                          handleItemSlotClick('concoction', concoctionIndex)
                        }
                        onItemInfoClick={handleShowInfo}
                        isScreenshotMode={isScreenshotMode}
                        manualWordBreaks={true}
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
                      item={buildState.items.consumable[consumableIndex]}
                      isEditable={isEditable}
                      onClick={() =>
                        handleItemSlotClick('consumable', consumableIndex)
                      }
                      onItemInfoClick={handleShowInfo}
                      isScreenshotMode={isScreenshotMode}
                      manualWordBreaks={true}
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
