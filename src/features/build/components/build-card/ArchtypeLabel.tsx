import { ARCHTYPE_COLORS } from '@/features/items/constants'
import { cn } from '@/lib/classnames'

export function ArchtypeLabel({ name }: { name: string }) {
  return (
    <span
      className={cn(
        'text-md inline-flex flex-shrink-0 items-center justify-center rounded-md px-2 py-1 font-medium',
        name.toLowerCase() === 'alchemist' &&
          `${ARCHTYPE_COLORS.ALCHEMIST.bg} ${ARCHTYPE_COLORS.ALCHEMIST.text}`,
        name.toLowerCase() === 'archon' &&
          `${ARCHTYPE_COLORS.ARCHON.bg} ${ARCHTYPE_COLORS.ARCHON.text}`,
        name.toLowerCase() === 'challenger' &&
          `${ARCHTYPE_COLORS.CHALLENGER.bg} ${ARCHTYPE_COLORS.CHALLENGER.text}`,
        name.toLowerCase() === 'engineer' &&
          `${ARCHTYPE_COLORS.ENGINEER.bg} ${ARCHTYPE_COLORS.ENGINEER.text}`,
        name.toLowerCase() === 'explorer' &&
          `${ARCHTYPE_COLORS.EXPLORER.bg} ${ARCHTYPE_COLORS.EXPLORER.text}`,
        name.toLowerCase() === 'gunslinger' &&
          `${ARCHTYPE_COLORS.GUNSLINGER.bg} ${ARCHTYPE_COLORS.GUNSLINGER.text}`,
        name.toLowerCase() === 'handler' &&
          `${ARCHTYPE_COLORS.HANDLER.bg} ${ARCHTYPE_COLORS.HANDLER.text}`,
        name.toLowerCase() === 'hunter' &&
          `${ARCHTYPE_COLORS.HUNTER.bg} ${ARCHTYPE_COLORS.HUNTER.text}`,
        name.toLowerCase() === 'invader' &&
          `${ARCHTYPE_COLORS.INVADER.bg} ${ARCHTYPE_COLORS.INVADER.text}`,
        name.toLowerCase() === 'invoker' &&
          `${ARCHTYPE_COLORS.INVOKER.bg} ${ARCHTYPE_COLORS.INVOKER.text}`,
        name.toLowerCase() === 'medic' &&
          `${ARCHTYPE_COLORS.MEDIC.bg} ${ARCHTYPE_COLORS.MEDIC.text}`,
        name.toLowerCase() === 'summoner' &&
          `${ARCHTYPE_COLORS.SUMMONER.bg} ${ARCHTYPE_COLORS.SUMMONER.text}`,
        name.toLowerCase() === 'ritualist' &&
          `${ARCHTYPE_COLORS.RITUALIST.bg} ${ARCHTYPE_COLORS.RITUALIST.text}`,
      )}
    >
      {name}
    </span>
  )
}
