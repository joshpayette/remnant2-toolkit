import { getArrayOfLength, getItemListForSlot } from '@/lib/utils'
import ItemCard from '@/components/ItemCard'
import dynamic from 'next/dynamic'
import type { Loadout, LoadoutItem, LoadoutItemType } from '@/types'
import { Fragment, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useCreateQueryString from '@/hooks/useCreateQueryString'

const ItemSelect = dynamic(() => import('@/app/builds/ItemSelect'), {
  ssr: false,
})

function LoadoutName({
  editable,
  name,
  onClick,
  onClose,
}: {
  editable: boolean
  name: string
  onClick: () => void
  onClose: (newLoadoutName: string) => void
}) {
  const [newName, setNewName] = useState(name)

  return (
    <div className="relative mb-4 flex w-full flex-col items-center justify-center gap-2 border-b border-b-green-900 pb-2">
      {editable ? (
        <Fragment>
          <input
            type="email"
            name="email"
            id="email"
            value={newName}
            className="block w-full max-w-xl rounded-md border-0 bg-black py-1.5 text-center text-xl text-green-500 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:leading-6"
            placeholder="Loadout Name"
            onChange={(e) => setNewName(e.target.value)}
          />
          <div>
            <button
              onClick={() => onClose(newName)}
              className="mr-2 rounded-md bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              onClick={() => onClose(name)}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </Fragment>
      ) : (
        <button
          onClick={onClick}
          className="mb-2 text-center text-4xl font-bold text-green-400"
        >
          <h2>{name}</h2>
        </button>
      )}
    </div>
  )
}

export default function ImageLoadout({ loadout }: { loadout: Loadout }) {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCreateQueryString()

  /**
   * Fires when the user changes an item in the loadout.
   * It will add the item to the URL query string.
   */
  function handleSelectItem(item: LoadoutItem | null) {
    if (!item || !selectedItemSlot.type) return

    const loadoutItemOrItems = loadout.items[selectedItemSlot.type]

    if (Array.isArray(loadoutItemOrItems)) {
      const loadoutItems = loadoutItemOrItems

      // If no index is set, just add the item to the array
      // otherwise, insert in the specified slot
      if (selectedItemSlot.index === undefined) {
        // If the item is already in the loadout, don't add it again
        if (!loadoutItems.find((i) => i?.id === item.id)) {
          loadoutItems.push(item)
        }
      } else {
        if (!loadoutItems.find((i) => i?.id === item.id)) {
          loadoutItems[selectedItemSlot.index] = item
        }
      }
      const itemIds = loadoutItems.map((i) => i.id).join(',')
      router.push(
        `${pathname}?${createQueryString(
          loadoutItems[selectedItemSlot.index || 0].type,
          itemIds,
        )}`,
        { scroll: false },
      )
    } else {
      if (loadoutItemOrItems) {
        const loadoutItem = loadoutItemOrItems
        if (loadoutItem.id === item.id) return
      }

      router.push(`${pathname}?${createQueryString(item.type, item.id)}`, {
        scroll: false,
      })
    }
    setSelectedItemSlot({ type: null })
  }

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    type: LoadoutItemType | null
    index?: number
  }>({ type: null })

  // If the item type is not null, the modal should be open
  const isItemSelectModalOpen = Boolean(selectedItemSlot.type)

  /**
   * Items filtered for the slot the user clicked.
   * This info is used to populate the item select modal.
   */
  const itemListForSlot = useMemo(
    () => getItemListForSlot(selectedItemSlot.type),
    [selectedItemSlot],
  )

  /**
   * Tracks whether the loadout name is editable or not.
   */
  const [loadoutNameIsEditable, setLoadoutNameIsEditable] = useState(false)

  /**
   * Fires when the user changes the loadout name
   * It will add the name to the URL query string.
   */
  function handleUpdateLoadoutName(name: string) {
    router.push(`${pathname}?${createQueryString('name', name)}`, {
      scroll: false,
    })
  }

  const isPrimaryArchtypeAlchemist =
    loadout.items.archtypes && loadout.items.archtypes[0].name === 'Alchemist'

  return (
    <Fragment>
      <LoadoutName
        editable={loadoutNameIsEditable}
        onClick={() => setLoadoutNameIsEditable(true)}
        onClose={(newLoadoutName: string) => {
          loadout.name = newLoadoutName
          handleUpdateLoadoutName(newLoadoutName)
          setLoadoutNameIsEditable(false)
        }}
        name={loadout.name}
      />
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={selectedItemSlot.type}
        open={isItemSelectModalOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setSelectedItemSlot({ type: null })}
      />

      <div
        id="container"
        className="relative mb-12 grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-2 md:grid-cols-4"
      >
        <div
          id="archtypes"
          className="col-span-full grid grid-cols-2 sm:col-span-1"
        >
          <ItemCard
            key="archtype1"
            item={loadout.items.archtypes ? loadout.items.archtypes[0] : null}
            type="archtype"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'archtypes', index: 0 })}
            showTypeLabel={Boolean(
              !(loadout.items.archtypes && loadout.items.archtypes[0]),
            )}
          />
          <ItemCard
            key="skill1"
            item={loadout.items.skills ? loadout.items.skills[0] : null}
            type="skill"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'skills', index: 0 })}
            showTypeLabel={Boolean(
              !(loadout.items.skills && loadout.items.skills[0]),
            )}
          />

          <ItemCard
            key="archtype2"
            item={loadout.items.archtypes ? loadout.items.archtypes[1] : null}
            type="archtype"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'archtypes', index: 1 })}
            showTypeLabel={Boolean(
              !(loadout.items.archtypes && loadout.items.archtypes[1]),
            )}
          />
          <ItemCard
            key="skill2"
            item={loadout.items.skills ? loadout.items.skills[1] : null}
            type="skill"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'skills', index: 1 })}
            showTypeLabel={Boolean(
              !(loadout.items.skills && loadout.items.skills[1]),
            )}
          />
        </div>
        <div
          id="armor"
          className="col-span-full grid grid-cols-2 sm:col-span-1"
        >
          <ItemCard
            item={loadout.items.helm}
            type="helm"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'helm' })}
            showTypeLabel={Boolean(!loadout.items.helm)}
          />
          <ItemCard
            item={loadout.items.torso}
            type="torso"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'torso' })}
            showTypeLabel={Boolean(!loadout.items.torso)}
          />
          <ItemCard
            item={loadout.items.legs}
            type="legs"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'legs' })}
            showTypeLabel={Boolean(!loadout.items.legs)}
          />
          <ItemCard
            item={loadout.items.gloves}
            type="gloves"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'gloves' })}
            showTypeLabel={Boolean(!loadout.items.gloves)}
          />
        </div>
        <div
          id="jewelry"
          className="col-span-full grid grid-cols-2 sm:col-span-2 sm:grid-cols-3 md:col-span-2"
        >
          <ItemCard
            item={loadout.items.relic}
            type="relic"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'relic' })}
            showTypeLabel={Boolean(!loadout.items.relic)}
          />
          {getArrayOfLength(3).map((index) => {
            const item = loadout.items.relicfragments
              ? loadout.items.relicfragments[index]
              : null
            return (
              <ItemCard
                key={`relicfragment${index}`}
                item={item}
                type="relicfragment"
                size="sm"
                onClick={() =>
                  setSelectedItemSlot({ type: 'relicfragments', index })
                }
                showTypeLabel={Boolean(!(loadout.items.relicfragments && item))}
              />
            )
          })}
          <ItemCard
            item={loadout.items.amulet}
            type="amulet"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'amulet' })}
            showTypeLabel={Boolean(!loadout.items.amulet)}
          />
          {getArrayOfLength(4).map((index) => {
            const item = loadout.items.rings ? loadout.items.rings[index] : null
            return (
              <ItemCard
                key={`ring${index}`}
                item={item}
                type="ring"
                size="sm"
                onClick={() => setSelectedItemSlot({ type: 'rings', index })}
                showTypeLabel={Boolean(!item)}
              />
            )
          })}
        </div>
        <div
          id="mainhand"
          className="col-span-full grid grid-cols-2 sm:col-span-1 sm:grid-cols-2"
        >
          <ItemCard
            item={loadout.items.mainhand}
            type="mainhand"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mainhand' })}
            showTypeLabel={Boolean(!loadout.items.mainhand)}
          />
          <ItemCard
            item={loadout.items.mods ? loadout.items.mods[0] : null}
            type="mod"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mods', index: 0 })}
            showTypeLabel={Boolean(
              !(loadout.items.mods && loadout.items.mods[0]),
            )}
          />
          <ItemCard
            item={loadout.items.mutators ? loadout.items.mutators[0] : null}
            type="mutator"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mutators', index: 0 })}
            showTypeLabel={Boolean(
              !(loadout.items.mutators && loadout.items.mutators[0]),
            )}
          />
        </div>
        <div
          id="melee"
          className="col-span-full grid grid-cols-2 sm:col-span-1 sm:grid-cols-2"
        >
          <ItemCard
            item={loadout.items.melee}
            type="melee"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'melee' })}
            showTypeLabel={Boolean(!loadout.items.melee)}
          />
          <ItemCard
            item={loadout.items.mods ? loadout.items.mods[1] : null}
            type="mod"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mods', index: 1 })}
            showTypeLabel={Boolean(
              !(loadout.items.mods && loadout.items.mods[1]),
            )}
          />
          <ItemCard
            item={loadout.items.mutators ? loadout.items.mutators[1] : null}
            type="mutator"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mutators', index: 1 })}
            showTypeLabel={Boolean(
              !(loadout.items.mutators && loadout.items.mutators[1]),
            )}
          />
        </div>
        <div
          id="offhand"
          className="col-span-full grid grid-cols-2 sm:col-span-1 sm:grid-cols-2"
        >
          <ItemCard
            item={loadout.items.offhand}
            type="offhand"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'offhand' })}
            showTypeLabel={Boolean(!loadout.items.offhand)}
          />
          <ItemCard
            item={loadout.items.mods ? loadout.items.mods[2] : null}
            type="mod"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mods', index: 2 })}
            showTypeLabel={Boolean(
              !(loadout.items.mods && loadout.items.mods[2]),
            )}
          />
          <ItemCard
            item={loadout.items.mutators ? loadout.items.mutators[2] : null}
            type="mutator"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mutators', index: 2 })}
            showTypeLabel={Boolean(
              !(loadout.items.mutators && loadout.items.mutators[2]),
            )}
          />
        </div>
        <div id="spacer1" className="hidden md:block md:grid-cols-1">
          &nbsp;
        </div>
        <div
          id="concoctions"
          className="col-span-full grid grid-cols-2 sm:col-span-2 sm:grid-cols-2 md:col-span-2"
        >
          <ItemCard
            item={
              loadout.items.concoctions ? loadout.items.concoctions[0] : null
            }
            type="concoction"
            size="sm"
            onClick={() =>
              setSelectedItemSlot({ type: 'concoctions', index: 0 })
            }
            showTypeLabel={Boolean(
              !(loadout.items.concoctions && loadout.items.concoctions[0]),
            )}
          />
          {isPrimaryArchtypeAlchemist && (
            <Fragment>
              <ItemCard
                item={
                  loadout.items.concoctions
                    ? loadout.items.concoctions[1]
                    : null
                }
                type="concoction"
                size="sm"
                onClick={() =>
                  setSelectedItemSlot({ type: 'concoctions', index: 1 })
                }
                showTypeLabel={Boolean(
                  !(loadout.items.concoctions && loadout.items.concoctions[1]),
                )}
              />
              <ItemCard
                item={
                  loadout.items.concoctions
                    ? loadout.items.concoctions[2]
                    : null
                }
                type="concoction"
                size="sm"
                onClick={() =>
                  setSelectedItemSlot({ type: 'concoctions', index: 2 })
                }
                showTypeLabel={Boolean(
                  !(loadout.items.concoctions && loadout.items.concoctions[2]),
                )}
              />
              <ItemCard
                item={
                  loadout.items.concoctions
                    ? loadout.items.concoctions[3]
                    : null
                }
                type="concoction"
                size="sm"
                onClick={() =>
                  setSelectedItemSlot({ type: 'concoctions', index: 3 })
                }
                showTypeLabel={Boolean(
                  !(loadout.items.concoctions && loadout.items.concoctions[3]),
                )}
              />
            </Fragment>
          )}
        </div>
        <div
          id="consumables"
          className="col-span-full grid grid-cols-2 sm:col-span-2 sm:grid-cols-2 md:col-span-2"
        >
          <ItemCard
            item={
              loadout.items.consumables ? loadout.items.consumables[0] : null
            }
            type="consumable"
            size="sm"
            onClick={() =>
              setSelectedItemSlot({ type: 'consumables', index: 0 })
            }
            showTypeLabel={Boolean(
              !(loadout.items.consumables && loadout.items.consumables[0]),
            )}
          />
          <ItemCard
            item={
              loadout.items.consumables ? loadout.items.consumables[1] : null
            }
            type="consumable"
            size="sm"
            onClick={() =>
              setSelectedItemSlot({ type: 'consumables', index: 1 })
            }
            showTypeLabel={Boolean(
              !(loadout.items.consumables && loadout.items.consumables[1]),
            )}
          />
          <ItemCard
            item={
              loadout.items.consumables ? loadout.items.consumables[2] : null
            }
            type="consumable"
            size="sm"
            onClick={() =>
              setSelectedItemSlot({ type: 'consumables', index: 2 })
            }
            showTypeLabel={Boolean(
              !(loadout.items.consumables && loadout.items.consumables[2]),
            )}
          />
          <ItemCard
            item={
              loadout.items.consumables ? loadout.items.consumables[3] : null
            }
            type="consumable"
            size="sm"
            onClick={() =>
              setSelectedItemSlot({ type: 'consumables', index: 3 })
            }
            showTypeLabel={Boolean(
              !(loadout.items.consumables && loadout.items.consumables[3]),
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}
