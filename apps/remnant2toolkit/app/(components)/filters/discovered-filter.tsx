import {
  BaseCheckbox,
  BaseCheckboxField,
  BaseCheckboxGroup,
} from '@repo/ui/base/checkbox'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseFieldset,
  BaseLabel,
  BaseLegend,
} from '@/app/(components)/_base/fieldset'

export const VALID_DISCOVERED_FILTERS = ['Discovered', 'Undiscovered']

interface Props {
  values: string[]
  onChange: (value: string, checked: boolean) => void
  onCheckAll: () => void
  onUncheckAll: () => void
}

export function DiscoveredFilter({
  values,
  onChange,
  onCheckAll,
  onUncheckAll,
}: Props) {
  const options = VALID_DISCOVERED_FILTERS.map((value) => ({
    label: value as string,
    value: value,
  }))

  return (
    <BaseFieldset>
      <BaseLegend>Collected?</BaseLegend>
      <div className="mt-2 flex flex-row gap-x-2">
        <BaseButton outline onClick={onCheckAll}>
          Check All
        </BaseButton>
        <BaseButton outline onClick={onUncheckAll}>
          Uncheck All
        </BaseButton>
      </div>
      <BaseCheckboxGroup className="grid grid-cols-1 sm:grid-cols-2">
        {options.map(({ label, value }) => (
          <BaseCheckboxField key={value}>
            <BaseCheckbox
              name="collection"
              value={value}
              onChange={(checked) => onChange(value, checked)}
              checked={values.includes(value)}
            />
            <BaseLabel>{label}</BaseLabel>
          </BaseCheckboxField>
        ))}
      </BaseCheckboxGroup>
    </BaseFieldset>
  )

  // return (
  //   <BaseField>
  //     <BaseLabel>Discovered?</BaseLabel>
  //     <BaseListbox multiple name="discovered" value={value} onChange={onChange}>
  //       {options.map(({ label, value }) => (
  //         <BaseListboxOption key={value} value={value}>
  //           <BaseListboxLabel>{label}</BaseListboxLabel>
  //         </BaseListboxOption>
  //       ))}
  //     </BaseListbox>
  //   </BaseField>
  // )
}
