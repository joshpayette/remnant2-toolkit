import { TraitItem } from '@/app/(types)/items/TraitItem'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { cn, getArrayOfLength, getConcoctionSlotCount } from '@/app/(lib)/utils'
import BuilderName from './BuilderName'
import BuilderButton from './BuilderButton'
import Traits from './Traits'
import ItemSelect from './ItemSelect'
import Logo from '@/app/(components)/Logo'
import useBuildState from '../(hooks)/useBuildState'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import MemberFeatures from './MemberFeatures'
import { remnantItems } from '@/app/(data)'
import { WeaponItem } from '@/app/(types)/items/WeaponItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'
import { BuildState } from '../../(types)/build-state'
import ItemInfo from '@/app/(components)/ItemInfo'
import { Item } from '@/app/(types)'

/**
 * Returns a list of items that match the selected slot
 * Takes into account the build's current items and the selected slot
 * This is passed to the ItemSelect modal to display the correct items
 */
function getItemListForCategory(
  buildState: BuildState,
  selectedItem: {
    category: GenericItem['category'] | null
    index?: number
  },
) {
  if (!selectedItem.category) return []

  // Remove items that are already in the build
  // for the current category
  const unequippedItems = remnantItems.filter((item) => {
    const categoryItemorItems = buildState.items[item.category]
    if (!categoryItemorItems) return true

    if (Array.isArray(categoryItemorItems)) {
      const buildItems = categoryItemorItems
      return !buildItems.find((i) => i?.id === item.id)
    } else {
      const buildItem = categoryItemorItems
      return buildItem?.id !== item.id
    }
  })

  // If the selected slot is a weapon, then limit the
  // weapons based on the corresponding weapon type
  if (selectedItem.category === 'weapon') {
    let type: WeaponItem['type']
    switch (selectedItem.index) {
      case 0:
        type = 'long gun'
        break
      case 1:
        type = 'melee'
        break
      case 2:
        type = 'hand gun'
        break
    }

    return unequippedItems.filter(
      (item) => WeaponItem.isWeaponItem(item) && item.type === type,
    )
  }

  // If the selected slot is a mod, then limit the
  // mods to those without a linked weapon
  if (selectedItem.category === 'mod') {
    return unequippedItems.filter(
      (item) => item.category === 'mod' && !item.linkedItems?.weapon,
    )
  }

  // If the selected slot is a mutator,
  // then limit the mutators to the weapon type
  if (selectedItem.category === 'mutator') {
    // Get the corresponding weapon from the build
    const buildWeapon = buildState.items.weapon[selectedItem.index ?? 0]
    if (!buildWeapon) return []

    const weaponType = buildWeapon.type === 'melee' ? 'melee' : 'gun'

    return unequippedItems.filter(
      (item) => MutatorItem.isMutatorItem(item) && item.type === weaponType,
    )
  }

  // If the selected slot is a skill, try to limit
  // skills based on the corresponding archtype
  if (selectedItem.category === 'skill') {
    const skillItems = unequippedItems.filter(
      (item) => item.category === 'skill',
    )

    if (selectedItem.index === undefined) return skillItems

    const archtype =
      buildState.items.archtype[selectedItem.index]?.name.toLowerCase()

    if (!archtype) return skillItems

    const itemsForArchtype = skillItems.filter(
      (item) => item.linkedItems?.archtype?.name.toLowerCase() === archtype,
    )

    return itemsForArchtype
  }

  // If the selected slot is an archtype, try to limit
  // the archtypes based on the corresponding skill
  if (selectedItem.category === 'archtype') {
    const archtypeItems = (unequippedItems as GenericItem[]).filter(
      (item) => item.category === 'archtype',
    )

    if (selectedItem.index === undefined) return archtypeItems

    const skill = buildState.items.skill[selectedItem.index]?.name.toLowerCase()

    if (!skill) return archtypeItems

    const itemsForSkill = archtypeItems.filter(
      (item) =>
        item.linkedItems?.skills?.some((s) => s.name.toLowerCase() === skill),
    )

    return itemsForSkill
  }

  // If we got this far, then return all items for the selected slot
  return (unequippedItems as GenericItem[]).filter(
    (item) => item.category === selectedItem.category,
  )
}

export default function Builder({
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
}: {
  buildState: BuildState
  isEditable: boolean
  isScreenshotMode: boolean
  showControls: boolean
}) {
  // Custom hook for working with the build
  const { updateBuildState } = useBuildState()
  const concoctionSlotCount = getConcoctionSlotCount(buildState)

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    category: GenericItem['category'] | null
    index?: number
  }>({ category: null })

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
    (selectedItem: GenericItem | null) => {
      if (!selectedItemSlot.category) return

      /**
       * The item index is used to determine which item in the array of items
       * for slots like rings and archtypes
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
          // If we filtered, the second archtype would become the first archtype
          // if you removed the first archtype
          const newBuildItems = buildItems.map((item, index) =>
            index === specifiedIndex ? null : item,
          )
          const newItemIds = newBuildItems.map((i) => i?.id ?? '')
          updateBuildState(selectedItemSlot.category, newItemIds)
        } else {
          updateBuildState(selectedItemSlot.category, '')
        }

        setSelectedItemSlot({ category: null })
        return
      }

      const categoryItemorItems = buildState.items[selectedItemSlot.category]

      // If the item can be multiple, such as rings,
      // then add the item at the specified index
      if (Array.isArray(categoryItemorItems)) {
        const buildItems = categoryItemorItems

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

        // If the item is a trait, then we need to add the amount to the query string
        if (selectedItemSlot.category === 'trait') {
          const newTraitItemParams = TraitItem.toParams(
            newBuildItems as TraitItem[],
          )
          updateBuildState('trait', newTraitItemParams)
          setSelectedItemSlot({ category: null })
          return
        }

        // If we got here, add the item to the build
        const newItemIds = newBuildItems.map((i) => i?.id)
        updateBuildState(selectedItem.category, newItemIds)
        setSelectedItemSlot({ category: null })
        return
      }

      // If the item is not null, add the item to the build
      const buildItem = categoryItemorItems

      const itemAlreadyInBuild = buildItem?.id === selectedItem.id
      if (itemAlreadyInBuild) return

      updateBuildState(selectedItem.category, selectedItem.id)
      setSelectedItemSlot({ category: null })
    },
    [
      buildState.items,
      selectedItemSlot.category,
      selectedItemSlot.index,
      updateBuildState,
    ],
  )

  /** If the item category is null, modal is closed */
  const isItemSelectModalOpen = Boolean(selectedItemSlot.category)

  //Tracks whether the build name is editable or not.
  const [isEditingBuildName, setIsEditingBuildName] = useState(false)

  // Tracks the item that the user is viewing information for
  const [infoItem, setInfoItem] = useState<Item | null>(null)

  /**
   * Returns a list of items that match the selected slot
   * This is passed to the ItemSelect modal to display the correct items
   */
  const itemListForSlot = useMemo(
    () => getItemListForCategory(buildState, selectedItemSlot),
    [selectedItemSlot, buildState],
  )

  function handleChangeDescription(description: string) {
    updateBuildState('description', description)
  }
  function handleToggleIsPublic(isPublic: boolean) {
    updateBuildState('isPublic', isPublic ? 'true' : 'false')
  }
  function handleShowInfo(item: Item) {
    setInfoItem(item)
  }
  function handleButtonClick(
    category: GenericItem['category'],
    index?: number,
  ) {
    if (!isEditable) return
    setSelectedItemSlot({ category, index })
  }

  return (
    <>
      <ItemSelect
        open={isItemSelectModalOpen}
        onClose={() => setSelectedItemSlot({ category: null })}
        onSelectItem={handleSelectItem}
        itemList={itemListForSlot}
        buildSlot={selectedItemSlot.category}
      />

      <ItemInfo
        item={infoItem}
        open={Boolean(infoItem)}
        onClose={() => setInfoItem(null)}
      />

      <div className="mb-4">
        <BuilderName
          isEditable={isEditable}
          isEditingBuildName={isEditingBuildName}
          onClick={() => setIsEditingBuildName(true)}
          onClose={(newBuildName: string) => {
            updateBuildState('name', newBuildName)
            setIsEditingBuildName(false)
          }}
          name={buildState.name}
          showControls={showControls}
        />
      </div>

      <div
        className={cn('relative flex w-full items-start justify-between gap-4')}
      >
        {isScreenshotMode && (
          <div className="absolute bottom-[10px] right-[80px]">
            <Logo showUrl />
          </div>
        )}

        <div id="left-column" className="flex-none">
          <BuilderButton
            item={buildState.items.helm}
            isEditable={isEditable}
            onClick={() => handleButtonClick('helm')}
            onItemInfoClick={handleShowInfo}
            isScreenshotMode={isScreenshotMode}
          />
          <BuilderButton
            item={buildState.items.torso}
            isEditable={isEditable}
            onClick={() => handleButtonClick('torso')}
            onItemInfoClick={handleShowInfo}
            isScreenshotMode={isScreenshotMode}
          />
          <BuilderButton
            item={buildState.items.legs}
            isEditable={isEditable}
            onClick={() => handleButtonClick('legs')}
            onItemInfoClick={handleShowInfo}
            isScreenshotMode={isScreenshotMode}
          />
          <BuilderButton
            item={buildState.items.gloves}
            isEditable={isEditable}
            onClick={() => handleButtonClick('gloves')}
            onItemInfoClick={handleShowInfo}
            isScreenshotMode={isScreenshotMode}
          />
          <div
            id="relic-container"
            className="relative flex items-start justify-start"
          >
            <BuilderButton
              item={buildState.items.relic}
              isEditable={isEditable}
              onClick={() => handleButtonClick('relic')}
              onItemInfoClick={handleShowInfo}
              isScreenshotMode={isScreenshotMode}
            />
            <div
              id="relic-fragment-container"
              className="absolute left-[66px] top-0 flex w-[160px] flex-col items-start justify-start"
            >
              <BuilderButton
                isEditable={isEditable}
                size="sm"
                item={buildState.items.relicfragment[0]}
                onClick={() => handleButtonClick('relicfragment', 0)}
                onItemInfoClick={handleShowInfo}
                isScreenshotMode={isScreenshotMode}
              />
              <BuilderButton
                item={buildState.items.relicfragment[1]}
                isEditable={isEditable}
                size="sm"
                onClick={() => handleButtonClick('relicfragment', 1)}
                onItemInfoClick={handleShowInfo}
                isScreenshotMode={isScreenshotMode}
              />
              <BuilderButton
                item={buildState.items.relicfragment[2]}
                isEditable={isEditable}
                size="sm"
                onClick={() => handleButtonClick('relicfragment', 2)}
                onItemInfoClick={handleShowInfo}
                isScreenshotMode={isScreenshotMode}
              />
            </div>
          </div>
        </div>
        <div
          id="center-column"
          className="relative ml-[13px] flex h-[450px] max-h-[450px] flex-col items-start justify-start overflow-y-auto sm:h-[460px] sm:max-h-[460px]"
        >
          <div
            id="archtype-container"
            className="flex flex-row flex-wrap gap-2"
          >
            {getArrayOfLength(2).map((archtypeIndex) => (
              <Fragment key={`archtype-${archtypeIndex}`}>
                <BuilderButton
                  item={buildState.items.archtype[archtypeIndex]}
                  isEditable={isEditable}
                  onClick={() => handleButtonClick('archtype', archtypeIndex)}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                />
                <BuilderButton
                  item={buildState.items.skill[archtypeIndex]}
                  isEditable={isEditable}
                  onClick={() => handleButtonClick('skill', archtypeIndex)}
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                />
              </Fragment>
            ))}
          </div>

          <div
            id="concoction-container"
            className="flex flex-row flex-wrap gap-x-2 gap-y-0"
          >
            <BuilderButton
              item={buildState.items.concoction[0]}
              isEditable={isEditable}
              onClick={() => handleButtonClick('concoction', 0)}
              onItemInfoClick={handleShowInfo}
              isScreenshotMode={isScreenshotMode}
            />
            {getArrayOfLength(concoctionSlotCount).map((index) => {
              // Add 1 to the index because we already rendered the first slot
              const concoctionIndex = index + 1
              return (
                <BuilderButton
                  key={`concoction-${concoctionIndex}`}
                  item={buildState.items.concoction[concoctionIndex]}
                  isEditable={isEditable}
                  onClick={() =>
                    handleButtonClick('concoction', concoctionIndex)
                  }
                  onItemInfoClick={handleShowInfo}
                  isScreenshotMode={isScreenshotMode}
                />
              )
            })}
          </div>

          <div
            id="consumable-container"
            className="flex flex-row flex-wrap gap-x-2 gap-y-0"
          >
            {getArrayOfLength(4).map((consumableIndex) => (
              <BuilderButton
                key={`consumable-${consumableIndex}`}
                item={buildState.items.consumable[consumableIndex]}
                isEditable={isEditable}
                onClick={() => handleButtonClick('consumable', consumableIndex)}
                onItemInfoClick={handleShowInfo}
                isScreenshotMode={isScreenshotMode}
              />
            ))}
          </div>
        </div>
        <div id="right-column" className="flex-none">
          <BuilderButton
            item={buildState.items.amulet}
            isEditable={isEditable}
            onClick={() => handleButtonClick('amulet')}
            onItemInfoClick={handleShowInfo}
            isScreenshotMode={isScreenshotMode}
          />
          {getArrayOfLength(4).map((ringIndex) => (
            <BuilderButton
              key={`ring-${ringIndex}`}
              item={buildState.items.ring[ringIndex]}
              isEditable={isEditable}
              onClick={() => handleButtonClick('ring', ringIndex)}
              onItemInfoClick={handleShowInfo}
              isScreenshotMode={isScreenshotMode}
            />
          ))}
        </div>
      </div>

      <div
        id="guns-row"
        className="flex w-full flex-row items-start justify-start gap-2 overflow-x-auto"
      >
        {getArrayOfLength(3).map((weaponIndex) => (
          <div
            key={`gun-${weaponIndex}`}
            className="flex flex-col items-start justify-center"
          >
            <BuilderButton
              item={buildState.items.weapon[weaponIndex]}
              size="wide"
              isEditable={isEditable}
              onClick={() => handleButtonClick('weapon', weaponIndex)}
              onItemInfoClick={handleShowInfo}
              isScreenshotMode={isScreenshotMode}
            />
            <div className="flex w-full grow items-center justify-around gap-4">
              <BuilderButton
                item={buildState.items.mod[weaponIndex]}
                size="md"
                isEditable={isEditable}
                onClick={() => handleButtonClick('mod', weaponIndex)}
                onItemInfoClick={handleShowInfo}
                isScreenshotMode={isScreenshotMode}
              />
              <BuilderButton
                item={buildState.items.mutator[weaponIndex]}
                size="md"
                isEditable={isEditable}
                onClick={() => handleButtonClick('mutator', weaponIndex)}
                onItemInfoClick={handleShowInfo}
                isScreenshotMode={isScreenshotMode}
              />
            </div>
          </div>
        ))}
      </div>
      <div id="trait-row" className="mt-4 w-full">
        <Traits
          buildState={buildState}
          showControls={showControls}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          onAddTrait={() => handleButtonClick('trait')}
          onRemoveTrait={(traitItem) => {
            const newTraitItems = buildState.items.trait.filter(
              (i) => i.name !== traitItem.name,
            )
            const newTraitItemParams = TraitItem.toParams(newTraitItems)
            updateBuildState('trait', newTraitItemParams)
          }}
          onChangeAmount={(newTraitItem) => {
            const newTraitItems = buildState.items.trait.map((traitItem) => {
              if (traitItem.name === newTraitItem.name) {
                return newTraitItem
              }
              return traitItem
            })
            const newTraitItemParams = TraitItem.toParams(newTraitItems)
            updateBuildState('trait', newTraitItemParams)
          }}
        />
      </div>

      <div id="member-features-row" className="mt-4 w-full">
        <MemberFeatures
          description={buildState.description}
          isEditable={isEditable}
          isPublic={buildState.isPublic}
          isScreenshotModeActive={isScreenshotMode}
          onChangeDescription={handleChangeDescription}
          onChangeIsPublic={handleToggleIsPublic}
        />
      </div>
    </>
  )
}
