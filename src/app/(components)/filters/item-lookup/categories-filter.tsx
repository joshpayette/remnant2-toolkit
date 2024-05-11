import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseCheckbox,
  BaseCheckboxField,
  BaseCheckboxGroup,
} from '@/app/(components)/_base/checkbox'
import {
  BaseFieldset,
  BaseLabel,
  BaseLegend,
} from '@/app/(components)/_base/fieldset'

export const VALID_ITEM_CATEGORIES = [
  'Helm',
  'Torso',
  'Legs',
  'Gloves',
  'Amulet',
  'Ring',
  'Relic',
  'Relic Fragment',
  'Archetype',
  'Skill',
  'Trait',
  'Perk',
  'Long Gun',
  'Hand Gun',
  'Mod',
  'Melee',
  'Mutator (Gun)',
  'Mutator (Melee)',
  'Concoction',
  'Consumable',
]

interface Props {
  values: string[]
  onChange: (category: string, checked: boolean) => void
  onCheckAll: () => void
  onUncheckAll: () => void
}

export function CategoriesFilter({
  values,
  onChange,
  onCheckAll,
  onUncheckAll,
}: Props) {
  return (
    <BaseFieldset>
      <BaseLegend>Categories</BaseLegend>
      <div className="mt-2 flex flex-row gap-x-2">
        <BaseButton outline onClick={onCheckAll}>
          Check All
        </BaseButton>
        <BaseButton outline onClick={onUncheckAll}>
          Uncheck All
        </BaseButton>
      </div>
      <BaseCheckboxGroup className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-5 md:gap-y-0">
        <BaseCheckboxGroup className="col-span-1 mt-[4px] border border-gray-800 p-2">
          <BaseCheckboxField key="helm">
            <BaseCheckbox
              name="helm"
              value="Helm"
              checked={values.includes('Helm')}
              onChange={(checked) => onChange('Helm', checked)}
            />
            <BaseLabel>Helm</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Torso">
            <BaseCheckbox
              name="torso"
              value="Torso"
              checked={values.includes('Torso')}
              onChange={(checked) => onChange('Torso', checked)}
            />
            <BaseLabel>Torso</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Legs">
            <BaseCheckbox
              name="legs"
              value="Legs"
              checked={values.includes('Legs')}
              onChange={(checked) => onChange('Legs', checked)}
            />
            <BaseLabel>Legs</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Gloves">
            <BaseCheckbox
              name="gloves"
              value="Gloves"
              checked={values.includes('Gloves')}
              onChange={(checked) => onChange('Gloves', checked)}
            />
            <BaseLabel>Gloves</BaseLabel>
          </BaseCheckboxField>
        </BaseCheckboxGroup>
        <BaseCheckboxGroup className="col-span-1 border border-gray-800 p-2">
          <BaseCheckboxField key="Amulet">
            <BaseCheckbox
              name="amulet"
              value="Amulet"
              checked={values.includes('Amulet')}
              onChange={(checked) => onChange('Amulet', checked)}
            />
            <BaseLabel>Amulet</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Ring">
            <BaseCheckbox
              name="ring"
              value="Ring"
              checked={values.includes('Ring')}
              onChange={(checked) => onChange('Ring', checked)}
            />
            <BaseLabel>Ring</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Relic">
            <BaseCheckbox
              name="relic"
              value="Relic"
              checked={values.includes('Relic')}
              onChange={(checked) => onChange('Relic', checked)}
            />
            <BaseLabel>Relic</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Relic Fragment">
            <BaseCheckbox
              name="relicfragment"
              value="Relic Fragment"
              checked={values.includes('Relic Fragment')}
              onChange={(checked) => onChange('Relic Fragment', checked)}
            />
            <BaseLabel>Relic Fragment</BaseLabel>
          </BaseCheckboxField>
        </BaseCheckboxGroup>
        <BaseCheckboxGroup className="col-span-1 border border-gray-800 p-2">
          <BaseCheckboxField key="Archetype">
            <BaseCheckbox
              name="archetype"
              value="Archetype"
              checked={values.includes('Archetype')}
              onChange={(checked) => onChange('Archetype', checked)}
            />
            <BaseLabel>Archetype</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Skill">
            <BaseCheckbox
              name="skill"
              value="Skill"
              checked={values.includes('Skill')}
              onChange={(checked) => onChange('Skill', checked)}
            />
            <BaseLabel>Skill</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Trait">
            <BaseCheckbox
              name="trait"
              value="Trait"
              checked={values.includes('Trait')}
              onChange={(checked) => onChange('Trait', checked)}
            />
            <BaseLabel>Trait</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Perk">
            <BaseCheckbox
              name="perk"
              value="Perk"
              checked={values.includes('Perk')}
              onChange={(checked) => onChange('Perk', checked)}
            />
            <BaseLabel>Perk</BaseLabel>
          </BaseCheckboxField>
        </BaseCheckboxGroup>
        <BaseCheckboxGroup className="col-span-1 border border-gray-800 p-2">
          <BaseCheckboxField key="Long Gun">
            <BaseCheckbox
              name="longgun"
              value="Long Gun"
              checked={values.includes('Long Gun')}
              onChange={(checked) => onChange('Long Gun', checked)}
            />
            <BaseLabel>Long Gun</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Hand Gun">
            <BaseCheckbox
              name="handgun"
              value="Hand Gun"
              checked={values.includes('Hand Gun')}
              onChange={(checked) => onChange('Hand Gun', checked)}
            />
            <BaseLabel>Hand Gun</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Melee">
            <BaseCheckbox
              name="melee"
              value="Melee"
              checked={values.includes('Melee')}
              onChange={(checked) => onChange('Melee', checked)}
            />
            <BaseLabel>Melee</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Mod">
            <BaseCheckbox
              name="mod"
              value="Mod"
              checked={values.includes('Mod')}
              onChange={(checked) => onChange('Mod', checked)}
            />
            <BaseLabel>Mod</BaseLabel>
          </BaseCheckboxField>
        </BaseCheckboxGroup>
        <BaseCheckboxGroup className="col-span-1 border border-gray-800 p-2">
          <BaseCheckboxField key="Mutator (Gun)">
            <BaseCheckbox
              name="mutatorgun"
              value="Mutator (Gun)"
              checked={values.includes('Mutator (Gun)')}
              onChange={(checked) => onChange('Mutator (Gun)', checked)}
            />
            <BaseLabel>Mutator (Gun)</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Mutator (Melee)">
            <BaseCheckbox
              name="mutatormelee"
              value="Mutator (Melee)"
              checked={values.includes('Mutator (Melee)')}
              onChange={(checked) => onChange('Mutator (Melee)', checked)}
            />
            <BaseLabel>Mutator (Melee)</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Concoction">
            <BaseCheckbox
              name="concoction"
              value="Concoction"
              checked={values.includes('Concoction')}
              onChange={(checked) => onChange('Concoction', checked)}
            />
            <BaseLabel>Concoction</BaseLabel>
          </BaseCheckboxField>
          <BaseCheckboxField key="Consumable">
            <BaseCheckbox
              name="consumable"
              value="Consumable"
              checked={values.includes('Consumable')}
              onChange={(checked) => onChange('Consumable', checked)}
            />
            <BaseLabel>Consumable</BaseLabel>
          </BaseCheckboxField>
        </BaseCheckboxGroup>
      </BaseCheckboxGroup>
    </BaseFieldset>
  )
}
