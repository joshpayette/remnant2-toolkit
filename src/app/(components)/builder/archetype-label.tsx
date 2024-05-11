import { ARCHETYPE_COLORS } from '@/app/(data)/items/constants'
import { cn } from '@/app/(utils)/classnames'

export function ArchetypeLabel({ name }: { name: string }) {
  return (
    <span
      className={cn(
        'text-md inline-flex flex-shrink-0 items-center justify-center rounded-md px-2 py-1 font-medium',
        name.toLowerCase() === 'alchemist' &&
          `${ARCHETYPE_COLORS.ALCHEMIST.bg} ${ARCHETYPE_COLORS.ALCHEMIST.text}`,
        name.toLowerCase() === 'archon' &&
          `${ARCHETYPE_COLORS.ARCHON.bg} ${ARCHETYPE_COLORS.ARCHON.text}`,
        name.toLowerCase() === 'challenger' &&
          `${ARCHETYPE_COLORS.CHALLENGER.bg} ${ARCHETYPE_COLORS.CHALLENGER.text}`,
        name.toLowerCase() === 'engineer' &&
          `${ARCHETYPE_COLORS.ENGINEER.bg} ${ARCHETYPE_COLORS.ENGINEER.text}`,
        name.toLowerCase() === 'explorer' &&
          `${ARCHETYPE_COLORS.EXPLORER.bg} ${ARCHETYPE_COLORS.EXPLORER.text}`,
        name.toLowerCase() === 'gunslinger' &&
          `${ARCHETYPE_COLORS.GUNSLINGER.bg} ${ARCHETYPE_COLORS.GUNSLINGER.text}`,
        name.toLowerCase() === 'handler' &&
          `${ARCHETYPE_COLORS.HANDLER.bg} ${ARCHETYPE_COLORS.HANDLER.text}`,
        name.toLowerCase() === 'hunter' &&
          `${ARCHETYPE_COLORS.HUNTER.bg} ${ARCHETYPE_COLORS.HUNTER.text}`,
        name.toLowerCase() === 'invader' &&
          `${ARCHETYPE_COLORS.INVADER.bg} ${ARCHETYPE_COLORS.INVADER.text}`,
        name.toLowerCase() === 'invoker' &&
          `${ARCHETYPE_COLORS.INVOKER.bg} ${ARCHETYPE_COLORS.INVOKER.text}`,
        name.toLowerCase() === 'medic' &&
          `${ARCHETYPE_COLORS.MEDIC.bg} ${ARCHETYPE_COLORS.MEDIC.text}`,
        name.toLowerCase() === 'summoner' &&
          `${ARCHETYPE_COLORS.SUMMONER.bg} ${ARCHETYPE_COLORS.SUMMONER.text}`,
        name.toLowerCase() === 'ritualist' &&
          `${ARCHETYPE_COLORS.RITUALIST.bg} ${ARCHETYPE_COLORS.RITUALIST.text}`,
      )}
    >
      {name}
    </span>
  )
}
