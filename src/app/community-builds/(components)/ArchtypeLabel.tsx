import { cn } from '@/app/(lib)/utils'

export default function ArchtypeLabel({ name }: { name: string }) {
  return (
    <span
      className={cn(
        'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium',
        name.toLowerCase() === 'challenger' && 'bg-[#af9c94] text-[#373029]',
        name.toLowerCase() === 'handler' && 'bg-[#c1c078] text-[#686929]',
        name.toLowerCase() === 'medic' && 'bg-[#8bc0aa] text-[#0f3021]',
        name.toLowerCase() === 'hunter' && 'bg-[#be5a26] text-[#392217]',
        name.toLowerCase() === 'alchemist' && 'bg-[#108a6a] text-[#102a22]',
        name.toLowerCase() === 'archon' && 'bg-[#102730] text-[#56a9c6]',
        name.toLowerCase() === 'engineer' && 'bg-[#26315a] text-[#b2bee9]',
        name.toLowerCase() === 'gunslinger' && 'bg-[#3f1818] text-[#de6966]',
        name.toLowerCase() === 'explorer' && 'bg-[#2f3c1f] text-[#67c47c]',
        name.toLowerCase() === 'invader' && 'bg-[#362136] text-[#ebacef]',
        name.toLowerCase() === 'summoner' && 'bg-[#2c221a] text-[#ba9880]',
        name.toLowerCase() === 'ritualist' && 'bg-[#251133] text-[#bb4fff]',
      )}
    >
      {name}
    </span>
  )
}
