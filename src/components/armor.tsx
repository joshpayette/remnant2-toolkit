import { cn } from '@/lib/utils'

interface ArmorProps {
  variant:
    | 'helm'
    | 'torso'
    | 'legs'
    | 'gloves'
    | 'relic'
    | 'amulet'
    | 'ring1'
    | 'ring2'
    | 'ring3'
    | 'ring4'
}

function Armor({ variant }: ArmorProps) {
  const baseClasses = 'absolute h-[60px] w-[60px] bg-purple-500'

  switch (variant) {
    case 'helm':
      return <div className={cn(baseClasses, 'left-[310px] top-[163px]')} />
    case 'torso':
      return <div className={cn(baseClasses, 'left-[289px] top-[235px]')} />
    case 'legs':
      return <div className={cn(baseClasses, 'left-[275px] top-[308px]')} />
    case 'gloves':
      return <div className={cn(baseClasses, 'left-[286px] top-[380px]')} />
    case 'relic':
      return <div className={cn(baseClasses, 'left-[310px] top-[452px]')} />
    case 'amulet':
      return <div className={cn(baseClasses, 'left-[830px] top-[163px]')} />
    case 'ring1':
      return <div className={cn(baseClasses, 'left-[855px] top-[235px]')} />
    case 'ring2':
      return <div className={cn(baseClasses, 'left-[865px] top-[308px]')} />
    case 'ring3':
      return <div className={cn(baseClasses, 'left-[855px] top-[380px]')} />
    case 'ring4':
      return <div className={cn(baseClasses, 'left-[830px] top-[452px]')} />
  }
}

export default Armor
