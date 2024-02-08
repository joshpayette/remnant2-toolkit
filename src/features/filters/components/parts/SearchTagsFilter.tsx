import { DESCRIPTION_TAGS, ITEM_TAGS } from '@/features/items/constants'
import { ItemTag } from '@/features/items/types/GenericItem'
import SelectMenu from '@/features/ui/SelectMenu'

// ------------------------------
// Extract the options for the select input
// ------------------------------

const descriptionTagOptions = DESCRIPTION_TAGS.map((tag) => ({
  label: tag.type,
  value: tag.token,
}))
const itemTagsOptions: Array<{ label: string; value: ItemTag }> = ITEM_TAGS.map(
  (tag) => ({
    label: tag,
    value: tag,
  }),
)
const allTagOptions = [...descriptionTagOptions, ...itemTagsOptions].sort(
  (a, b) => {
    if (a.label < b.label) return -1
    if (a.label > b.label) return 1
    return 0
  },
)

interface Props {
  selectedSearchTag: string
  onSearchTagApply: () => void
  onSearchTagChange: (newTag: string) => void
}

export default function SearchTagsFilter({
  selectedSearchTag,
  onSearchTagApply,
  onSearchTagChange,
}: Props) {
  return (
    <div className="mt-2 flex flex-row items-end justify-start">
      <div>
        <SelectMenu
          label="Tags"
          options={allTagOptions}
          value={selectedSearchTag}
          onChange={(e) => onSearchTagChange(e.target.value)}
        />
      </div>
      <button
        onClick={onSearchTagApply}
        className="lg ml-2 w-[100px] rounded bg-purple-600 p-2 text-sm"
      >
        Add Tag
      </button>
    </div>
  )
}
