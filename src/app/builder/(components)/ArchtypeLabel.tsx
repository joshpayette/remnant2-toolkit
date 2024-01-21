import { ARCHTYPE_COLORS } from '@/app/(data)/constants'
import { cn } from '@/app/(lib)/utils'

export default function ArchtypeLabel({ name }: { name: string }) {
  return (
    <span
      className={cn(
        'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium',
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
