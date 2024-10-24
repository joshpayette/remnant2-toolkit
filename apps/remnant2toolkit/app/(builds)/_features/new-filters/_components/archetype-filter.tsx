import { FilterListbox, type FilterOption } from '@repo/ui';

interface Props {
  onChange: (values: FilterOption[]) => void;
  values: FilterOption[];
}

export function ArchetypeFilter({ values, onChange }: Props) {
  return (
    <div className="flex w-full flex-wrap gap-2">
      <FilterListbox options={values} label="Archetypes" onChange={onChange} />
    </div>
  );
}
