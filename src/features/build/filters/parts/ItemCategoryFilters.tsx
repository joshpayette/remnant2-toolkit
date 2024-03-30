import { ItemLookupCategory } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'

interface Props {
  defaultItemCategories: ItemLookupCategory[]
  selectedItemCategories: ItemLookupCategory[]
  onReset: (categories: ItemLookupCategory[]) => void
  onUpdate: (category: ItemLookupCategory) => void
}

export function ItemCategoryFilters({
  defaultItemCategories,
  selectedItemCategories,
  onReset,
  onUpdate,
}: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
        By Category
      </div>
      <div className="text-xs">
        <button
          className="underline"
          aria-label="Uncheck all categories"
          onClick={() => onReset([])}
        >
          Uncheck All
        </button>{' '}
        /{' '}
        <button
          className="underline"
          aria-label="Check all categories"
          onClick={() => onReset(defaultItemCategories)}
        >
          Check All
        </button>
      </div>

      <div className="relative flex w-full flex-row items-center shadow-sm">
        <div className="grid w-full grid-cols-2 gap-y-4 text-left sm:grid-cols-3 md:grid-cols-5">
          <div id="armor" className="col-span-1">
            <Checkbox
              label="Helm"
              name={`category-helm`}
              checked={selectedItemCategories.includes('Helm')}
              onChange={() => onUpdate('Helm')}
            />
            <Checkbox
              label="Torso"
              name={`category-torso`}
              checked={selectedItemCategories.includes('Torso')}
              onChange={() => onUpdate('Torso')}
            />
            <Checkbox
              label="Legs"
              name={`category-legs`}
              checked={selectedItemCategories.includes('Legs')}
              onChange={() => onUpdate('Legs')}
            />
            <Checkbox
              label="Gloves"
              name={`category-gloves`}
              checked={selectedItemCategories.includes('Gloves')}
              onChange={() => onUpdate('Gloves')}
            />
          </div>
          <div id="jewelry" className="col-span-1">
            <Checkbox
              label="Amulet"
              name={`category-amulet`}
              checked={selectedItemCategories.includes('Amulet')}
              onChange={() => onUpdate('Amulet')}
            />
            <Checkbox
              label="Ring"
              name={`category-ring`}
              checked={selectedItemCategories.includes('Ring')}
              onChange={() => onUpdate('Ring')}
            />
            <Checkbox
              label="Relic"
              name="category-relic"
              checked={selectedItemCategories.includes('Relic')}
              onChange={() => onUpdate('Relic')}
            />
            <Checkbox
              label="Relic Fragment"
              name="category-relicfragment"
              checked={selectedItemCategories.includes('Relicfragment')}
              onChange={() => onUpdate('Relicfragment')}
            />
          </div>

          <div id="archetype" className="col-span-1">
            <Checkbox
              label="Archetype"
              name="category-archetype"
              checked={selectedItemCategories.includes('Archetype')}
              onChange={() => onUpdate('Archetype')}
            />
            <Checkbox
              label="Skill"
              name="category-skill"
              checked={selectedItemCategories.includes('Skill')}
              onChange={() => onUpdate('Skill')}
            />
            <Checkbox
              label="Trait"
              name="category-trait"
              checked={selectedItemCategories.includes('Trait')}
              onChange={() => onUpdate('Trait')}
            />
            <Checkbox
              label="Perk"
              name="category-perk"
              checked={selectedItemCategories.includes('Perk')}
              onChange={() => onUpdate('Perk')}
            />
          </div>

          <div id="weapons" className="col-span-1">
            <Checkbox
              label="Long Gun"
              name="category-longgun"
              checked={selectedItemCategories.includes('Long Gun')}
              onChange={() => onUpdate('Long Gun')}
            />
            <Checkbox
              label="Hand Gun"
              name="category-handgun"
              checked={selectedItemCategories.includes('Hand Gun')}
              onChange={() => onUpdate('Hand Gun')}
            />
            <Checkbox
              label="Melee"
              name="category-melee"
              checked={selectedItemCategories.includes('Melee')}
              onChange={() => onUpdate('Melee')}
            />
            <Checkbox
              label="Mod"
              name="category-mod"
              checked={selectedItemCategories.includes('Mod')}
              onChange={() => onUpdate('Mod')}
            />
            <Checkbox
              label="Mutator (Gun)"
              name="category-mutator-gun"
              checked={selectedItemCategories.includes('Mutator (Gun)')}
              onChange={() => onUpdate('Mutator (Gun)')}
            />
            <Checkbox
              label="Mutator (Melee)"
              name="category-mutator-melee"
              checked={selectedItemCategories.includes('Mutator (Melee)')}
              onChange={() => onUpdate('Mutator (Melee)')}
            />
          </div>

          <div
            id="other"
            className="col-span-full grid grid-cols-2 sm:col-span-1 sm:block sm:gap-y-0"
          >
            <Checkbox
              label="Concoction"
              name="category-concoction"
              checked={selectedItemCategories.includes('Concoction')}
              onChange={() => onUpdate('Concoction')}
            />
            <Checkbox
              label="Consumable"
              name="category-consumable"
              checked={selectedItemCategories.includes('Consumable')}
              onChange={() => onUpdate('Consumable')}
            />
          </div>
        </div>
      </div>
    </>
  )
}
