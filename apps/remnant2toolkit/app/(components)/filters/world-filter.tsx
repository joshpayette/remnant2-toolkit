import { BaseField, BaseLabel } from '@repo/ui/base/fieldset';
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox';

import { DEFAULT_FILTER } from '@/app/(components)/filters/types';
import {
  LABYRINTH_DUNGEONS,
  LOSOMN_DUNGEONS,
  NERUD_DUNGEONS,
  ROOT_EARTH_DUNGEONS,
  WORLD_LOCATIONS,
  YAESHA_DUNGEONS,
} from '@/app/(features)/items/types/locations';

export const VALID_WORLDS = WORLD_LOCATIONS;

interface Props {
  worldValue: string;
  dungeonValue: string;
  onChangeWorld: (value: string) => void;
  onChangeDungeon: (value: string) => void;
}

export function WorldFilter({
  dungeonValue,
  worldValue,
  onChangeDungeon,
  onChangeWorld,
}: Props) {
  const worldOptions = VALID_WORLDS.map((world) => ({
    label: world as string,
    value: world as string,
  }));
  worldOptions.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER });

  const showDungeons =
    worldValue === 'Losomn' ||
    worldValue === `N'Erud` ||
    worldValue === 'Yaesha' ||
    worldValue === 'Root Earth' ||
    worldValue === 'Labyrinth';

  let dungeonOptions = [
    { label: DEFAULT_FILTER, value: DEFAULT_FILTER },
    { label: 'World Drop', value: 'World Drop' },
  ];
  switch (worldValue) {
    case 'Losomn':
      dungeonOptions = dungeonOptions.concat(
        LOSOMN_DUNGEONS.sort((a, b) => a.localeCompare(b)).map((dungeon) => ({
          label: dungeon as string,
          value: dungeon as string,
        })),
      );
      break;
    case `N'Erud`:
      dungeonOptions = dungeonOptions.concat(
        NERUD_DUNGEONS.sort((a, b) => a.localeCompare(b)).map((dungeon) => ({
          label: dungeon as string,
          value: dungeon as string,
        })),
      );
      break;
    case 'Yaesha':
      dungeonOptions = dungeonOptions.concat(
        YAESHA_DUNGEONS.sort((a, b) => a.localeCompare(b)).map((dungeon) => ({
          label: dungeon as string,
          value: dungeon as string,
        })),
      );
      break;
    case 'Root Earth':
      dungeonOptions = dungeonOptions.concat(
        ROOT_EARTH_DUNGEONS.sort((a, b) => a.localeCompare(b)).map(
          (dungeon) => ({
            label: dungeon as string,
            value: dungeon as string,
          }),
        ),
      );
      break;
    case 'Labyrinth':
      dungeonOptions = dungeonOptions.concat(
        LABYRINTH_DUNGEONS.sort((a, b) => a.localeCompare(b)).map(
          (dungeon) => ({
            label: dungeon as string,
            value: dungeon as string,
          }),
        ),
      );
      break;
    default:
      break;
  }

  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2 sm:gap-y-0">
      <BaseField>
        <BaseLabel>World</BaseLabel>
        <BaseListbox name="world" value={worldValue} onChange={onChangeWorld}>
          {worldOptions.map(({ label, value }) => (
            <BaseListboxOption key={value} value={value}>
              <BaseListboxLabel>{label}</BaseListboxLabel>
            </BaseListboxOption>
          ))}
        </BaseListbox>
      </BaseField>
      {showDungeons && (
        <BaseField>
          <BaseLabel>Dungeon</BaseLabel>
          <BaseListbox
            name="dungeon"
            value={dungeonValue}
            onChange={onChangeDungeon}
          >
            {dungeonOptions.map(({ label, value }) => (
              <BaseListboxOption key={value} value={value}>
                <BaseListboxLabel>{label}</BaseListboxLabel>
              </BaseListboxOption>
            ))}
          </BaseListbox>
        </BaseField>
      )}
    </div>
  );
}
